import { IEntitiesManager, IEntity } from 'engine_api'

export default class EntitiesManager implements IEntitiesManager {
  private _entities: Record<string, IEntity> = {}

  addEntity(name: string, entity: IEntity): void {
    this._entities[name] = entity
  }

  removeEntity(name: string): void {
    delete this._entities[name]
  }

  updateEntities(dt: number): void {
    Object.values(this._entities).forEach((entity: IEntity) => {
      entity.update(dt)
    })
  }

  renderEntities(dt: number): void {
    Object.values(this._entities).forEach((entity: IEntity) => {
      entity.render(dt)
    })
  }
}
