import { IObject } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export const getObjectZero = (): IObject => {
  return {
    id: '',
    name: '',
    color: 'black',
    position: new Vector2(),
    size: new Vector2(),
    moveStep: new Vector2(),
    velocity: new Vector2(),
    mass: 0,
    spriteOffset: new Vector2(),
    score: 0,
    useArrowKeys: true,
    isFlipped: false,
  } as IObject
}
