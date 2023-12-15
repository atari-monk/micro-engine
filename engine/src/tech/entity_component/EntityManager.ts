import { IEntity, IEntityManager, ILogger } from 'engine_api'
import MapManager from './MapManager'

export default class EntityManager
  extends MapManager<IEntity>
  implements IEntityManager
{
  update(dt: number): void {
    for (const entity of this.values()) {
      entity.update(dt)
    }
  }

  render(dt: number): void {
    for (const entity of this.values()) {
      entity.render(dt)
    }
  }
}
