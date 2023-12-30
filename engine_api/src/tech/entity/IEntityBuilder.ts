import IEntityDataModel from "../data_model/IEntityDataModel";

export default interface IEntityBuilder {
  get entityData(): IEntityDataModel
  build(entityDataKey: string, entityKey: string): void
}
