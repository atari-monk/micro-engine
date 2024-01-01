import { IVector2 } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import Component from '../../entity_component/Component'
import ITransformData from './ITransformData'

export default class TransformComponent extends Component {
  private _position: IVector2 = Vector2.zero
  private _size: IVector2 = Vector2.one
  private _rotation: number = 0

  constructor(transformData: ITransformData = {}) {
    super('UnityTransformComponent')
    this._position = transformData.position || this._position
    this._size = transformData.size || this._size
    this._rotation =
      transformData.rotation !== undefined
        ? transformData.rotation
        : this._rotation
  }

  get position(): IVector2 {
    return this._position
  }

  set position(value: IVector2) {
    this._position = value
  }

  get size(): IVector2 {
    return this._size
  }

  set size(value: IVector2) {
    this._size = value
  }

  get rotation(): number {
    return this._rotation
  }

  set rotation(value: number) {
    this._rotation = value
  }
}
