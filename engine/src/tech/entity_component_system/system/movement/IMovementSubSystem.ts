import { IEntity } from 'engine_api'

export default interface IMovementSubSystem {
  subscribeInput(entity: IEntity): void
  unsubscribeInput(): void
}
