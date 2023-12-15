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
  ISprite,
  ITileMap,
  IVector2,
} from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'

export default class Engine2 {
  private readonly _logger: ILogger
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _input: IInputManager
  private _keyDownHandler!: (event: KeyboardEvent) => void
  private _keyUpHandler!: (event: KeyboardEvent) => void
  private readonly _entityDataManager: IManager<ISprite>
  private readonly _entityManager: IEntityManager
  private readonly _camera: ICamera
  private readonly _tileMap: ITileMap
  private readonly _entityCreator: IEntityCreator

  private _player?: IEntity
  private _playerPosition?: IVector2

  constructor(
    logger: ILogger,
    gameLoop: IGameLoop,
    renderer: IRendererV2,
    input: IInputManager,
    entityDataManager: IManager<ISprite>,
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
    this.loadEntityData(gameData.spriteData)
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

  private loadEntityData(dataManager: IManager<ISprite>) {
    dataManager.forEach((name, sprite) => {
      this._entityDataManager.add(name, sprite)
    })
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }

  start() {
    this._logger.log(`Starting Engine`)
    this.setupCamera()
    this._gameLoop.subscribeToUpdate(this.update)
    this._gameLoop.subscribeToRender(this.render)
    this._gameLoop.startLoop()
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

  private setupCamera() {
    this._player = this._entityManager.getStrict('player1')
    this._playerPosition =
      this._player.getComponentByType<ObjectComponent>(ObjectComponent).position
  }

  stop() {
    this._logger.log(`Stoping Engine`)
    this._gameLoop.stopLoop()
    this._gameLoop.unsubscribeFromRender(this.render)
    this._gameLoop.unsubscribeFromUpdate(this.update)
    this._player = undefined
    this._playerPosition = undefined
  }
}
