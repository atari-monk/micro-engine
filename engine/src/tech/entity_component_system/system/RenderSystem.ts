import { IEntity, IEntityManager } from 'engine_api'
import RenderSystemBase from './render/RenderSystemBase'
import IRenderSubSystem from './IRenderSubSystem'

export default class RenderSystem extends RenderSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _renderSubSystem: IRenderSubSystem
  ) {
    super(entityManager)
  }

  renderLogic(deltaTime: number, entity: IEntity) {
    this._renderSubSystem.renderLogic(deltaTime, entity)
  }
}
