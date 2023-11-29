import IObjectDataManager from '../../tech/entity/IObjectDataManager'
import ITilemapDataFactory from '../../tech/tile_map/ITilemapDataFactory'

export default interface IGameData {
  objectData: IObjectDataManager
  tileMapData: ITilemapDataFactory
}
