import {
  IGameServerApi,
  IEntityCreator,
  IServerGameLoop as IGameLoop,
  IServerPlayerManager as IPlayerManager,
} from 'engine_api'
import Engine from './Engine'
import { default as EngineBuilderBase } from '../single/EngineBuilder'

export default class EngineBuilder extends EngineBuilderBase {
  private _playerManager!: IPlayerManager
  protected _serverGameLoop!: IGameLoop
  protected _gameServerApi!: IGameServerApi

  withGameServerApi(serverApi: IGameServerApi) {
    this._gameServerApi = serverApi
    return this
  }

  withServerGameLoop(gameLoop: IGameLoop) {
    if (!this._gameServerApi) {
      throw new Error(this.getError('Server Api', 'Game Loop'))
    }
    if (!this._playerManager) {
      throw new Error(this.getError('Player Manager', 'Game Loop'))
    }
    this._serverGameLoop = gameLoop
    this._serverGameLoop.serverApi = this._gameServerApi
    this._serverGameLoop.playerManager = this._playerManager
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

  withEntityCreator(entityCreator: IEntityCreator) {
    this._entityCreator = entityCreator
    return this
  }

  buildServerEngine() {
    if (
      !this._logger ||
      !this._serverGameLoop ||
      !this._entityDataManager ||
      !this._entityManager ||
      !this._tileMap ||
      !this._renderer ||
      !this._entityCreator ||
      !this._playerManager ||
      !this._gameServerApi
    ) {
      throw new Error(
        'All dependencies must be set before building the engine.'
      )
    }
    return new Engine(
      this._logger,
      this._serverGameLoop,
      this._entityDataManager,
      this._entityManager,
      this._playerManager,
      this._tileMap,
      this._renderer,
      this._entityCreator,
      this._gameServerApi
    )
  }
}
