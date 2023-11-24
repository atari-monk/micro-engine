import { IComponent, IInputManager, ILogger, IObject } from 'engine_api'

export default class MovementComponent implements IComponent {
  private readonly _keyActions: { [key: string]: () => void }

  constructor(object: IObject, input: IInputManager, logger: ILogger) {
    this._keyActions = {
      ArrowLeft: () => {
        object.position.x -= object.speed.x
        logger.log('ArrowLeft')
      },
      ArrowRight: () => {
        object.position.x += object.speed.x
        logger.log('ArrowRight')
      },
      ArrowUp: () => {
        object.position.y -= object.speed.y
        logger.log('ArrowUp')
      },
      ArrowDown: () => {
        object.position.y += object.speed.y
        logger.log('ArrowDown')
      },
      // Add more key actions as needed
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
