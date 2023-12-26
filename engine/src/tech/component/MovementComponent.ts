import { IInputManager, IObject } from 'engine_api'
import Component from '../entity_component/Component'

export default class MovementComponent extends Component {
  private readonly _keyActions: { [key: string]: () => void }

  constructor(object: IObject, input: IInputManager) {
    super('MovementComponent')
    this._keyActions = {
      ArrowLeft: () => {
        object.velocity.x = -object.moveStep.x
        object.position.x += object.velocity.x
      },
      ArrowRight: () => {
        object.velocity.x = object.moveStep.x
        object.position.x += object.velocity.x
      },
      ArrowUp: () => {
        object.velocity.y = -object.moveStep.y
        object.position.y += object.velocity.y
      },
      ArrowDown: () => {
        object.velocity.y = object.moveStep.y
        object.position.y += object.velocity.y
      },
    }

    input.subscribeInputEvent('KeyDown', (key) => {
      const action = this._keyActions[key]
      if (action) {
        action()
      }
    })
  }

  update(dt: number) {}

  render(dt: number) {}
}
