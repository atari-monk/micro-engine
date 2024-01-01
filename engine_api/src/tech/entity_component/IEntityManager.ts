import IManager from './IManager'
import IEntity from './IEntity'

export default interface IEntityManager extends IManager<IEntity> {
  update(deltaTime: number): void
  render(deltaTime: number): void
}
