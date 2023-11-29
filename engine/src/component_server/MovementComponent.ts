import { Direction, IComponent, IObject, InputDto } from 'engine_api'

export default class MovementComponent implements IComponent {
  private _inputDto: InputDto = new InputDto()
  private readonly _keyActions: { [key in Direction]: (dt: number) => void }

  set inputDto(inputDto: InputDto) {
    this._inputDto = inputDto
  }

  constructor(private _object: IObject) {
    this._keyActions = {
      [Direction.Up]: (dt) => {
        this._object.position.y -= this._object.speed.y * dt
      },
      [Direction.Down]: (dt) => {
        this._object.position.y += this._object.speed.y * dt
      },
      [Direction.Left]: (dt) => {
        this._object.position.x -= this._object.speed.x * dt
      },
      [Direction.Right]: (dt) => {
        this._object.position.x += this._object.speed.x * dt
      },
    }
  }

  update(dt: number) {
    if (!this._inputDto.direction) return
    for (const direction of this._inputDto.direction) {
      if (!this._keyActions[direction]) continue
      this._keyActions[direction](dt)
    }
  }

  render(dt: number) {}
}
