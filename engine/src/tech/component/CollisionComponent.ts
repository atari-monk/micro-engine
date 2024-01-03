import Component from '../entity_component/Component'

export default class CollisionComponent extends Component {
  private _objectIdToCollideWith!: string

  constructor() {
    super('CollisionComponent')
  }

  set objectIdToCollideWith(objectId: string) {
    this._objectIdToCollideWith = objectId
  }

  get objectIdToCollideWith(): string {
    return this._objectIdToCollideWith
  }
}
