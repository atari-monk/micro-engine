import { IRendererV2 } from 'engine_api'
import EngineFactory from './EngineFactory'
import { RendererMock } from '../renderer/RendererMock'
import ServerGameLoop from '../game_loop/ServerGameLoop'

export default class ServerEngineFactory extends EngineFactory {
  constructor(canvasId: string) {
    super(canvasId)
    this._gameLoop = new ServerGameLoop(this._entitiesManager)
  }

  protected getRenderer(canvasId: string): IRendererV2 {
    return new RendererMock()
  }

  protected subscribeKeyDownEvent() {}

  protected unsubscribeKeyDownEvent(): void {}
}
