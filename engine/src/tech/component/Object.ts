import { IObject } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export const createZeroObj = (): IObject => {
  return {
    id: '',
    name: '',
    color: 'black',
    position: new Vector2(),
    size: new Vector2(),
    speed: new Vector2(),
    mass: 0,
    spriteOffset: new Vector2(),
  } as IObject
}
