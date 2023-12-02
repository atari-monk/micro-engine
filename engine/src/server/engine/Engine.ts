import {
  IEngineServerApi,
  IEntitiesManager,
  IGameServerApi,
  ILogger,
  IResult,
  InputDto,
} from 'engine_api'
import GameLoop from '../game_loop/GameLoop'
import ObjectComponent from '../../browser/component/ObjectComponent'
import PlayerManager from '../entity/PlayerManager'

export default class Engine implements IEngineServerApi {
  private readonly _logger: ILogger
  private readonly _entitiesManager: IEntitiesManager
  private readonly _playerManager: PlayerManager
  private readonly _gameLoop: GameLoop

  constructor(
    logger: ILogger,
    entitiesManager: IEntitiesManager,
    playerManager: PlayerManager,
    gameLoop: GameLoop,
    private readonly _serverApi: IGameServerApi
  ) {
    this._logger = logger
    this._entitiesManager = entitiesManager
    this._playerManager = playerManager
    this._gameLoop = gameLoop
  }

  updateCallback = (dt: number) => {
    this._entitiesManager.updateEntities(dt)
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
    const player = this._entitiesManager.getEntity(playerKey)

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
