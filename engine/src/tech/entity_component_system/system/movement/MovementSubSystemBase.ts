import { IEventSystem, IInputManager } from 'engine_api'
import MovementComponent from '../../../component/MovementComponent'
import ObjectComponent from '../../../component/ObjectComponent'
import IMovementSubSystem from './IMovementSubSystem'
import { KeyActionMap, KeyEvents } from './movementTypes'
import { EventNames } from '../../../event_system/EventNames'
import IdleState from '../../../state_machine/IdleState'
import MoveState from '../../../state_machine/MoveState'

export default abstract class MovementSubSystemBase
  implements IMovementSubSystem
{
  protected _keyActions!: KeyActionMap
  protected readonly _arrowKeyActions: KeyActionMap
  protected readonly _wsadKeyActions: KeyActionMap
  protected _keyDownCallback!: (key: string) => void
  protected _keyUpCallback!: (key: string) => void

  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {
    this._arrowKeyActions = this.initArrowKeyAction()
    this._wsadKeyActions = this.initWSADKeyAction()
  }

  private initArrowKeyAction() {
    return {
      ArrowLeft: () => this.OnLeft(),
      ArrowRight: () => this.OnRight(),
      ArrowUp: () => this.OnUp(),
      ArrowDown: () => this.OnDown(),
    } as KeyActionMap
  }

  private initWSADKeyAction() {
    return {
      a: () => this.OnLeft(),
      d: () => this.OnRight(),
      w: () => this.OnUp(),
      s: () => this.OnDown(),
    } as KeyActionMap
  }

  protected abstract OnLeft(): void
  protected abstract OnRight(): void
  protected abstract OnUp(): void
  protected abstract OnDown(): void

  subscribeInput(
    objectComponent: ObjectComponent,
    movementComponent: MovementComponent
  ): void {
    this._keyActions = movementComponent.useArrowKeys
      ? this._arrowKeyActions
      : this._wsadKeyActions

    this._keyDownCallback = (key: string) => {
      if (this.isKeyMapped(key)) return
      this.onKeyDown(key)
      this.handleKeys(objectComponent)
    }

    this._keyUpCallback = (key: string) => {
      if (this.isKeyMapped(key)) return
      this.onKeyUp(key)
      this.handleKeys(objectComponent)
    }

    this._input.subscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.subscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }

  private isKeyMapped(key: string) {
    return !this._keyActions.hasOwnProperty(key)
  }

  protected abstract onKeyDown(key: string): void
  protected abstract onKeyUp(key: string): void
  protected handleKeys(objectComponent: ObjectComponent) {}

  unsubscribeInput() {
    this._input.unsubscribeInputEvent(KeyEvents.KeyDown, this._keyDownCallback)
    this._input.unsubscribeInputEvent(KeyEvents.KeyUp, this._keyUpCallback)
  }

  protected sendIdleState(objectComponent: ObjectComponent): void {
    this._eventSystem.publish(EventNames.ChangeState, {
      id: objectComponent.id,
      newState: new IdleState(this._eventSystem),
    })
  }

  protected sendMoveEvent(objectComponent: ObjectComponent) {
    this._eventSystem.publish(EventNames.ChangeState, {
      id: objectComponent.id,
      newState: new MoveState(this._eventSystem),
    })
  }
}
