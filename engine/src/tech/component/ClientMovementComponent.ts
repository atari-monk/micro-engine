import { InputDto } from 'engine_api'
import Component from '../entity_component/Component'

export default class ClientMovementComponent extends Component {
  private readonly _inputDto: InputDto = new InputDto()

  get inputDto(): InputDto {
    return this._inputDto
  }

  constructor() {
    super('ClientMovementComponent')
  }
}
