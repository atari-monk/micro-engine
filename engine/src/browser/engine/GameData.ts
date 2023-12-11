import {
  IGameData,
  IManager,
  IObject,
  IRendererV2,
  ITilemapDataFactory,
} from 'engine_api'
import SimpleGraphicData from '../entity/data/SimpleGraphicData'
import TilemapDataFactory from '../../tech/tile_map/TilemapDataFactory'

export default class GameData implements IGameData {
  public objectData: IManager<IObject>
  public tileMapData: ITilemapDataFactory

  constructor(private readonly _renderer: IRendererV2) {
    this.objectData = new SimpleGraphicData(this._renderer)
    this.tileMapData = new TilemapDataFactory()
  }
}
