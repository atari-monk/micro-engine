import { IObject, IRendererV2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import ObjectDataManager from './ObjectDataManager'

export default class ObjectDataFactory extends ObjectDataManager {
  constructor(private readonly _renderer: IRendererV2) {
    super()
    this.createData()
  }

  private createData() {
    const center = this._renderer.getCenter()

    this.addObjectData('object', {
      id: '',
      color: 'green',
      position: new Vector2(center.x + 150, center.y + 150),
      size: new Vector2(150, 50),
      speed: new Vector2(10, 10),
    } as IObject)

    this.addObjectData('player1', {
      id: '',
      color: 'red',
      position: new Vector2(center.x, center.y + 150),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    } as IObject)

    this.addObjectData('player2', {
      id: '',
      color: 'blue',
      position: new Vector2(center.x + 150, center.y + 150),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    } as IObject)
  }
}
