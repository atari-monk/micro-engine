import { IInputManager, ILogger, IObject } from 'engine_api'
import Component from '../entity_component/Component'

export default class MovementComponent extends Component {
  private readonly _keyActions: { [key: string]: () => void }

  constructor(object: IObject, input: IInputManager, logger: ILogger) {
    super('MovementComponent')
    this._keyActions = {
      ArrowLeft: () => {
        object.position.x -= object.speed.x
      },
      ArrowRight: () => {
        object.position.x += object.speed.x
      },
      ArrowUp: () => {
        object.position.y -= object.speed.y
      },
      ArrowDown: () => {
        object.position.y += object.speed.y
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
