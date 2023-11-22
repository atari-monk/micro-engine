import { ITilemapDataFactory } from 'engine_api'
import ObjectDataFactory from '../entity/ObjectDataFactory'

export default interface IGameData {
  objectData: ObjectDataFactory
  tileMapData: ITilemapDataFactory
}
