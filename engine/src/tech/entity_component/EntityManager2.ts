import { IEntity, IEntityManager } from 'engine_api'

export default class EntityManager2 implements IEntityManager {
  private _list: Map<string, IEntity> = new Map()

  addEntity(name: string, entity: IEntity): void {
    this._list.set(name, entity)
  }

  removeEntity(name: string): void {
    this._list.delete(name)
  }

  removeAllEntities(): void {
    this._list.clear()
  }

  getAll(): Map<string, IEntity> {
    return this._list
  }

  getAllAsRecord(): Record<string, IEntity> {
    throw new Error('Method not implemented.')
  }

  getEntityCount(): number {
    return this._list.size
  }

  getEntity(name: string, defaultValue?: IEntity): IEntity {
    const entity = this._list.get(name)
    return entity !== undefined ? entity : defaultValue || ({} as IEntity)
  }

  updateEntities(dt: number): void {
    for (const entity of this._list.values()) {
      entity.update(dt)
    }
  }

  renderEntities(dt: number): void {
    for (const entity of this._list.values()) {
      entity.render(dt)
    }
  }
}
