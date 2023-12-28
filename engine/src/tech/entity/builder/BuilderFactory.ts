import {
  IEntityCreator,
  IManager,
  IEntityDataModel,
  IEntityManager,
  ILogger,
  ITileMap,
  IInputManager,
  IRendererV2,
} from 'engine_api'
import BallBuilder from './BallBuilder'
import { BuilderLibrary } from './BuilderLibrary'
import FootballGateBuilder from './FootballGateBuilder'
import SinglePlayerBuilder from './SinglePlayerBuilder'
import TileMapBuilder from './TileMapBuilder'
import CollisionManager from '../../collision_detector/CollisionManager'

export default class BuilderFactory {
  constructor(
    private readonly _entityCreator: IEntityCreator,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager,
    private readonly _logger: ILogger,
    private readonly _tileMap: ITileMap,
    private readonly _renderer: IRendererV2,
    private readonly _collisionManager: CollisionManager,
    private readonly _input: IInputManager
  ) {}

  createBuilder(builderType: BuilderLibrary) {
    switch (builderType) {
      case BuilderLibrary.TileMap:
        return new TileMapBuilder(
          this._entityCreator,
          this._entityDataManager,
          this._entityManager,
          this._logger,
          this._tileMap
        )
      case BuilderLibrary.FootballGate:
        return new FootballGateBuilder(
          this._entityCreator,
          this._entityDataManager,
          this._entityManager,
          this._logger,
          this._renderer
        )
      case BuilderLibrary.Football:
        return new BallBuilder(
          this._entityCreator,
          this._entityDataManager,
          this._entityManager,
          this._logger,
          this._renderer
        )
      case BuilderLibrary.SinglePlayer:
        return new SinglePlayerBuilder(
          this._entityCreator,
          this._entityDataManager,
          this._entityManager,
          this._logger,
          this._renderer,
          this._collisionManager,
          this._input
        )
      default:
        throw new Error(`Invalid builder type: ${builderType}`)
    }
  }
}
