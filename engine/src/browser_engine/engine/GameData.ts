import {
  IGameData,
  IObjectDataManager,
  IRendererV2,
  ITilemapDataFactory,
} from 'engine_api'
import ObjectDataFactory from '../entity/ObjectDataFactory'
import TilemapDataFactory from '../../engine_tech/tile_map/TilemapDataFactory'

export default class GameData implements IGameData {
  public objectData: IObjectDataManager
  public tileMapData: ITilemapDataFactory

  constructor(private readonly _renderer: IRendererV2) {
    this.objectData = new ObjectDataFactory(this._renderer)
    this.tileMapData = new TilemapDataFactory()
  }
}
