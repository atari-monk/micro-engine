import MapManager from '../../entity_component/MapManager'
import ILogicSystem from './ILogicSystem'
import ILogicSystemManager from './ILogicSystemManager'

export default class LogicSystemManager
  extends MapManager<ILogicSystem>
  implements ILogicSystemManager
{
  update(dt: number): void {
    for (const system of this.values()) {
      system.update(dt)
    }
  }
}
