import { ITilemapDataFactory } from 'engine_api'
import ObjectDataFactory from '../entity/ObjectDataFactory'
import TilemapDataFactory from '../tile_map/TilemapDataFactory'
import IGameData from './IGameData'

export default class GameData implements IGameData {
  public objectData: ObjectDataFactory
  public tileMapData: ITilemapDataFactory

  constructor() {
    this.objectData = new ObjectDataFactory()
    this.tileMapData = new TilemapDataFactory()
  }
}
