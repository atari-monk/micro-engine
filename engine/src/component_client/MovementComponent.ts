import {
  Direction,
  IComponent,
  IInputManager,
  ILogger,
  IObject,
  InputDto,
} from 'engine_api'

export default class MovementComponent implements IComponent {
  private readonly _keyActions: { [key: string]: () => void }
  private _inputDto: InputDto = new InputDto()
  private _keyToDirectionMap: { [key: string]: Direction } = {
    ArrowLeft: Direction.Left,
    ArrowRight: Direction.Right,
    ArrowUp: Direction.Up,
    ArrowDown: Direction.Down,
  }

  get inputDto(): InputDto {
    return this._inputDto
  }

  constructor(object: IObject, input: IInputManager, logger: ILogger) {
    this._keyActions = {
      ArrowLeft: () => {
        this._inputDto.addDirection(Direction.Left)
      },
      ArrowRight: () => {
        this._inputDto.addDirection(Direction.Right)
      },
      ArrowUp: () => {
        this._inputDto.addDirection(Direction.Up)
      },
      ArrowDown: () => {
        this._inputDto.addDirection(Direction.Down)
      },
    }

    input.subscribeInputEvent('KeyDown', (key) => {
      const action = this._keyActions[key]
      if (action) {
        action()
      }
    })

    input.subscribeInputEvent('KeyUp', (key) => {
      const releasedDirection = this.getDirectionForKey(key)
      if (releasedDirection) {
        this._inputDto.removeDirection(releasedDirection)
      }
    })
  }

  private getDirectionForKey(key: string): Direction | undefined {
    return this._keyToDirectionMap[key]
  }

  update(dt: number) {}

  render(dt: number) {}
}
