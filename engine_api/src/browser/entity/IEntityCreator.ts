import IEntityBuilder from './builder/IEntityBuilder'

export default interface IEntityCreator {
  addBuilder(key: string, builder: IEntityBuilder): void
  createEntities(): void
}
