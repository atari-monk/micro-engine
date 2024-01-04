import { IEntity } from 'engine_api'

export default interface IRenderSubSystem {
  renderLogic(deltaTime: number, entity: IEntity): void
  addSprite(entity: IEntity): void
}
