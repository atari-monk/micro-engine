import { IObject, IRendererV2 } from 'engine_api'
import { ObjectDataManager, Vector2 } from 'engine'

export default class ObjectDataFactory extends ObjectDataManager {
  constructor(private readonly _renderer: IRendererV2) {
    super()
    this.createData()
  }

  createData() {
    const center = this._renderer.getCenter()

    this.add('object', {
      id: '',
      name: '',
      color: 'yellow',
      position: new Vector2(550, 400),
      size: new Vector2(70, 50),
      speed: new Vector2(10, 10),
    } as IObject)

    this.add('player', {
      id: '',
      name: '',
      color: 'pink',
      position: new Vector2(center.x, center.y + 330),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    } as IObject)
  }
}
