import { IEntity } from 'engine_api'

export default interface IRenderSubSystem {
  renderLogic(deltaTime: number, entity: IEntity): void
  add(entity: IEntity): void
}
