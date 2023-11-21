import IEntity from './IEntity'

export default interface IEntitiesManager {
  addEntity(name: string, entity: IEntity): void
  removeEntity(name: string): void
  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
