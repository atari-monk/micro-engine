import ITileMapDataFactory from '../tile_map/ITileMapDataFactory'
import IManager from '../entity_component/IManager'
import IEntityDataModel from './IEntityDataModel'

export default interface IGameData {
  entityData: IManager<IEntityDataModel>
  tileMapData: ITileMapDataFactory
}
