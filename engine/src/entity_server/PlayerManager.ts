import EntitiesManager from '../entity_component/EntitiesManager'
import ObjectComponent from '../component/ObjectComponent'
import MovementComponent from '../component_server/MovementComponent'
import { InputDto } from 'engine_api'

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
      console.log('Assigned input to player on server')
      break
    }

    if (!found) {
      console.log('Fail to set setPlayerInput')
    }
  }
}
