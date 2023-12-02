import EntitiesManager from '../../tech/entity_component/EntitiesManager'
import ObjectComponent from '../../browser/component/ObjectComponent'
import MovementComponent from '../component/MovementComponent'
import { ClientsDto, InputDto } from 'engine_api'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import ObjectDto from '../../multi/dtos/ObjectDto'

export default class PlayerManager extends EntitiesManager {
  setPlayerInput(inputDto: InputDto) {
    const players = this.getAllEntities()
    let found = false

    for (const entity of Object.values(players)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)

      if (!object || object.id !== inputDto.id) {
        continue
      }

      const movement =
        entity.getComponentByType<MovementComponent>(MovementComponent)

      if (!movement) {
        break
      }

      movement.inputDto = inputDto
      found = true
      //console.log('input :', inputDto.id)
      break
    }

    if (!found) {
      console.log('Fail to set setPlayerInput')
    }
  }

  getGameFrameDto() {
    const frame = new GameFrameDto()
    const players = this.getAllEntities()
    for (const entity of Object.values(players)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)

      if (!object) {
        continue
      }

      frame.addPlayer(object.id, new ObjectDto(object))
    }
    return frame
  }

  getClientsDto() {
    const dto = new ClientsDto()
    const players = this.getAllEntities()
    for (const entity of Object.values(players)) {
      const object = entity.getComponentByType<ObjectComponent>(ObjectComponent)

      if (!object) {
        continue
      }

      dto.clients.push(object.id)
    }
    return dto
  }
}
