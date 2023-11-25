import { IClientApi } from 'engine_api'
import EngineFactory from './EngineFactory'
import { ClientGameLoop } from '../game_loop/ClientGameLoop'

export default class ClientEngineFactory extends EngineFactory {
  constructor(canvasId: string, private readonly _clientApi: IClientApi) {
    super(canvasId)
    this._gameLoop = new ClientGameLoop(this._entitiesManager, this._clientApi)
  }

  protected createPlayer() {
    this._entitiesManager.addEntity(
      'player',
      this._entityFactory.createClientPlayerEntity(this._allEntityConfig)
    )
  }
}
