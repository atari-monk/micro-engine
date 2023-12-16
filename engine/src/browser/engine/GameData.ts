import {
  IEntityDataModel,
  IGameData,
  IImmutableVector2,
  IManager,
  ITileMapDataFactory,
} from 'engine_api'
import TilemapDataFactory from '../../tech/tile_map/TilemapDataFactory'
import { EntityData } from '../entity/data/EntityData'

export default class GameData implements IGameData {
  public entityData: IManager<IEntityDataModel>
  public tileMapData: ITileMapDataFactory

  constructor(center: IImmutableVector2) {
    this.entityData = new EntityData(center)
    this.tileMapData = new TilemapDataFactory()
  }
}
