import {
  ICamera,
  IEntity,
  IEntityCreator,
  IEntityManager,
  IGameData,
  IGameLoop,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  IEntityDataModel,
  ITileMap,
  IVector2,
} from 'engine_api'
import ObjectComponent from '../../tech/component/ObjectComponent'

export default class Engine {
  protected readonly _logger: ILogger
  protected readonly _gameLoop: IGameLoop
  protected readonly _renderer: IRendererV2
  protected readonly _input: IInputManager
  protected _keyDownHandler!: (event: KeyboardEvent) => void
  protected _keyUpHandler!: (event: KeyboardEvent) => void
  protected readonly _entityDataManager: IManager<IEntityDataModel>
  protected readonly _entityManager: IEntityManager
  protected readonly _camera: ICamera
  protected readonly _tileMap: ITileMap
  protected readonly _entityCreator: IEntityCreator

  protected _player: IEntity = {} as IEntity
  protected _playerPosition: IVector2 = {} as IVector2

  constructor(
    logger: ILogger,
    gameLoop: IGameLoop,
    renderer: IRendererV2,
    input: IInputManager,
    entityDataManager: IManager<IEntityDataModel>,
    entityManager: IEntityManager,
    camera: ICamera,
    tileMap: ITileMap,
    entityCreator: IEntityCreator
  ) {
    this._logger = logger
    this._gameLoop = gameLoop
    this._renderer = renderer
    this._input = input
    this._entityDataManager = entityDataManager
    this._entityManager = entityManager
    this._camera = camera
    this._tileMap = tileMap
    this._entityCreator = entityCreator
  }

  initialize(gameData: IGameData) {
    this.subscribeKeyboardEvents()
    this._camera.load(gameData.tileMapData)
    this._tileMap.load(gameData.tileMapData)
    this.loadEntityData(gameData.entityData)
    this._entityCreator.createEntities()
  }

  private subscribeKeyboardEvents() {
    this._keyDownHandler = (event: KeyboardEvent) => {
      this._input.handleKeyDown(event.key)
    }
    this._keyUpHandler = (event: KeyboardEvent) => {
      this._input.handleKeyUp(event.key)
    }
    document.addEventListener('keydown', this._keyDownHandler)
    document.addEventListener('keyup', this._keyUpHandler)
  }

  private loadEntityData(dataManager: IManager<IEntityDataModel>) {
    dataManager.forEach((name, sprite) => {
      this._entityDataManager.add(name, sprite)
    })
  }

  start() {
    this._logger.log(`Starting Engine`)
    this.setupCamera()
    this._gameLoop.subscribeUpdate(this.update)
    this._gameLoop.subscribeRender(this.render)
    this._gameLoop.start()
  }

  private setupCamera() {
    this._player = this._entityManager.getStrict('player1')
    this._playerPosition =
      this._player.getComponentByType<ObjectComponent>(ObjectComponent).position
  }

  private update = (dt: number) => {
    this._entityManager.update(dt)
  }

  private render = (dt: number) => {
    this._renderer.clearCanvas()
    this._renderer.fillCanvas('rgba(87, 40, 145, 1)')
    if (this._playerPosition) this._camera.setPosition(this._playerPosition)
    this._entityManager.render(dt)
    this._renderer.resetTranslation()
  }

  stop() {
    this._logger.log(`Stoping Engine`)
    this._gameLoop.stop()
    this._gameLoop.unsubscribeRender(this.render)
    this._gameLoop.unsubscribeUpdate(this.update)
    this._player = {} as IEntity
    this._playerPosition = {} as IVector2
  }

  reloadEngine(gameData: IGameData) {
    this.reset()
    this.initialize(gameData)
  }

  private reset() {
    this.unsubscribeKeyboardEvents()
    this._input.unsubscribeAll('KeyDown')
    this._entityDataManager.removeAll()
    this._entityManager.removeAll()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }

  getScreenCenter() {
    return this._renderer.getCenter()
  }
}
