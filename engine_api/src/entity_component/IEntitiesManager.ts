import IEntity from './IEntity'

export default interface IEntitiesManager {
  addEntity(name: string, entity: IEntity): void
  getEntity(name: string): IEntity
  removeEntity(name: string): void
  removeAllEntities(): void
  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
