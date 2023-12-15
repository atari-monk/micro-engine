import { IAnimationConfig, IObject, IRendererV2, ISprite } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import SpriteDataManager from '../manager/SpriteDataManager'
import { ballAnimations } from './ballSprite'

export class SpriteData extends SpriteDataManager {
  constructor(private readonly _renderer: IRendererV2) {
    super()
    this.createData()
  }

  private createData() {
    const center = this._renderer.getCenter()

    this.add('object', {
      object: {
        id: '',
        name: '',
        color: 'green',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(150, 50),
        speed: new Vector2(),
      } as IObject,
      animations: {} as IAnimationConfig[],
    })

    this.add('player1', {
      object: {
        id: '',
        name: '',
        color: 'red',
        position: new Vector2(center.x, center.y + 150),
        size: new Vector2(50, 150),
        speed: new Vector2(100, 100),
      } as IObject,
      animations: {} as IAnimationConfig[],
    })

    this.add('player2', {
      object: {
        id: '',
        name: '',
        color: 'blue',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(50, 150),
        speed: new Vector2(100, 100),
      } as IObject,
      animations: {} as IAnimationConfig[],
    })

    this.add('object2', {
      object: {
        id: '',
        name: '',
        color: 'green',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(150, 50),
        speed: new Vector2(),
      } as IObject,
      animations: ballAnimations,
    } as ISprite)
  }
}
