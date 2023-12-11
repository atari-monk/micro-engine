import {
  ICamera,
  IEngineClientApi,
  IEntityManager,
  IEntity,
  IGameLoop,
  IInputManager,
  ILogger,
  IRendererV2,
  IVector2,
  IGameFrameDto,
  IResult,
} from 'engine_api'
import {
  IClientEngineConfig,
  IClientPlayerManager as IPlayerManager,
} from 'engine_api/client'
import ObjectComponent from '../../browser/component/ObjectComponent'
import { GameLoop } from '../game_loop/GameLoop'

export default class Engine implements IEngineClientApi {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger
  private readonly _input: IInputManager
  private _entityManager: IEntityManager
  private readonly _playerManager: IPlayerManager
  private readonly _camera: ICamera
  private _player: IEntity = {} as IEntity
  private _playerPosition?: IVector2
  private _clientId: string = ''

  set clientId(id: string) {
    this._clientId = id
  }

  get clientId(): string {
    return this._clientId
  }

  constructor(private readonly _engineConfig: IClientEngineConfig) {
    this._logger = this._engineConfig.logger
    this._logger.debug(`Logger`)
    this._logger.debug(`Game Loop`)
    this._gameLoop = this._engineConfig.gameLoop
    this._logger.debug(`Renderer`)
    this._renderer = this._engineConfig.renderer
    this._logger.debug(`Input`)
    this._input = this._engineConfig.input
    this._logger.debug(`Entities Manager`)
    this._entityManager = this._engineConfig.entityManager
    this._playerManager = this._engineConfig.playerManager
    this._camera = this._engineConfig.camera
  }

  addPlayer(socketId: string): IResult {
    return this._playerManager.addPlayer(socketId)
  }

  getPlayer1Id(): string {
    return this._playerManager.getPlayer1Id()
  }

  updatePlayer(gameFrameDTO: IGameFrameDto): void {
    this._playerManager.updatePlayer(gameFrameDTO)
  }

  loadGameLoop() {
    ;(this._gameLoop as GameLoop).load(this.clientId)
  }

  updateCallback = (dt: number) => {
    this._entityManager.update(dt)
  }

  renderCallback = (dt: number) => {
    this._renderer.clearCanvas()
    this._renderer.fillCanvas('rgba(87, 40, 145, 0.8)')
    if (this._playerPosition) this._camera.setPosition(this._playerPosition)
    this._entityManager.render(dt)
    this._renderer.resetTranslation()
  }

  startEngine() {
    this._logger.debug(`Starting Engine`)
    this._player = this._entityManager.getStrict('player1')
    this._playerPosition =
      this._player.getComponentByType<ObjectComponent>(
        ObjectComponent
      )?.position
    this._logger.debug(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.debug(`Subscribe To Render`)
    this._gameLoop.subscribeToRender(this.renderCallback)
    this._logger.debug(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }

  stopEngine() {
    this._logger.debug(`Stoping Engine`)
    this._logger.debug(`Stoping Game Loop`)
    this._gameLoop.stopLoop()
    this._logger.debug(`Unsubscribe From Render`)
    this._gameLoop.unsubscribeFromRender(this.renderCallback)
    this._logger.debug(`Unsubscribe From Update`)
    this._gameLoop.unsubscribeFromUpdate(this.updateCallback)
    this._player = {} as IEntity
    this._playerPosition = undefined
  }
}
