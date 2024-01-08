import { InputDto } from 'engine_api'
import Component from '../entity_component/Component'

export default class ServerMovementComponent extends Component {
  private _inputDto: InputDto = new InputDto()

  set inputDto(inputDto: InputDto) {
    this._inputDto = inputDto
  }

  get inputDto() {
    return this._inputDto
  }

  constructor() {
    super('ServerMovementComponent')
  }
}
