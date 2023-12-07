import EntityManager from '../../tech/entity_component/EntityManager'
import ObjectComponent from '../../browser/component/ObjectComponent'
import MovementComponent from '../component/MovementComponent'
import { ClientsDto, ILogger, InputDto } from 'engine_api'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import ObjectDto from '../../multi/dtos/ObjectDto'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'

export default class PlayerManager
  extends EntityManager
  implements IPlayerManager
{
  constructor(protected readonly _logger: ILogger) {
    super(_logger)
  }

  setPlayerInput(inputDto: InputDto) {
    let found = false
    const message = `setPlayerInput: ${inputDto.id} ${inputDto.direction}`
    for (const entity of Object.values(this._list)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      if (object.id !== inputDto.id) {
        continue
      }
      const movement =
        entity.getComponentByType<MovementComponent>(MovementComponent)

      movement.inputDto = inputDto
      found = true
      this._logger.debug(message)
      break
    }
    if (!found) {
      console.error(message)
    }
  }

  getGameFrameDto() {
    const dto = new GameFrameDto()
    for (const entity of Object.values(this._list)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      dto.addPlayer(object.id, new ObjectDto(object))
    }
    return dto
  }

  getClientsDto() {
    const dto = new ClientsDto()
    for (const entity of Object.values(this._list)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      dto.clients.push(object.id)
    }
    return dto
  }
}
