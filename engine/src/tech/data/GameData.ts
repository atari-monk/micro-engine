import {
  IEntityDataModel,
  IGameData,
  IManager,
  ITileMapDataFactory,
} from 'engine_api'

export default class GameData implements IGameData {
  public entityData!: IManager<IEntityDataModel>
  public tileMapData!: ITileMapDataFactory
}
