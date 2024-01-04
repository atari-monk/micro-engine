import { IEntity, IEventSystem, IManager, IRendererV2 } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import IRenderSubSystem from './IRenderSubSystem'
import RenderComponent from '../../component/RenderComponent'
import { SpriteAnimator } from '../../sprite/SpriteAnimator'

export default class RenderSubSystem implements IRenderSubSystem {
  constructor(
    private readonly _renderer: IRendererV2,
    private readonly _spriteAnimatorManager: IManager<SpriteAnimator>,
    private readonly _eventSystem: IEventSystem
  ) {}

  add(entity: IEntity): void {
    const objectComponent = entity.getComponentByType(ObjectComponent)
    const renderComponent = entity.getComponentByType(RenderComponent)

    this._spriteAnimatorManager.add(
      objectComponent.id,
      new SpriteAnimator(renderComponent.spriteAnimation)
    )

    this._eventSystem.subscribe(
      'animation',
      (data: { id: string; animId: number }) => {
        this._spriteAnimatorManager
          .getStrict(data.id)
          .switchAnimation(data.animId)
      }
    )
  }

  renderLogic(deltaTime: number, entity: IEntity) {
    const objectComponent = entity.getComponentByType(ObjectComponent)
    const renderComponent = entity.getComponentByType(RenderComponent)

    if (renderComponent.spriteAnimation.length > 0) {
      const animator = this._spriteAnimatorManager.getStrict(objectComponent.id)
      animator.update(deltaTime)
      animator.draw(
        this._renderer.ctx,
        objectComponent.position.x + objectComponent.spriteOffset.x,
        objectComponent.position.y + objectComponent.spriteOffset.y,
        objectComponent.isFlipped
      )
    }
    if (renderComponent.renderObject) this._renderer.drawObject(objectComponent)
  }
}
