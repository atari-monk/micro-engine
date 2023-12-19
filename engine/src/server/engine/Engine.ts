import {
  IEngineServerApi,
  IEntityCreator,
  IEntityDataModel,
  IEntityManager,
  IGameData,
  IGameServerApi,
  ILogger,
  IManager,
  IRendererV2,
  IResult,
  ITileMap,
  InputDto,
} from 'engine_api'
import { IServerGameLoop as IGameLoop } from 'engine_api/server'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectComponent from '../../tech/component/ObjectComponent'

export default class Engine implements IEngineServerApi {
  private readonly _logger: ILogger
  private readonly _gameLoop: IGameLoop
  private readonly _entityDataManager: IManager<IEntityDataModel>
  private readonly _entityManager: IEntityManager
  private readonly _tileMap: ITileMap
  private readonly _renderer: IRendererV2
  private readonly _entityCreator: IEntityCreator
  private readonly _playerManager: IPlayerManager
  private readonly _serverApi: IGameServerApi

  constructor(
    logger: ILogger,
    gameLoop: IGameLoop,
    entityDataManager: IManager<IEntityDataModel>,
    entityManager: IEntityManager,
    playerManager: IPlayerManager,
    tileMap: ITileMap,
    renderer: IRendererV2,
    entityCreator: IEntityCreator,
    serverApi: IGameServerApi
  ) {
    this._logger = logger
    this._gameLoop = gameLoop
    this._entityDataManager = entityDataManager
    this._entityManager = entityManager
    this._tileMap = tileMap
    this._renderer = renderer
    this._entityCreator = entityCreator
    this._playerManager = playerManager
    this._serverApi = serverApi
  }

  initialize(gameData: IGameData) {
    this._tileMap.load(gameData.tileMapData)
    this.loadEntityData(gameData.entityData)
    this._entityCreator.createEntities()
  }

  private loadEntityData(dataManager: IManager<IEntityDataModel>) {
    dataManager.forEach((name, sprite) => {
      this._entityDataManager.add(name, sprite)
    })
  }

  start() {
    this._logger.log(`Starting Engine`)
    this._gameLoop.subscribeUpdate(this.update)
    this._gameLoop.start()
  }

  private update = (dt: number) => {
    this._entityManager.update(dt)
  }

  stop() {
    this._logger.log(`Stoping Engine`)
    this._gameLoop.stop()
    this._gameLoop.unsubscribeUpdate(this.update)
  }

  getPlayerCount() {
    return this._playerManager.count
  }

  addPlayer(socketId: string) {
    this._logger.log('Adding player to server engine')
    const count = this._playerManager.count

    if (count >= 2) {
      return {
        isDone: false,
        message: `Number of players is ${count}. Server at capacity`,
      } as IResult
    }

    const playerKey = `player${count + 1}`
    const player = this._entityManager.getStrict(playerKey)

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
    this._playerManager.add(playerKey, player)
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

  getScreenCenter() {
    return this._renderer.getCenter()
  }
}
