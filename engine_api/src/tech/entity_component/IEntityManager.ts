import IManager from './IManager'
import IEntity from './IEntity'

export default interface IEntityManager extends IManager<IEntity> {
  update(dt: number): void
  render(dt: number): void
}
