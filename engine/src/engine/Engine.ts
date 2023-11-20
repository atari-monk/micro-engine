import {
  IEngineConfig,
  IEntity,
  IGameLoop,
  IInputManager,
  ILogger,
  IRendererV2,
} from 'engine_api'

export default class Engine {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger
  private readonly _input: IInputManager
  private readonly _entities: IEntity[]

  constructor(private readonly _engineConfig: IEngineConfig) {
    this._gameLoop = this._engineConfig.gameLoop
    this._renderer = this._engineConfig.renderer
    this._logger = this._engineConfig.logger
    this._input = this._engineConfig.input
    this._entities = this._engineConfig.entities
  }

  updateCallback = (deltaTime: number) => {
    this._entities.forEach((entity) => {
      entity.update()
    })
  }

  renderCallback = (deltaTime: number) => {
    this._renderer.clearCanvas()
    this._entities.forEach((entity) => {
      entity.render()
    })
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
