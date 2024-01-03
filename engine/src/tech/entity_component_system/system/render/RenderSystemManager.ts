import MapManager from '../../../entity_component/MapManager'
import IRenderSystem from './IRenderSystem'
import IRenderSystemManager from './IRenderSystemManager'

export default class RenderSystemManager
  extends MapManager<IRenderSystem>
  implements IRenderSystemManager
{
  render(dt: number): void {
    for (const system of this.values()) {
      system.render(dt)
    }
  }
}
