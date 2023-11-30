import IEntity from './IEntity'

export default interface IEntitiesManager {
  getAllEntities(): Record<string, IEntity>
  addEntity(name: string, entity: IEntity): void
  getEntityCount(): number
  getEntity(name: string): IEntity
  removeEntity(name: string): void
  removeAllEntities(): void
  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
