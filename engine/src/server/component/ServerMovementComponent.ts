import {
  Direction,
  IComponent,
  IInputManager,
  ILogger,
  IObject,
  InputDto,
} from 'engine_api'

export default class ServerMovementComponent implements IComponent {
  private readonly _keyActions: { [key: string]: () => void }
  private _inputDto: InputDto = new InputDto()

  get inputDto(): InputDto {
    return this._inputDto
  }

  constructor(object: IObject, input: IInputManager, logger: ILogger) {
    this._keyActions = {
      ArrowLeft: () => {
        this._inputDto.direction = Direction.Left
        logger.log('ArrowLeft')
      },
      ArrowRight: () => {
        this._inputDto.direction = Direction.Right
        logger.log('ArrowRight')
      },
      ArrowUp: () => {
        this._inputDto.direction = Direction.Top
        logger.log('ArrowUp')
      },
      ArrowDown: () => {
        this._inputDto.direction = Direction.Bottom
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
