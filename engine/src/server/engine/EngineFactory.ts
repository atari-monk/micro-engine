import {
  ILogger,
  LogLevel,
  IObjectDataManager,
  IEntityManager,
  IObject,
  IGameData,
  IRendererV2,
  IGameServerApi,
  IEntityDependencyListBuilder,
} from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectDataManager from '../../browser/entity/ObjectDataManager'
import LogManager from '../../tech/log_manager/LogManager'
import { RendererMock } from '../../tech/renderer/RendererMock'
import Tilemap from '../../tech/tile_map/Tilemap'
import Engine from './Engine'
import GameLoop from '../game_loop/GameLoop'
import EntityManager2 from '../../tech/entity_component/EntityManager2'
import PlayerManager2 from '../entity/PlayerManager2'
import { EntityDependencyListBuilder } from '../../browser/entity/builder/EntityDependencyListBuilder'
import EntityCreator from '../entity/EntityCreator'
import EntityCreatorBuilder from '../entity/EntityCreatorBuilder'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  protected readonly _dependencyBuilder: IEntityDependencyListBuilder =
    new EntityDependencyListBuilder()
  private readonly _entityManager: IEntityManager = new EntityManager2(
    this._logger
  )
  private readonly _playerManager: IPlayerManager = new PlayerManager2(
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
    this.loadObjectData(gameData.objectData.getAllObjectData())
    this.createEntities()
  }

  private loadObjectData(data: Record<string, IObject>) {
    for (const [key, value] of Object.entries(data)) {
      this._objectDataManager.addObjectData(key, value)
    }
  }

  private createEntities() {
    this._entityCreator.createEntities()
    // this._entityFactory.playerEntityBuilder = new PlayerEntityBuilder(
    //   PlayerEntity,
    //   this._dependencyBuilder
    // )
    // this._entityFactory.objectEntityBuilder = new ObjectEntityBuilder(
    //   ObjectEntity,
    //   this._dependencyBuilder
    // )
    // this._dependencyBuilder.setLogger(this._logger)
    // this._dependencyBuilder.setTileMap(this._tileMap)
    // this._entityManager.addEntity('map', this._entityFactory.createMapEntity())
    // this._dependencyBuilder.setRenderer(this._renderer)
    // this._dependencyBuilder.setObjectData(
    //   this._objectDataManager.getObjectData('object')
    // )
    // this._entityManager.addEntity(
    //   'object',
    //   this._entityFactory.createObjectEntity()
    // )
    // this._dependencyBuilder.setObjectData(
    //   this._objectDataManager.getObjectData('player1')
    // )
    // this._entityManager.addEntity(
    //   'player1',
    //   this._entityFactory.createPlayerEntity()
    // )
    // this._dependencyBuilder.setObjectData(
    //   this._objectDataManager.getObjectData('player2')
    // )
    // this._entityManager.addEntity(
    //   'player2',
    //   this._entityFactory.createPlayerEntity()
    // )
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this._objectDataManager.removeAllObjectData()
    this._entityManager.removeAllEntities()
  }
}
