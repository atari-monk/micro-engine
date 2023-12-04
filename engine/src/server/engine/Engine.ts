import {
  IEngineServerApi,
  IEntityManager,
  IGameServerApi,
  ILogger,
  IResult,
  InputDto,
} from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import GameLoop from '../game_loop/GameLoop'
import ObjectComponent from '../../browser/component/ObjectComponent'

export default class Engine implements IEngineServerApi {
  private readonly _logger: ILogger
  private readonly _entityManager: IEntityManager
  private readonly _playerManager: IPlayerManager
  private readonly _gameLoop: GameLoop

  constructor(
    logger: ILogger,
    entityManager: IEntityManager,
    playerManager: IPlayerManager,
    gameLoop: GameLoop,
    private readonly _serverApi: IGameServerApi
  ) {
    this._logger = logger
    this._entityManager = entityManager
    this._playerManager = playerManager
    this._gameLoop = gameLoop
  }

  updateCallback = (dt: number) => {
    this._entityManager.updateEntities(dt)
  }

  startEngine() {
    this._logger.log(`Starting Engine`)
    this._logger.log(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.log(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }

  stopEngine() {
    this._logger.log(`Stoping Engine`)
    this._logger.log(`Stoping Game Loop`)
    this._gameLoop.stopLoop()
    this._logger.log(`Unsubscribe From Update`)
    this._gameLoop.unsubscribeFromUpdate(this.updateCallback)
  }

  getPlayerCount() {
    return this._playerManager.getEntityCount()
  }

  addPlayer(socketId: string) {
    this._logger.log('Adding player to server engine')
    const count = this._playerManager.getEntityCount()

    if (count >= 2) {
      return {
        isDone: false,
        message: `Number of players is ${count}. Server at capacity`,
      } as IResult
    }

    const playerKey = `player${count + 1}`
    const player = this._entityManager.getEntity(playerKey)

    if (!player) {
      return {
        isDone: false,
        message: 'Error getting player entity!',
      } as IResult
    }

    const playerObject =
      player.getComponentByType<ObjectComponent>(ObjectComponent)

    if (!playerObject) {
      return {
        isDone: false,
        message: 'Error getting player Object!',
      } as IResult
    }

    playerObject!.id = socketId
    this._playerManager.addEntity(playerKey, player)
    return {
      isDone: true,
      message: `Server Engine added player on key: ${playerKey}, id: ${socketId}`,
    } as IResult
  }

  sendPlayers(): void {
    console.log('Sending Players event')
    const dto = this._playerManager.getClientsDto()
    this._serverApi.sendPlayers(dto.clients)
  }

  passClientInputToPlayerMovementComponent(inputDto: InputDto): void {
    this._playerManager.setPlayerInput(inputDto)
  }
}
