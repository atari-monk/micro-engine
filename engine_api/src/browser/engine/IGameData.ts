import ITilemapDataFactory from '../../tech/tile_map/ITilemapDataFactory'
import IManager from '../../tech/entity_component/IManager'
import IObject from '../component/IObject'

export default interface IGameData {
  objectData: IManager<IObject>
  tileMapData: ITilemapDataFactory
}
