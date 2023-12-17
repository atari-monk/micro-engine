import IPlayerManager from 'engine_api/client/entity/IPlayerManager'
import { default as EngineBuilderBase } from './../../browser/engine/EngineBuilder'
import Engine from './Engine'

export default class EngineBuilder extends EngineBuilderBase {
  private _playerManager!: IPlayerManager

  withPlayerManager(playerManager: IPlayerManager) {
    if (!this._entityManager) {
      throw new Error(this.getError('Entity Manager', 'Player Manager'))
    }
    this._playerManager = playerManager
    this._playerManager.entityManager = this._entityManager
    return this
  }

  build() {
    if (
      !this._logger ||
      !this._gameLoop ||
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
      this._gameLoop,
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
