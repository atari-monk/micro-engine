import { IEntity, IEntityManager } from 'engine_api'

export default class EntityManager implements IEntityManager {
  private _list: Record<string, IEntity> = {}

  addEntity(name: string, entity: IEntity): void {
    this._list[name] = entity
  }

  removeEntity(name: string): void {
    delete this._list[name]
  }

  removeAllEntities(): void {
    this._list = {}
  }

  getAll(): Map<string, IEntity> {
    throw new Error('Method not implemented.')
  }

  getAllAsRecord(): Record<string, IEntity> {
    return this._list
  }

  getEntityCount(): number {
    return Object.keys(this._list).length
  }

  getEntity(name: string, defaultValue?: IEntity): IEntity {
    const entity = this._list[name]
    return entity !== undefined ? entity : defaultValue || ({} as IEntity)
  }

  updateEntities(dt: number): void {
    Object.values(this._list).forEach((entity: IEntity) => {
      entity.update(dt)
    })
  }

  renderEntities(dt: number): void {
    Object.values(this._list).forEach((entity: IEntity) => {
      entity.render(dt)
    })
  }
}
