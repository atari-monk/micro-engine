import { IEntitiesManager, IEntity } from 'engine_api'
import { EntityMock } from './EntityMock'

export class EntitiesManagerMock implements IEntitiesManager {
  addEntity(name: string, entity: IEntity): void {}
  getEntity(name: string): IEntity {
    return new EntityMock()
  }
  removeEntity(name: string): void {}
  removeAllEntities(): void {
    throw new Error('Method not implemented.')
  }
  updateEntities(dt: number): void {
    throw new Error('Method not implemented.')
  }
  renderEntities(dt: number): void {
    throw new Error('Method not implemented.')
  }
}
