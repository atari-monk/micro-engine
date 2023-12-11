import {
  ILogger,
  LogLevel,
  IEntityManager,
  IObject,
  IGameData,
  IRendererV2,
  IGameServerApi,
  IEntityDependencyListBuilder,
  IManager,
} from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectDataManagerOnMap from '../../browser/entity/ObjectDataManagerOnMap'
import LogManager from '../../tech/log_manager/LogManager'
import { RendererMock } from '../../tech/renderer/RendererMock'
import Tilemap from '../../tech/tile_map/Tilemap'
import Engine from './Engine'
import GameLoop from '../game_loop/GameLoop'
import MapEntityManager from '../../tech/entity_component/MapEntityManager'
import MapPlayerManager from '../entity/MapPlayerManager'
import { EntityDependencyListBuilder } from '../../browser/entity/builder/EntityDependencyListBuilder'
import EntityCreator from '../entity/EntityCreator'
import EntityCreatorBuilder from '../entity/EntityCreatorBuilder'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IManager<IObject> =
    new ObjectDataManagerOnMap()
  protected readonly _dependencyBuilder: IEntityDependencyListBuilder =
    new EntityDependencyListBuilder()
  private readonly _entityManager: IEntityManager = new MapEntityManager(
    this._logger
  )
  private readonly _playerManager: IPlayerManager = new MapPlayerManager(
    this._logger
  )
  private _gameLoop: GameLoop
  private readonly _tileMap: Tilemap
  private readonly _entityCreator: EntityCreator

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(private readonly _serverApi: IGameServerApi) {
    this._renderer = new RendererMock()
    this._tileMap = new Tilemap(this._renderer)
    this._gameLoop = new GameLoop(this._serverApi, this._playerManager)
    this._entityCreator = new EntityCreatorBuilder()
      .withDependencyBuilder(this._dependencyBuilder)
      .withEntityManager(this._entityManager)
      .withObjectDataManager(this._objectDataManager)
      .withLogger(this._logger)
      .withTileMap(this._tileMap)
      .withRenderer(this._renderer)
      .build()
  }

  createEngine(gameData: IGameData) {
    this.InitializeEngine(gameData)
    return new Engine(
      this._logger,
      this._entityManager,
      this._playerManager,
      this._gameLoop,
      this._serverApi
    )
  }

  private InitializeEngine(gameData: IGameData) {
    this._tileMap.load(gameData.tileMapData)
    this.loadObjectData(gameData.objectData)
    this._entityCreator.createEntities()
  }

  private loadObjectData(objectDataManager: IManager<IObject>) {
    objectDataManager.forEach((name, object) => {
      this._objectDataManager.add(name, object)
    })
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this._objectDataManager.removeAll()
    this._entityManager.removeAllEntities()
  }
}
