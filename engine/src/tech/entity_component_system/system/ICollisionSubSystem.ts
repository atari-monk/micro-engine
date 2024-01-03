import { IEntity } from 'engine_api'

export default interface ICollisionSubSystem {
  updateLogic(deltaTime: number, entity: IEntity): void
}
