import { ISprite } from '../browser'
import IEntityManager from '../tech/entity_component/IEntityManager'
import IManager from '../tech/entity_component/IManager'

export default interface IEntityCreator {
  set entityManager(entityManager: IEntityManager)
  set dataManager(dataManager: IManager<ISprite>)
  createEntities(): void
}
