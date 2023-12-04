import { ClientsDto, ILogger, InputDto } from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectComponent from '../../browser/component/ObjectComponent'
import MovementComponent from '../component/MovementComponent'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import ObjectDto from '../../multi/dtos/ObjectDto'
import EntityManager2 from '../../tech/entity_component/EntityManager2'

export default class PlayerManager2
  extends EntityManager2
  implements IPlayerManager
{
  constructor(protected readonly _logger: ILogger) {
    super(_logger)
  }

  setPlayerInput(inputDto: InputDto) {
    let found = false
    const message = `setPlayerInput: ${inputDto}`
    for (const entity of this._list.values()) {
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
    for (const entity of this._list.values()) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      dto.addPlayer(object.id, new ObjectDto(object))
    }
    return dto
  }

  getClientsDto() {
    const dto = new ClientsDto()
    for (const entity of this._list.values()) {
      dto.clients.push(
        entity.getComponentByType<ObjectComponent>(ObjectComponent).id
      )
    }
    return dto
  }
}
