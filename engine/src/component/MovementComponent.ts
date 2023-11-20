import { IComponent, IInputManager, ILogger, IObject } from 'engine_api'

export default class MovementComponent implements IComponent {
  constructor(object: IObject, input: IInputManager, logger: ILogger) {
    input.subscribeInputEvent('KeyDown', (key) => {
      switch (key) {
        case 'ArrowLeft':
          object.position.x -= 10
          logger.log('ArrowLeft')
          break
        case 'ArrowRight':
          object.position.x += 10
          logger.log('ArrowRight')
          break
        case 'ArrowUp':
          object.position.y -= 10
          logger.log('ArrowUp')
          break
        case 'ArrowDown':
          object.position.y += 10
          logger.log('ArrowDown')
          break
        default:
          // Handle other keys or ignore
          break
      }
    })
  }

  update() {}

  render() {}
}
