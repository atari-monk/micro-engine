import { IObject } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export const createZeroObj = (): IObject => {
  return {
    id: '',
    color: 'black',
    position: new Vector2(0, 0),
    size: new Vector2(0, 0),
    speed: new Vector2(0, 0),
  } as IObject
}
