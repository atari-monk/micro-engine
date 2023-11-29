import { IComponent, IInputManager, ILogger, IObject } from 'engine_api'

export default class MovementComponent implements IComponent {
  private readonly _keyActions: { [key: string]: () => void }

  constructor(object: IObject, input: IInputManager, logger: ILogger) {
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
