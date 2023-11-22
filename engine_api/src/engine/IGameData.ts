import IObjectDataManager from '../entity/IObjectDataManager'
import ITilemapDataFactory from '../tile_map/ITilemapDataFactory'

export default interface IGameData {
  objectData: IObjectDataManager
  tileMapData: ITilemapDataFactory
}
