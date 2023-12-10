import { IObject, IRendererV2 } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import ObjectDataManagerOnRecord from '../ObjectDataManager'

export default class SimpleGraphicData extends ObjectDataManagerOnRecord {
  constructor(private readonly _renderer: IRendererV2) {
    super()
    this.createData()
  }

  private createData() {
    const center = this._renderer.getCenter()

    this.add('object', {
      id: '',
      name: '',
      color: 'green',
      position: new Vector2(center.x + 150, center.y + 150),
      size: new Vector2(150, 50),
      speed: new Vector2(),
    } as IObject)

    this.add('player1', {
      id: '',
      name: '',
      color: 'red',
      position: new Vector2(center.x, center.y + 150),
      size: new Vector2(50, 150),
      speed: new Vector2(100, 100),
    } as IObject)

    this.add('player2', {
      id: '',
      name: '',
      color: 'blue',
      position: new Vector2(center.x + 150, center.y + 150),
      size: new Vector2(50, 150),
      speed: new Vector2(100, 100),
    } as IObject)
  }
}
