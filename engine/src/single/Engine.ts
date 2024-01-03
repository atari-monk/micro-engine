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
  IConfigurationManager,
  IEventSystem,
} from 'engine_api'
import ObjectComponent from '../tech/component/ObjectComponent'
import IEngineConfigOptions from '../tech/config_manager/IEngineConfigOptions'
import CollisionManager from '../tech/collision_detector/CollisionManager'
import ILogicSystemManager from '../tech/entity_component_system/system/logic/ILogicSystemManager'
import IInitLogicSystemManager from '../tech/entity_component_system/system/init_logic/IInitLogicSystemManager'
import IRenderSystemManager from '../tech/entity_component_system/system/render/IRenderSystemManager'

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
  protected readonly _configManager: IConfigurationManager<IEngineConfigOptions>
  protected readonly _collisionManager: CollisionManager
  protected readonly _eventSystem: IEventSystem
  protected readonly _logicSystemManager: ILogicSystemManager
  protected readonly _initLogicSystemManager: IInitLogicSystemManager
  protected readonly _renderSystemManager: IRenderSystemManager
  private _afterCreateEntitiesCallback: (
    entityManager: IEntityManager
  ) => void = () => {}

  protected _player: IEntity = {} as IEntity
  protected _playerPosition: IVector2 = {} as IVector2
  protected _config: IEngineConfigOptions = {} as IEngineConfigOptions

  get configManager() {
    return this._configManager
  }

  set afterCreateEntitiesCallback(
    callback: (entityManager: IEntityManager) => void
  ) {
    this._afterCreateEntitiesCallback = callback
  }

  get logicSystemManager() {
    return this._logicSystemManager
  }

  get initLogicSystemManager() {
    return this._initLogicSystemManager
  }

  get renderSystemManager() {
    return this._renderSystemManager
  }

  get renderer() {
    return this._renderer
  }

  get entityManager() {
    return this._entityManager
  }

  get input() {
    return this._input
  }

  get eventSystem() {
    return this._eventSystem
  }

  get collisionManager() {
    return this._collisionManager
  }

  get entityDataManager() {
    return this._entityDataManager
  }

  constructor(
    logger: ILogger,
    gameLoop: IGameLoop,
    renderer: IRendererV2,
    input: IInputManager,
    entityDataManager: IManager<IEntityDataModel>,
    entityManager: IEntityManager,
    camera: ICamera,
    tileMap: ITileMap,
    entityCreator: IEntityCreator,
    configManager: IConfigurationManager<IEngineConfigOptions>,
    collisionManager: CollisionManager,
    eventSystem: IEventSystem,
    logicSystemManager: ILogicSystemManager,
    initLogicSystemManager: IInitLogicSystemManager,
    renderSystemManager: IRenderSystemManager
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
    this._configManager = configManager
    this._collisionManager = collisionManager
    this._eventSystem = eventSystem
    this._logicSystemManager = logicSystemManager
    this._initLogicSystemManager = initLogicSystemManager
    this._renderSystemManager = renderSystemManager
  }

  async initialize(gameData: IGameData) {
    this.subscribeKeyboardEvents()
    this._camera.load(gameData.tileMapData)
    this._tileMap.load(gameData.tileMapData)
    this.loadEntityData(gameData.entityData)
    await this._entityCreator.createEntities()
    this._afterCreateEntitiesCallback(this._entityManager)
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
    this._config = this._configManager.getConfig()
    if (this._config.enableCamera) this.setupCamera()
    this._gameLoop.subscribeUpdate(this.update)
    this._gameLoop.subscribeRender(this.render)
    this._gameLoop.start()
  }

  private setupCamera() {
    this._player = this._entityManager.getStrict('player1')
    this._playerPosition =
      this._player.getComponentByType<ObjectComponent>(ObjectComponent).position
  }

  private update = (deltaTime: number) => {
    this._logicSystemManager.update(deltaTime)
    this._entityManager.update(deltaTime)
  }

  private render = (deltaTime: number) => {
    this._renderer.clearCanvas()
    this._renderer.fillCanvas('rgba(0, 0, 0, 1)')
    if (this._config.enableCamera && this._playerPosition)
      this._camera.setPosition(this._playerPosition)
    this._renderSystemManager.render(deltaTime)
    this._entityManager.render(deltaTime)
    if (this._config.enableCamera) this._renderer.resetTranslation()
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
