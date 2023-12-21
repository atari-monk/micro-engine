import { Direction, IObject, InputDto } from 'engine_api'
import Component from '../entity_component/Component'

export default class ServerMovementComponent extends Component {
  private _inputDto: InputDto = new InputDto()
  private readonly _keyActions: { [key in Direction]: (dt: number) => void }

  set inputDto(inputDto: InputDto) {
    this._inputDto = inputDto
  }

  constructor(private _object: IObject) {
    super('ServerMovementComponent')
    this._keyActions = {
      [Direction.Up]: (dt) => {
        this._object.position.y -= Math.round(this._object.speed.y * dt)
      },
      [Direction.Down]: (dt) => {
        this._object.position.y += Math.round(this._object.speed.y * dt)
      },
      [Direction.Left]: (dt) => {
        this._object.position.x -= Math.round(this._object.speed.x * dt)
      },
      [Direction.Right]: (dt) => {
        this._object.position.x += Math.round(this._object.speed.x * dt)
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
