import { IAnimationConfig, IImmutableVector2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import EntityDataManager from '../entity/EntityDataManager'
import { ballAnimations } from './ballSprite'

export class EntityData extends EntityDataManager {
  constructor(private readonly _center: IImmutableVector2) {
    super()
    this.createData()
  }

  private createData() {
    const center = this._center

    this.add('object1', {
      object: {
        id: '',
        name: '',
        color: 'green',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(150, 50),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
        score: 0,
        useArrowKeys: true,
        isFlipped: true,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('object2', {
      object: {
        id: '',
        name: '',
        color: 'yellow',
        position: new Vector2(center.x + 150, center.y - 150),
        size: new Vector2(150, 50),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
        score: 0,
        useArrowKeys: true,
        isFlipped: true,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('player1', {
      object: {
        id: '',
        name: '',
        color: 'red',
        position: new Vector2(center.x, center.y + 150),
        size: new Vector2(50, 150),
        moveStep: new Vector2(100, 100),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
        score: 0,
        useArrowKeys: true,
        isFlipped: true,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('player2', {
      object: {
        id: '',
        name: '',
        color: 'blue',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(50, 150),
        moveStep: new Vector2(100, 100),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
        score: 0,
        useArrowKeys: true,
        isFlipped: true,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('object3', {
      object: {
        id: '',
        name: '',
        color: 'green',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(150, 50),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
        score: 0,
        useArrowKeys: true,
        isFlipped: true,
      },
      animations: ballAnimations,
    })
  }
}
