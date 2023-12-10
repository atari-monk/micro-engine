import { IEntity, IEntityManager, ILogger } from 'engine_api'

export default class MapEntityManager implements IEntityManager {
  protected _list: Map<string, IEntity> = new Map()

  constructor(protected readonly _logger: ILogger) {}

  addEntity(name: string, entity: IEntity): void {
    this._list.set(name, entity)
  }

  removeEntity(name: string): void {
    this._list.delete(name)
  }

  removeAllEntities(): void {
    this._list.clear()
  }

  getEntityCount(): number {
    return this._list.size
  }

  getEntity(name: string): IEntity {
    const entity = this._list.get(name)

    if (!entity) {
      const message = `Entity name: '${name}' not found!`
      this._logger.error(message)
      throw new Error(message)
    }

    return entity
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
