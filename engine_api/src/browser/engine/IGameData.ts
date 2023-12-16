import ITileMapDataFactory from '../../tech/tile_map/ITileMapDataFactory'
import IManager from '../../tech/entity_component/IManager'
import IEntityDataModel from '../component/IEntityDataModel'

export default interface IGameData {
  entityData: IManager<IEntityDataModel>
  tileMapData: ITileMapDataFactory
}
