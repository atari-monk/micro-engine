import { ClientsDto, InputDto } from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'
import ObjectComponent from '../tech/component/ObjectComponent'
import ServerMovementComponent from '../tech/component/ServerMovementComponent'
import GameFrameDto from '../dto/GameFrameDto'
import ObjectDto from '../dto/ObjectDto'
import EntityManager from '../tech/entity_component/EntityManager'

export default class PlayerManager
  extends EntityManager
  implements IPlayerManager
{
  setPlayerInput(inputDto: InputDto) {
    let found = false
    const message = `setPlayerInput: ${inputDto.id} ${inputDto.direction}`
    for (const entity of this.values()) {
      const object =
        entity.getComponentByTypeStrict<ObjectComponent>(ObjectComponent)
      if (object.id !== inputDto.id) {
        continue
      }
      const movement = entity.getComponentByTypeStrict<ServerMovementComponent>(
        ServerMovementComponent
      )

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
      const object =
        entity.getComponentByTypeStrict<ObjectComponent>(ObjectComponent)
      this.logDebug(`${object.position.x}, ${object.position.y}`)
      dto.addPlayer(object.id, new ObjectDto(object))
    }
    return dto
  }

  getClientsDto() {
    const dto = new ClientsDto()
    for (const entity of this.values()) {
      dto.clients.push(
        entity.getComponentByTypeStrict<ObjectComponent>(ObjectComponent).id
      )
    }
    return dto
  }
}
