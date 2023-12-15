import {
  ILogger,
  LogLevel,
  IEntityManager,
  IObject,
  IGameData,
  IRendererV2,
  IGameServerApi,
  IManager,
} from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectDataManager from '../../browser/entity/manager/ObjectDataManager'
import LogManager from '../../tech/log_manager/LogManager'
import { RendererMock } from '../../tech/renderer/RendererMock'
import Tilemap from '../../tech/tile_map/Tilemap'
import Engine from './Engine'
import GameLoop from '../game_loop/GameLoop'
import EntityManager from '../../tech/entity_component/EntityManager'
import PlayerManager from '../entity/PlayerManager'
import SimpleEntityCreator from '../entity/SimpleEntityCreator'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IManager<IObject> =
    new ObjectDataManager()
  private readonly _entityManager: IEntityManager = new EntityManager()
  private readonly _playerManager: IPlayerManager = new PlayerManager()
  private _gameLoop: GameLoop
  private readonly _tileMap: Tilemap
  private readonly _entityCreator: SimpleEntityCreator

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(private readonly _serverApi: IGameServerApi) {
    this._renderer = new RendererMock()
    this._tileMap = new Tilemap()
    this._gameLoop = new GameLoop(this._serverApi, this._playerManager)
    this._entityCreator = new SimpleEntityCreator(
      this._entityManager,
      this._objectDataManager
    )
    this._entityCreator.mapEntityBuilder
      .withLogger(this._logger)
      .withTileMap(this._tileMap)
    this._entityCreator.objectEntityBuilder.withLogger(this._logger)
    this._entityCreator.playerEntityBuilder.withLogger(this._logger)
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
    this._entityManager.removeAll()
  }
}
