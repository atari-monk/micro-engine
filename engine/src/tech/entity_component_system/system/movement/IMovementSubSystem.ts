import MovementComponent from '../../../component/MovementComponent'
import ObjectComponent from '../../../component/ObjectComponent'

export default interface IMovementSubSystem {
  subscribeInput(
    objectComponent: ObjectComponent,
    movementComponent: MovementComponent
  ): void
  unsubscribeInput(): void
}
