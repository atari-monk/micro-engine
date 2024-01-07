import { IEventSystem, IInputManager } from 'engine_api'
import Vector2 from '../../../../math/vector/Vector2'
import ObjectComponent from '../../../component/ObjectComponent'
import MoveState from '../../../state_machine/MoveState'
import { EventNames } from '../../../event_system/EventNames'
import IdleState from '../../../state_machine/IdleState'
import IMovementSubSystem from './IMovementSubSystem'
import MovementComponent from '../../../component/MovementComponent'
import { KeyActionMap, KeyEvents } from './movementTypes'

export default class MovementSubSystem implements IMovementSubSystem {
  private _keyActions!: KeyActionMap
  private readonly _arrowKeyActions: KeyActionMap
  private readonly _wsadKeyActions: KeyActionMap
  private readonly _cumulativeDirection: Vector2 = new Vector2()
  private _pressedKey: Set<string> = new Set()
  private _keyDownCallback!: (key: string) => void
  private _keyUpCallback!: (key: string) => void

  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {
    this._arrowKeyActions = this.initArrowKeyAction()
    this._wsadKeyActions = this.initWSADKeyAction()
  }

  private initArrowKeyAction() {
    return {
      ArrowLeft: () => this.updateDirection(-1, 0),
      ArrowRight: () => this.updateDirection(1, 0),
      ArrowUp: () => this.updateDirection(0, -1),
      ArrowDown: () => this.updateDirection(0, 1),
    } as KeyActionMap
  }

  private initWSADKeyAction() {
    return {
      a: () => this.updateDirection(-1, 0),
      d: () => this.updateDirection(1, 0),
      w: () => this.updateDirection(0, -1),
      s: () => this.updateDirection(0, 1),
    } as KeyActionMap
  }

  private updateDirection(x: number, y: number): void {
    this._cumulativeDirection.x += x
    this._cumulativeDirection.y += y
  }

  subscribeInput(
    objectComponent: ObjectComponent,
    movementComponent: MovementComponent
  ) {
    this._keyActions = movementComponent.useArrowKeys
      ? this._arrowKeyActions
      : this._wsadKeyActions

    this._keyDownCallback = (key: string) => {
      if (!this._keyActions.hasOwnProperty(key)) return
      this._pressedKey.add(key)
      this.handleKeys(objectComponent)
    }

    this._keyUpCallback = (key: string) => {
      if (!this._keyActions.hasOwnProperty(key)) return
      this._pressedKey.delete(key)
      this.handleKeys(objectComponent)
    }

    this._input.subscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.subscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }

  unsubscribeInput() {
    this._input.unsubscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.unsubscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }

  private handleKeys(objectComponent: ObjectComponent): void {
    if (this._pressedKey.size === 0) {
      objectComponent.velocity.x = 0
      objectComponent.velocity.y = 0
      this.sendIdleState(objectComponent)
      return
    }

    this.resetCumulativeDirection()

    this._pressedKey.forEach((key) => {
      const action = this._keyActions[key]
      if (action) {
        action()
      }
    })

    const direction = this._cumulativeDirection.clone().normalize()

    const scaledDirection = new Vector2(
      direction.x * objectComponent.moveStep.x,
      direction.y * objectComponent.moveStep.x
    )

    objectComponent.velocity.setValues(scaledDirection)
    this.sendMoveEvent(objectComponent)
  }

  private resetCumulativeDirection() {
    this._cumulativeDirection.x = 0
    this._cumulativeDirection.y = 0
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
}
