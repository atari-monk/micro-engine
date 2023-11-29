import {
  ILogger,
  LogLevel,
  IObjectDataManager,
  IEntitiesManager,
  IObject,
  IGameData,
  IRendererV2,
  IGameServerApi,
} from 'engine_api'
import EntityFactory from '../../browser/entity/EntityFactory'
import ObjectDataManager from '../../browser/entity/ObjectDataManager'
import EntitiesManager from '../../tech/entity_component/EntitiesManager'
import LogManager from '../../tech/log_manager/LogManager'
import { RendererMock } from '../../tech/renderer/RendererMock'
import Tilemap from '../../tech/tile_map/Tilemap'
import PlayerEntity from '../entity/PlayerEntity'
import ObjectEntity from '../entity/ObjectEntity'
import Engine from './Engine'
import GameLoop from '../game_loop/GameLoop'
import PlayerManager from '../entity/PlayerManager'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  private readonly _entityFactory: EntityFactory = new EntityFactory()
  private readonly _entitiesManager: IEntitiesManager = new EntitiesManager()
  private readonly _playerManager: PlayerManager = new PlayerManager()
  private _gameLoop: GameLoop
  private readonly _tileMap: Tilemap

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(private readonly _serverApi: IGameServerApi) {
    this._renderer = new RendererMock()
    this._tileMap = new Tilemap(this._renderer)
    this._gameLoop = new GameLoop(this._serverApi, this._playerManager)
  }

  createEngine(gameData: IGameData) {
    this.InitializeEngine(gameData)
    return new Engine(
      this._logger,
      this._entitiesManager,
      this._playerManager,
      this._gameLoop
    )
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
