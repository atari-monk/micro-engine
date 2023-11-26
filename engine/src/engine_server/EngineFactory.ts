import {
  ILogger,
  LogLevel,
  IObjectDataManager,
  IEntitiesManager,
  IObject,
  IGameData,
  IRendererV2,
} from 'engine_api'
import EntityFactory from '../entity/EntityFactory'
import ObjectDataManager from '../entity/ObjectDataManager'
import EntitiesManager from '../entity_component/EntitiesManager'
import GameLoop from '../game_loop_server/GameLoop'
import LogManager from '../log_manager/LogManager'
import { RendererMock } from '../renderer/RendererMock'
import Tilemap from '../tile_map/Tilemap'
import PlayerEntity from '../entity_server/PlayerEntity'
import ObjectEntity from '../entity_server/ObjectEntity'
import Engine from './Engine'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  protected readonly _entityFactory: EntityFactory = new EntityFactory()
  protected readonly _entitiesManager: IEntitiesManager = new EntitiesManager()
  protected _gameLoop: GameLoop
  private readonly _tileMap: Tilemap

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor() {
    this._renderer = new RendererMock()
    this._tileMap = new Tilemap(this._renderer)
    this._gameLoop = new GameLoop(this._entitiesManager)
  }

  createEngine(gameData: IGameData) {
    this.InitializeEngine(gameData)
    return new Engine(this._logger, this._entitiesManager, this._gameLoop)
  }

  private InitializeEngine(gameData: IGameData) {
    this._tileMap.load(gameData.tileMapData)
    this.loadObjectData(gameData.objectData.getAllObjectData())
    this.createEntities()
  }

  private loadObjectData(data: Record<string, IObject>) {
    for (const [key, value] of Object.entries(data)) {
      this._objectDataManager.addObjectData(key, value)
    }
  }

  private createEntities() {
    this.createMap()
    this.createObject()
    this.createPlayers()
  }

  private createMap() {
    this._entitiesManager.addEntity(
      'map',
      this._entityFactory.createMapEntity(this._tileMap)
    )
  }

  private createObject() {
    this._entitiesManager.addEntity(
      'object',
      new ObjectEntity(this._objectDataManager.getObjectData('object'))
    )
  }

  private createPlayers() {
    this._entitiesManager.addEntity(
      'player1',
      new PlayerEntity(this._objectDataManager.getObjectData('player1'))
    )
    this._entitiesManager.addEntity(
      'player2',
      new PlayerEntity(this._objectDataManager.getObjectData('player2'))
    )
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this._objectDataManager.removeAllObjectData()
    this._entitiesManager.removeAllEntities()
  }
}
