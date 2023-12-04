import IEntity from './IEntity'

export default interface IEntityManager {
  addEntity(name: string, entity: IEntity): void

  removeEntity(name: string): void
  removeAllEntities(): void

  getAll(): Map<string, IEntity>
  getAllAsRecord(): Record<string, IEntity>

  getEntityCount(): number
  getEntity(name: string): IEntity
  getEntity(name: string, defaultValue: IEntity): IEntity

  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
