import IEntityBuilder from './IEntityBuilder'

export default interface IEntityCreator {
  addBuilder(key: string, builder: IEntityBuilder): void
  createEntities(): Promise<void>
}
