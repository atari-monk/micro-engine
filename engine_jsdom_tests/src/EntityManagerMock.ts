import { IEntityManager, IEntity } from 'engine_api'

export class EntityManagerMock implements IEntityManager {
  get count(): number {
    throw new Error('Method not implemented.')
  }

  add(name: string, object: IEntity): void {
    throw new Error('Method not implemented.')
  }

  remove(name: string): void {
    throw new Error('Method not implemented.')
  }

  removeAll(): void {
    throw new Error('Method not implemented.')
  }

  get(name: string): IEntity | undefined {
    throw new Error('Method not implemented.')
  }

  getStrict(name: string): IEntity {
    throw new Error('Method not implemented.')
  }

  getWithStatus(name: string): {
    found: boolean
    object?: IEntity | undefined
  } {
    throw new Error('Method not implemented.')
  }

  forEach(callback: (name: string, object: IEntity) => void): void {
    throw new Error('Method not implemented.')
  }

  updateEntities(dt: number): void {}
  renderEntities(dt: number): void {}
}
