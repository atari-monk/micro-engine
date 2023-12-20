import {
  ILogger,
  IEntityManager,
  IGameServerApi,
  IManager,
  IEntityDataModel,
  ITileMap,
  IRendererV2,
  IEntityCreator,
} from 'engine_api'
import { IServerGameLoop as IGameLoop } from 'engine_api'
import IPlayerManager from 'engine_api/server/entity/IPlayerManager'
import Engine from './Engine'

export default class EngineBuilder {
  protected _logger!: ILogger
  protected _entityManager!: IEntityManager
  protected _playerManager!: IPlayerManager
  protected _entityDataManager!: IManager<IEntityDataModel>
  protected _tileMap!: ITileMap
  protected _renderer!: IRendererV2
  protected _gameLoop!: IGameLoop
  protected _entityCreator!: IEntityCreator
  protected _serverApi!: IGameServerApi

  withLogger(logger: ILogger) {
    this._logger = logger
    return this
  }

  withGameServerApi(serverApi: IGameServerApi) {
    this._serverApi = serverApi
    return this
  }

  withPlayerManager(playerManager: IPlayerManager) {
    if (!this._logger) {
      throw new Error(this.getError('Logger', 'Player Manager'))
    }
    this._playerManager = playerManager
    this._playerManager.logger = this._logger
    return this
  }

  withGameLoop(gameLoop: IGameLoop) {
    if (!this._serverApi) {
      throw new Error(this.getError('Server Api', 'Game Loop'))
    }
    if (!this._playerManager) {
      throw new Error(this.getError('Player Manager', 'Game Loop'))
    }
    this._gameLoop = gameLoop
    this._gameLoop.serverApi = this._serverApi
    this._gameLoop.playerManager = this._playerManager
    return this
  }

  withRenderer(renderer: IRendererV2) {
    this._renderer = renderer
    return this
  }

  withTileMap(tileMap: ITileMap) {
    if (!this._renderer) {
      throw new Error(this.getError('Renderer', 'Tile Map'))
    }
    this._tileMap = tileMap
    this._tileMap.renderer = this._renderer
    return this
  }

  withEntityDataManager(entityDataManager: IManager<IEntityDataModel>) {
    this._entityDataManager = entityDataManager
    return this
  }

  getError(childName: string, parentName: string) {
    return `${childName} must be set before setting the ${parentName}`
  }

  withEntityManager(entityManager: IEntityManager) {
    if (!this._logger) {
      throw new Error(this.getError('Logger', 'Entity Manager'))
    }
    this._entityManager = entityManager
    this._entityManager.logger = this._logger
    return this
  }

  withEntityCreator(
    entityCreator: IEntityCreator
  ) {
    
    this._entityCreator = entityCreator
    return this
  }

  build() {
    if (
      !this._logger ||
      !this._gameLoop ||
      !this._entityDataManager ||
      !this._entityManager ||
      !this._tileMap ||
      !this._renderer ||
      !this._entityCreator ||
      !this._playerManager ||
      !this._serverApi
    ) {
      throw new Error(
        'All dependencies must be set before building the engine.'
      )
    }
    return new Engine(
      this._logger,
      this._gameLoop,
      this._entityDataManager,
      this._entityManager,
      this._playerManager,
      this._tileMap,
      this._renderer,
      this._entityCreator,
      this._serverApi
    )
  }
}
