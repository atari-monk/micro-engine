// import {
//   ICamera,
//   IEntityManager,
//   IGameClientApi,
//   IGameData,
//   ILogger,
//   IObject,
//   IManager,
//   IRendererV2,
//   LogLevel,
//   IEntityDataModel,
// } from 'engine_api'
// import { IClientPlayerManager as IPlayerManager } from 'engine_api/client'
// import { GameLoop } from '../game_loop/GameLoop'
// import InputManager from '../../tech/input_manager/InputManager'
// import LogManager from '../../tech/log_manager/LogManager'
// import Tilemap from '../../tech/tile_map/Tilemap'
// import RendererV2 from '../../tech/renderer/RendererV2'
// import Camera from '../../tech/camera/Camera'
// import Engine from './Engine'
// import PlayerManager from '../entity/PlayerManager'
// import EntityManager from '../../tech/entity_component/EntityManager'
// import SimpleEntityCreator from '../entity/SimpleEntityCreator'

// export default class EngineFactory {
//   private readonly _renderer: IRendererV2
//   private readonly _input: InputManager = new InputManager()
//   private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
//   private readonly _objectDataManager: IManager<IObject> =
//     new ObjectDataManager()
//   private readonly _entityManager: IEntityManager = new EntityManager()
//   private readonly _playerManager: IPlayerManager = new PlayerManager(
//     this._entityManager
//   )
//   private _gameLoop: GameLoop
//   private readonly _tileMap: Tilemap
//   private _keyDownHandler: (event: KeyboardEvent) => void
//   private _keyUpHandler: (event: KeyboardEvent) => void
//   private _engineConfig?: IEngineConfig
//   private readonly _camera: ICamera
//   private readonly _entityCreator: SimpleEntityCreator

//   get renderer(): IRendererV2 {
//     return this._renderer
//   }

//   constructor(canvasId: string, private readonly _clientApi: IGameClientApi) {
//     this._renderer = new RendererV2(canvasId)
//     this._tileMap = new Tilemap()
//     this._tileMap.renderer = this._renderer
//     this._camera = new Camera()
//     this._camera.renderer = this._renderer
//     this._gameLoop = new GameLoop(this._entityManager, this._clientApi)
//     this._keyDownHandler = (event: KeyboardEvent) => {
//       this._input.handleKeyDown(event.key)
//     }
//     this._keyUpHandler = (event: KeyboardEvent) => {
//       this._input.handleKeyUp(event.key)
//     }
//     this._entityCreator = new SimpleEntityCreator(
//       this._entityManager,
//       this._objectDataManager
//     )
//     this._entityCreator.mapEntityBuilder
//       .withLogger(this._logger)
//       .withTileMap(this._tileMap)
//     this._entityCreator.objectEntityBuilder
//       .withLogger(this._logger)
//       .withRenderer(this._renderer)
//     this._entityCreator.playerEntityBuilder
//       .withLogger(this._logger)
//       .withRenderer(this._renderer)
//       .withInputManager(this._input)
//   }

//   createEngine(gameData: IGameData) {
//     this.InitializeEngine(gameData)
//     this._engineConfig = this.createEngineConfig()
//     return new Engine(this._engineConfig!)
//   }

//   private InitializeEngine(gameData: IGameData) {
//     this.subscribeKeyboardEvents()
//     this._camera.load(gameData.tileMapData)
//     this._tileMap.load(gameData.tileMapData)
//     this.loadObjectData(gameData.entityData)
//     this._entityCreator.createEntities()
//   }

//   private createEngineConfig() {
//     return {
//       gameLoop: this._gameLoop,
//       renderer: this._renderer,
//       logger: this._logger,
//       input: this._input,
//       entityManager: this._entityManager,
//       playerManager: this._playerManager,
//       camera: this._camera,
//     } as IEngineConfig
//   }

//   private subscribeKeyboardEvents() {
//     document.addEventListener('keydown', this._keyDownHandler)
//     document.addEventListener('keyup', this._keyUpHandler)
//   }

//   private loadObjectData(objectDataManager: IManager<IEntityDataModel>) {
//     objectDataManager.forEach((name, entityData) => {
//       this._objectDataManager.add(name, entityData.object)
//     })
//   }

//   reloadEngine(gameData: IGameData) {
//     this.resetEngine()
//     this.InitializeEngine(gameData)
//   }

//   private resetEngine() {
//     this.unsubscribeKeyboardEvents()
//     this._input.unsubscribeAll('KeyDown')
//     this._objectDataManager.removeAll()
//     this._entityManager.removeAll()
//   }

//   private unsubscribeKeyboardEvents(): void {
//     document.removeEventListener('keydown', this._keyDownHandler)
//     document.removeEventListener('keyup', this._keyUpHandler)
//   }
// }
