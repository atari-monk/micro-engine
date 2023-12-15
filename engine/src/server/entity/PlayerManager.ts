import { ClientsDto, ILogger, InputDto } from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectComponent from '../../browser/component/ObjectComponent'
import MovementComponent from '../component/MovementComponent'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import ObjectDto from '../../multi/dtos/ObjectDto'
import EntityManager from '../../tech/entity_component/EntityManager'

export default class PlayerManager
  extends EntityManager
  implements IPlayerManager
{
  setPlayerInput(inputDto: InputDto) {
    let found = false
    const message = `setPlayerInput: ${inputDto.id} ${inputDto.direction}`
    for (const entity of this.values()) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      if (object.id !== inputDto.id) {
        continue
      }
      const movement =
        entity.getComponentByType<MovementComponent>(MovementComponent)

      movement.inputDto = inputDto
      found = true
      this.logDebug(message)
      break
    }
    if (!found) {
      console.error(message)
    }
  }

  getGameFrameDto() {
    const dto = new GameFrameDto()
    for (const entity of this.values()) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)
      this.logDebug(`${object.position.x}, ${object.position.y}`)
      dto.addPlayer(object.id, new ObjectDto(object))
    }
    return dto
  }

  getClientsDto() {
    const dto = new ClientsDto()
    for (const entity of this.values()) {
      dto.clients.push(
        entity.getComponentByType<ObjectComponent>(ObjectComponent).id
      )
    }
    return dto
  }
}
