import EntityWithComponents from './EntityWithComponents'

export default class Entity extends EntityWithComponents {
  private _id!: string

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }
}
