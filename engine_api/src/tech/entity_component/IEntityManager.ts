import IEntity from './IEntity'

export default interface IEntityManager {
  addEntity(name: string, entity: IEntity): void

  removeEntity(name: string): void
  removeAllEntities(): void

  getEntityCount(): number
  getEntity(name: string): IEntity
  getEntity(name: string): IEntity

  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
