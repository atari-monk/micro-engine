import { IEntityCreator, IEntityBuilder } from 'engine_api'
import DataLoader from '../../../utils/data_loader/DataLoader'
import IEntityCreatorData from './IEntityCreatorData'

export default class EntityCreator implements IEntityCreator {
  private _builders: Map<string, IEntityBuilder> = new Map()
  private _dataLoader = new DataLoader<IEntityCreatorData>(
    'data/entityCreatorData.json'
  )

  addBuilder(key: string, builder: IEntityBuilder): void {
    this._builders.set(key, builder)
  }

  protected build(key: string, entityDataKey: string, entityKey: string): void {
    const builder = this._builders.get(key)
    if (!builder) throw new Error(`Builder with key '${key}' not found.`)
    builder.build(entityDataKey, entityKey)
  }

  async createEntities(): Promise<void> {
    const dataArray = await this._dataLoader.getData()
    dataArray.forEach((data) => {
      this.build(data.builder, data.entityDataKey, data.entityKey)
    })
  }
}
