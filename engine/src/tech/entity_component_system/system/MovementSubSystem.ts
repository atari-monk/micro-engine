import { IEventSystem, IInputManager } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import ObjectComponent from '../../component/ObjectComponent'

type KeyAction = () => void

export default class MovementSubSystem {
  private readonly _keyAction: { [key: string]: KeyAction }
  private readonly _cumulativeDirection: Vector2 = new Vector2()
  private _pressedKey: Set<string> = new Set()

  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem,
    private readonly _id: string,
    useArrowKeys: boolean = true
  ) {
    this._keyAction = useArrowKeys
      ? this.initArrowKeyAction()
      : this.initWSADKeyAction()
  }

  private initArrowKeyAction(): { [key: string]: KeyAction } {
    const keyActions: { [key: string]: KeyAction } = {}

    keyActions['ArrowLeft'] = () => this.updateDirection(-1, 0)
    keyActions['ArrowRight'] = () => this.updateDirection(1, 0)
    keyActions['ArrowUp'] = () => this.updateDirection(0, -1)
    keyActions['ArrowDown'] = () => this.updateDirection(0, 1)

    return keyActions
  }

  private initWSADKeyAction(): { [key: string]: KeyAction } {
    const keyActions: { [key: string]: KeyAction } = {}

    keyActions['a'] = () => this.updateDirection(-1, 0)
    keyActions['d'] = () => this.updateDirection(1, 0)
    keyActions['w'] = () => this.updateDirection(0, -1)
    keyActions['s'] = () => this.updateDirection(0, 1)

    return keyActions
  }

  private updateDirection(x: number, y: number): void {
    this._cumulativeDirection.x += x
    this._cumulativeDirection.y += y
  }

  subscribeInput(objectComponent: ObjectComponent) {
    this._input.subscribeInputEvent('KeyDown', (key) => {
      if (!this._keyAction.hasOwnProperty(key)) return
      this._pressedKey.add(key)
      this.handleKeys(objectComponent)
    })

    this._input.subscribeInputEvent('KeyUp', (key) => {
      if (!this._keyAction.hasOwnProperty(key)) return
      this._pressedKey.delete(key)
      this.handleKeys(objectComponent)
    })
  }

  private handleKeys(objectComponent: ObjectComponent): void {
    this._cumulativeDirection.x = 0
    this._cumulativeDirection.y = 0

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
    this._eventSystem.publish('playerMove', this._id)
  }
}
