import MapManager from '../../../entity_component/MapManager'
import IInitLogicSystem from './IInitLogicSystem'
import IInitLogicSystemManager from './IInitLogicSystemManager'

export default class InitLogicSystemManager
  extends MapManager<IInitLogicSystem>
  implements IInitLogicSystemManager
{
  init(): void {
    for (const system of this.values()) {
      system.init()
    }
  }
}
