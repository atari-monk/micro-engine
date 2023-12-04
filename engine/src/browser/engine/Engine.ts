import {
  ICamera,
  IEngineConfig,
  IEntity,
  IEntityManager,
  IGameLoop,
  IInputManager,
  ILogger,
  IRendererV2,
  IVector2,
} from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'

export default class Engine {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger
  private readonly _input: IInputManager
  private _entityManager: IEntityManager
  private readonly _camera: ICamera
  private _player?: IEntity
  private _playerPosition?: IVector2

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
    this._entityManager = this._engineConfig.entityManager
    this._camera = this._engineConfig.camera
  }

  updateCallback = (dt: number) => {
    this._entityManager.updateEntities(dt)
  }

  renderCallback = (dt: number) => {
    this._renderer.clearCanvas()
    this._renderer.fillCanvas('rgba(87, 40, 145, 0.8)')
    if (this._playerPosition) this._camera.setPosition(this._playerPosition)
    this._entityManager.renderEntities(dt)
    this._renderer.resetTranslation()
  }

  startEngine() {
    this._logger.log(`Starting Engine`)
    this._player = this._entityManager.getEntity('player1')
    this._playerPosition =
      this._player?.getComponentByType<ObjectComponent>(
        ObjectComponent
      )?.position
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
    this._player = undefined
    this._playerPosition = undefined
  }
}
