import {
  IClientGameLoop as IGameLoop,
  IClientPlayerManager as IPlayerManager,
} from 'engine_api/client'
import { default as EngineBuilderBase } from '../single/EngineBuilder'
import Engine from './Engine'
import { IGameClientApi } from 'engine_api'
import EntityBuilder from '../tech/entity/EntityBuilder'

export default class EngineBuilder extends EngineBuilderBase {
  private _playerManager!: IPlayerManager
  private _clientGameLoop!: IGameLoop
  private _gameClientApi!: IGameClientApi

  withGameClientApi(gameClientApi: IGameClientApi) {
    this._gameClientApi = gameClientApi
    return this
  }

  withClientGameLoop(gameLoop: IGameLoop) {
    if (!this._gameClientApi) {
      throw new Error(this.getError('Game Client Api', 'Game Loop'))
    }
    if (!this._entityManager) {
      throw new Error(this.getError('Entity Manager', 'Game Loop'))
    }
    this._clientGameLoop = gameLoop
    this._clientGameLoop.clientApi = this._gameClientApi
    this._clientGameLoop.entityManager = this._entityManager
    return this
  }

  withPlayerMovementComponent(playerEntityBuilder: EntityBuilder) {
    playerEntityBuilder.recordOperation(() =>
      playerEntityBuilder.withClientMovementComponent(this._input)
    )
  }

  withPlayerManager(playerManager: IPlayerManager) {
    if (!this._logger) {
      throw new Error(this.getError('Logger', 'Entity Manager'))
    }
    if (!this._entityManager) {
      throw new Error(this.getError('Entity Manager', 'Player Manager'))
    }
    this._playerManager = playerManager
    this._playerManager.logger = this._logger
    this._playerManager.entityManager = this._entityManager
    return this
  }

  buildClientEngine() {
    if (
      !this._logger ||
      !this._clientGameLoop ||
      !this._renderer ||
      !this._input ||
      !this._entityDataManager ||
      !this._entityManager ||
      !this._camera ||
      !this._tileMap ||
      !this._entityCreator ||
      !this._playerManager
    ) {
      throw new Error(
        'All dependencies must be set before building the engine.'
      )
    }
    return new Engine(
      this._logger,
      this._clientGameLoop,
      this._renderer,
      this._input,
      this._entityDataManager,
      this._entityManager,
      this._camera,
      this._tileMap,
      this._entityCreator,
      this._playerManager
    )
  }
}
