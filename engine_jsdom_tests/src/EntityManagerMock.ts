import { IEntityManager, IEntity } from 'engine_api'
import { EntityMock } from './EntityMock'

export class EntityManagerMock implements IEntityManager {
  addEntity(name: string, entity: IEntity): void {}

  getAll(): Map<string, IEntity> {
    throw new Error('Method not implemented.')
  }
  getAllAsRecord(): Record<string, IEntity> {
    throw new Error('Method not implemented.')
  }

  getEntityCount(): number {
    return 0
  }
  getEntity(name: string): IEntity {
    return new EntityMock()
  }

  removeEntity(name: string): void {}
  removeAllEntities(): void {}

  updateEntities(dt: number): void {}
  renderEntities(dt: number): void {}
}
