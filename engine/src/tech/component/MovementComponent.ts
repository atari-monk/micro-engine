import { IInputManager, IObject } from 'engine_api'
import Component from '../entity_component/Component'

export default class MovementComponent extends Component {
  private readonly _keyActions: { [key: string]: () => void }

  constructor(
    private readonly _object: IObject,
    input: IInputManager,
    useArrowKeys: boolean = true
  ) {
    super('MovementComponent')

    this._keyActions = {
      ...(useArrowKeys
        ? {
            ArrowLeft: () => this.move(-_object.moveStep.x, 0),
            ArrowRight: () => this.move(_object.moveStep.x, 0),
            ArrowUp: () => this.move(0, -_object.moveStep.y),
            ArrowDown: () => this.move(0, _object.moveStep.y),
          }
        : {
            a: () => this.move(-_object.moveStep.x, 0),
            d: () => this.move(_object.moveStep.x, 0),
            w: () => this.move(0, -_object.moveStep.y),
            s: () => this.move(0, _object.moveStep.y),
          }),
    }

    input.subscribeInputEvent('KeyDown', (key) => {
      const action = this._keyActions[key]
      if (action) {
        action()
      }
    })
  }

  update(dt: number): void {}

  render(dt: number): void {}

  private move(deltaX: number, deltaY: number): void {
    this._object.velocity.x = deltaX
    this._object.velocity.y = deltaY
    this._object.position.x += this._object.velocity.x
    this._object.position.y += this._object.velocity.y
  }
}
