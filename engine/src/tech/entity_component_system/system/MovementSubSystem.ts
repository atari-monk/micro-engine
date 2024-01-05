import { IEventSystem, IInputManager } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import ObjectComponent from '../../component/ObjectComponent'
import MoveState from '../../state_machine/MoveState'
import { EventNames } from '../../event_system/EventNames'
import IdleState from '../../state_machine/IdleState'

type KeyAction = () => void
const ArrowKeyNames = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
} as const
const WSADKeyNames = {
  a: 'a',
  d: 'd',
  w: 'w',
  s: 's',
} as const
const KeyEvents = {
  KeyDown: 'KeyDown',
  KeyUp: 'KeyUp',
} as const

export default class MovementSubSystem {
  private readonly _keyAction: { [key: string]: KeyAction }
  private readonly _cumulativeDirection: Vector2 = new Vector2()
  private _pressedKey: Set<string> = new Set()

  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem,
    useArrowKeys: boolean = true
  ) {
    this._keyAction = useArrowKeys
      ? this.initArrowKeyAction()
      : this.initWSADKeyAction()
  }

  private initArrowKeyAction(): { [key: string]: KeyAction } {
    const keyActions: { [key: string]: KeyAction } = {}

    keyActions[ArrowKeyNames.ArrowLeft] = () => this.updateDirection(-1, 0)
    keyActions[ArrowKeyNames.ArrowRight] = () => this.updateDirection(1, 0)
    keyActions[ArrowKeyNames.ArrowUp] = () => this.updateDirection(0, -1)
    keyActions[ArrowKeyNames.ArrowDown] = () => this.updateDirection(0, 1)

    return keyActions
  }

  private initWSADKeyAction(): { [key: string]: KeyAction } {
    const keyActions: { [key: string]: KeyAction } = {}

    keyActions[WSADKeyNames.a] = () => this.updateDirection(-1, 0)
    keyActions[WSADKeyNames.d] = () => this.updateDirection(1, 0)
    keyActions[WSADKeyNames.w] = () => this.updateDirection(0, -1)
    keyActions[WSADKeyNames.s] = () => this.updateDirection(0, 1)

    return keyActions
  }

  private updateDirection(x: number, y: number): void {
    this._cumulativeDirection.x += x
    this._cumulativeDirection.y += y
  }

  subscribeInput(objectComponent: ObjectComponent) {
    this._input.subscribeInputEvent(KeyEvents.KeyDown, (key) => {
      if (!this._keyAction.hasOwnProperty(key)) return
      this._pressedKey.add(key)
      this.handleKeys(objectComponent)
    })

    this._input.subscribeInputEvent(KeyEvents.KeyUp, (key) => {
      if (!this._keyAction.hasOwnProperty(key)) return
      this._pressedKey.delete(key)
      this.handleKeys(objectComponent)
    })
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
      const action = this._keyAction[key]
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
