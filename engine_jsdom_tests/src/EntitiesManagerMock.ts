import { IEntitiesManager, IEntity } from 'engine_api'
import { EntityMock } from './EntityMock'

export class EntitiesManagerMock implements IEntitiesManager {
  getEntityCount(): number {
    return 0
  }
  addEntity(name: string, entity: IEntity): void {}
  getEntity(name: string): IEntity {
    return new EntityMock()
  }
  removeEntity(name: string): void {}
  removeAllEntities(): void {}
  updateEntities(dt: number): void {}
  renderEntities(dt: number): void {}
}
