import IManager from './IManager'
import IEntity from './IEntity'

export default interface IEntityManager extends IManager<IEntity> {
  updateEntities(dt: number): void
  renderEntities(dt: number): void
}
