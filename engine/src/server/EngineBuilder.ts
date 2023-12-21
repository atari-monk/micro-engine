import { IGameServerApi, IEntityCreator } from 'engine_api'
import { IServerGameLoop as IGameLoop } from 'engine_api'
import IPlayerManager from 'engine_api/server/entity/IPlayerManager'
import Engine from './Engine'
import { default as EngineBuilderBase } from '../single/EngineBuilder'
import EntityBuilder from '../tech/entity/EntityBuilder'
import ObjectEntity from '../tech/entity/ObjectEntity'
import PlayerEntity from '../tech/entity/PlayerEntity'

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
    this.withMapEntityBuilder(entityCreator)
    this.withObjectEntityBuilder(entityCreator)
    this.withPlayerEntityBuilder(entityCreator)
    this._entityCreator = entityCreator
    return this
  }

  protected withObjectEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) =>
      builder
        .withEntity(() => new ObjectEntity())
        .withLogger(this._logger)
        .withEntityData(dataKey!)
        .withObjectComponent()
    )
    entityCreator.addBuilder('object', builder)
  }

  protected withPlayerEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) =>
      builder
        .withEntity(() => new PlayerEntity())
        .withLogger(this._logger)
        .withEntityData(dataKey!)
        .withObjectComponent()
    )
    this.withPlayerMovementComponent(builder)
    entityCreator.addBuilder('player', builder)
  }

  withPlayerMovementComponent(builder: EntityBuilder) {
    builder.recordOperation(() => builder.withServerMovementComponent())
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
