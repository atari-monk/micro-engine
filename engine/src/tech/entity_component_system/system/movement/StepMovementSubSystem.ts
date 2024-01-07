import { IEventSystem, IInputManager } from 'engine_api'
import MovementComponent from '../../../component/MovementComponent'
import ObjectComponent from '../../../component/ObjectComponent'
import IMovementSubSystem from './IMovementSubSystem'
import { KeyActionMap, KeyEvents } from './movementTypes'
import { EventNames } from '../../../event_system/EventNames'
import IdleState from '../../../state_machine/IdleState'
import MoveState from '../../../state_machine/MoveState'

export default class StepMovementSubSystem implements IMovementSubSystem {
  private _keyActions!: KeyActionMap
  private _arrowKeyActions!: KeyActionMap
  private _wsadKeyActions!: KeyActionMap
  private _objectComponent!: ObjectComponent
  private _keyDownCallback!: (key: string) => void
  private _keyUpCallback!: (key: string) => void

  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {}

  private initArrowKeyAction() {
    const step = this._objectComponent.moveStep
    return {
      ArrowLeft: () => this.move(-step.x, 0),
      ArrowRight: () => this.move(step.x, 0),
      ArrowUp: () => this.move(0, -step.y),
      ArrowDown: () => this.move(0, step.y),
    } as KeyActionMap
  }

  private initWSADKeyAction() {
    const step = this._objectComponent.moveStep
    return {
      a: () => this.move(-step.x, 0),
      d: () => this.move(step.x, 0),
      w: () => this.move(0, -step.y),
      s: () => this.move(0, step.y),
    } as KeyActionMap
  }

  private move(deltaX: number, deltaY: number): void {
    this._objectComponent.velocity.x = deltaX
    this._objectComponent.velocity.y = deltaY
  }

  subscribeInput(
    objectComponent: ObjectComponent,
    movementComponent: MovementComponent
  ): void {
    this._objectComponent = objectComponent

    this._arrowKeyActions = this.initArrowKeyAction()
    this._wsadKeyActions = this.initWSADKeyAction()
    this._keyActions = movementComponent.useArrowKeys
      ? this._arrowKeyActions
      : this._wsadKeyActions

    this._keyDownCallback = (key: string) => {
      if (!this._keyActions.hasOwnProperty(key)) return
      const action = this._keyActions[key]
      if (action) {
        action()
        this.sendMoveEvent(this._objectComponent)
      }
    }

    this._keyUpCallback = (key: string) => {
      if (!this._keyActions.hasOwnProperty(key)) return
      this._objectComponent.velocity.x = 0
      this._objectComponent.velocity.y = 0
      this.sendIdleState(this._objectComponent)
    }

    this._input.subscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.subscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }

  private sendIdleState(objectComponent: ObjectComponent): void {
    this._eventSystem.publish(EventNames.ChangeState, {
      id: objectComponent.id,
      newState: new IdleState(this._eventSystem),
    })
  }

  private sendMoveEvent(objectComponent: ObjectComponent) {
    this._eventSystem.publish(EventNames.ChangeState, {
      id: objectComponent.id,
      newState: new MoveState(this._eventSystem),
    })
  }

  unsubscribeInput(): void {
    this._input.unsubscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.unsubscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }
}
