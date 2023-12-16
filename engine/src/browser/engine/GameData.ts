import {
  IEntityDataModel,
  IGameData,
  IManager,
  IRendererV2,
  ITileMapDataFactory,
} from 'engine_api'
import TilemapDataFactory from '../../tech/tile_map/TilemapDataFactory'
import { EntityData } from '../entity/data/EntityData'

export default class GameData implements IGameData {
  public entityData: IManager<IEntityDataModel>
  public tileMapData: ITileMapDataFactory

  constructor(private readonly _renderer: IRendererV2) {
    this.entityData = new EntityData(this._renderer)
    this.tileMapData = new TilemapDataFactory()
  }
}
