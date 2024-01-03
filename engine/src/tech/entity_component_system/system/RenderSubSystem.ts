import { IEntity, IEventSystem, IRendererV2 } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import IRenderSubSystem from './IRenderSubSystem'
import RenderComponent from '../../component/RenderComponent'
import { SpriteAnimator } from '../../sprite/SpriteAnimator'

export default class RenderSubSystem implements IRenderSubSystem {
  constructor(
    private readonly _renderer: IRendererV2,
    private readonly _spriteAnimator: SpriteAnimator,
    private readonly _eventSystem: IEventSystem,
    entity: IEntity
  ) {
    this._eventSystem.subscribe(
      'animation',
      (data: { id: string; animId: number }) => {
        if (data.id === entity.getComponentByType(ObjectComponent).id)
          this._spriteAnimator.switchAnimation(data.animId)
      }
    )
  }

  renderLogic(deltaTime: number, entity: IEntity) {
    const objectComponent = entity.getComponentByType(ObjectComponent)
    const renderComponent = entity.getComponentByType(RenderComponent)

    if (renderComponent.spriteAnimation.length > 0) {
      this._spriteAnimator.update(deltaTime)
      this._spriteAnimator.draw(
        this._renderer.ctx,
        objectComponent.position.x + objectComponent.spriteOffset.x,
        objectComponent.position.y + objectComponent.spriteOffset.y,
        objectComponent.isFlipped
      )
    }
    if (renderComponent.renderObject) this._renderer.drawObject(objectComponent)
  }
}
