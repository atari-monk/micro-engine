import { IAnimationConfig, IObject, IRendererV2 } from 'engine_api'
import { SpriteAnimator } from '../sprite/SpriteAnimator'
import Component from '../entity_component/Component'

export default class SpriteComponent extends Component {
  private sprite: SpriteAnimator

  constructor(
    private readonly _renderer: IRendererV2,
    private readonly _object: IObject,
    animations: IAnimationConfig[]
  ) {
    super('SpriteComponent')
    this.sprite = new SpriteAnimator(animations)
  }

  update(dt: number) {
    this.sprite.update(dt)
  }

  render(dt: number) {
    this.sprite.draw(
      this._renderer.ctx,
      this._object.position.x + this._object.spriteOffset.x,
      this._object.position.y + this._object.spriteOffset.y
    )
  }

  switchAnimation(animationIndex: number) {
    this.sprite.switchAnimation(animationIndex)
  }
}
