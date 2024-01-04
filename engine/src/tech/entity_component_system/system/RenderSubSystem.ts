import { IEntity, IEventSystem, IManager, IRendererV2 } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import IRenderSubSystem from './IRenderSubSystem'
import RenderComponent from '../../component/RenderComponent'
import { SpriteAnimator } from '../../sprite/SpriteAnimator'
import GameStateComponent from '../../component/GameStateComponent'
import Vector2 from '../../../math/vector/Vector2'

export default class RenderSubSystem implements IRenderSubSystem {
  constructor(
    private readonly _renderer: IRendererV2,
    private readonly _spriteAnimatorManager: IManager<SpriteAnimator>,
    private readonly _eventSystem: IEventSystem
  ) {}

  addSprite(entity: IEntity): void {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const renderComponent = entity.getComponentByTypeStrict(RenderComponent)

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
    const gameStateComponent = entity.getComponentByType(GameStateComponent)

    if (objectComponent && renderComponent) {
      if (renderComponent.spriteAnimation.length > 0) {
        const animator = this._spriteAnimatorManager.getStrict(
          objectComponent.id
        )
        animator.update(deltaTime)
        animator.draw(
          this._renderer.ctx,
          objectComponent.position.x + objectComponent.spriteOffset.x,
          objectComponent.position.y + objectComponent.spriteOffset.y,
          objectComponent.isFlipped
        )
      }
      if (renderComponent.renderObject)
        this._renderer.drawObject(objectComponent)
    }

    if (gameStateComponent) {
      this._renderer.drawText(
        gameStateComponent.score.redScore.toString(),
        new Vector2(370 - 20, 20),
        'red',
        '20px Arial'
      )
      this._renderer.drawText(':', new Vector2(370, 20), 'yellow', '20px Arial')
      this._renderer.drawText(
        gameStateComponent.score.blueScore.toString(),
        new Vector2(370 + 15, 20),
        'blue',
        '20px Arial'
      )
    }
  }
}
