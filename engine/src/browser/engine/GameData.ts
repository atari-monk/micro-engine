import {
  IGameData,
  IManager,
  IObject,
  IRendererV2,
  ISprite,
  ITilemapDataFactory,
} from 'engine_api'
import ObjectData from '../entity/data/ObjectData'
import TilemapDataFactory from '../../tech/tile_map/TilemapDataFactory'
import { SpriteData } from '../entity/data/SpriteData'

export default class GameData implements IGameData {
  public objectData: IManager<IObject>
  public spriteData: IManager<ISprite>
  public tileMapData: ITilemapDataFactory

  constructor(private readonly _renderer: IRendererV2) {
    this.objectData = new ObjectData(this._renderer)
    this.spriteData = new SpriteData(this._renderer)
    this.tileMapData = new TilemapDataFactory()
  }
}
