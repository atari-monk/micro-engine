import { IEntity, IEntityManager, ILogger } from 'engine_api'

export default class EntityManager implements IEntityManager {
  protected _list: Record<string, IEntity> = {}

  constructor(protected readonly _logger: ILogger) {}

  addEntity(name: string, entity: IEntity): void {
    this._list[name] = entity
  }

  removeEntity(name: string): void {
    delete this._list[name]
  }

  removeAllEntities(): void {
    this._list = {}
  }

  getEntityCount(): number {
    return Object.keys(this._list).length
  }

  getEntity(name: string): IEntity {
    const entity = this._list[name]

    if (!entity) {
      const message = `Entity name: '${name}' not found!`
      this._logger.error(message)
      throw new Error(message)
    }

    return entity
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
