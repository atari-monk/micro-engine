import { IEngineConfig, IGameLoop, ILogger, IRendererV2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export default class Engine {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger

  constructor(private readonly _engineConfig: IEngineConfig) {
    this._gameLoop = this._engineConfig.gameLoop
    this._renderer = this._engineConfig.renderer
    this._logger = this._engineConfig.logger
  }

  updateCallback = (deltaTime: number) => {}

  renderCallback = (deltaTime: number) => {
    this._renderer.clearCanvas()
    this._renderer.drawRect(new Vector2(0, 0), new Vector2(100, 100), 'red')
  }

  initializeEngine() {
    this._logger.log(`Initializing Engine`)
    this._logger.log(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.log(`Subscribe To Render`)
    this._gameLoop.subscribeToRender(this.renderCallback)
    this._logger.log(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }
}
