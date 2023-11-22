import {
  IEngineConfig,
  IEntitiesManager,
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
  private _entitiesManager: IEntitiesManager

  constructor(private readonly _engineConfig: IEngineConfig) {
    this._logger = this._engineConfig.logger
    this._logger.log(`Logger`)
    this._logger.log(`Game Loop`)
    this._gameLoop = this._engineConfig.gameLoop
    this._logger.log(`Renderer`)
    this._renderer = this._engineConfig.renderer
    this._logger.log(`Input`)
    this._input = this._engineConfig.input
    this._logger.log(`Entities Manager`)
    this._entitiesManager = this._engineConfig.entitiesManager
  }

  updateCallback = (dt: number) => {
    this._entitiesManager.updateEntities(dt)
  }

  renderCallback = (dt: number) => {
    this._renderer.clearCanvas()
    this._entitiesManager.renderEntities(dt)
  }

  startEngine() {
    this._logger.log(`Starting Engine`)
    this._logger.log(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.log(`Subscribe To Render`)
    this._gameLoop.subscribeToRender(this.renderCallback)
    this._logger.log(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }

  stopEngine() {
    this._logger.log(`Stoping Engine`)
    this._logger.log(`Stoping Game Loop`)
    this._gameLoop.stopLoop()
    this._logger.log(`Unsubscribe From Render`)
    this._gameLoop.unsubscribeFromRender(this.renderCallback)
    this._logger.log(`Unsubscribe From Update`)
    this._gameLoop.unsubscribeFromUpdate(this.updateCallback)
  }
}
