import { IAnimationConfig, IComponent, IObject, IRendererV2 } from 'engine_api'
import { SpriteAnimator } from '../../tech/sprite/SpriteAnimator'

export default class SpriteComponent implements IComponent {
  private sprite: SpriteAnimator

  constructor(
    private readonly _renderer: IRendererV2,
    private readonly _object: IObject,
    animations: IAnimationConfig[]
  ) {
    this.sprite = new SpriteAnimator(animations)
  }

  update(dt: number) {
    this.sprite.update(dt)
  }

  render(dt: number) {
    this.sprite.draw(
      this._renderer.ctx,
      this._object.position.x - 34,
      this._object.position.y - 18
    )
  }

  switchAnimation(animationIndex: number) {
    this.sprite.switchAnimation(animationIndex)
  }
}
