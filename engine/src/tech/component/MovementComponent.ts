import { IEventSystem, IInputManager, IObject } from 'engine_api'
import Component from '../entity_component/Component'
import Vector2 from '../../math/vector/Vector2'

type KeyAction = () => void

export default class MovementComponent extends Component {
  private readonly _keyActions: { [key: string]: KeyAction }
  private readonly _cumulativeDirection: Vector2
  private _pressedKeys: Set<string> = new Set()

  constructor(
    private readonly _object: IObject,
    private readonly _eventSystem: IEventSystem,
    private readonly _input: IInputManager,
    private readonly _useArrowKeys: boolean = true
  ) {
    super('MovementComponent')

    this._cumulativeDirection = new Vector2()
    this._keyActions = this.initializeKeyActions()

    this._input.subscribeInputEvent('KeyDown', (key) => {
      this._pressedKeys.add(key)
      this.handleKeys()
    })

    this._input.subscribeInputEvent('KeyUp', (key) => {
      this._pressedKeys.delete(key)
      this.handleKeys()
    })
  }

  private initializeKeyActions(): { [key: string]: KeyAction } {
    const keyActions: { [key: string]: KeyAction } = {}

    if (this._useArrowKeys) {
      keyActions['ArrowLeft'] = () => this.updateDirection(-1, 0)
      keyActions['ArrowRight'] = () => this.updateDirection(1, 0)
      keyActions['ArrowUp'] = () => this.updateDirection(0, -1)
      keyActions['ArrowDown'] = () => this.updateDirection(0, 1)
    } else {
      keyActions['a'] = () => this.updateDirection(-1, 0)
      keyActions['d'] = () => this.updateDirection(1, 0)
      keyActions['w'] = () => this.updateDirection(0, -1)
      keyActions['s'] = () => this.updateDirection(0, 1)
    }

    return keyActions
  }

  private updateDirection(x: number, y: number): void {
    this._cumulativeDirection.x += x
    this._cumulativeDirection.y += y
  }

  private handleKeys(): void {
    //console.log('Before handling keys:', this._cumulativeDirection)

    this._cumulativeDirection.x = 0
    this._cumulativeDirection.y = 0

    this._pressedKeys.forEach((key) => {
      const action = this._keyActions[key]
      if (action) {
        action()
      }
    })

    const direction = this._cumulativeDirection.clone().normalize()

    const scaledDirection = new Vector2(
      direction.x * this._object.moveStep.x,
      direction.y * this._object.moveStep.y
    )

    this._object.velocity.setValues(scaledDirection)
    this._eventSystem.publish('playerMove', this._object.id)
  }
}
