import { IMapEntityConfig, IRenderable } from 'engine_api'
import Entity from '../entity_component/Entity'
import MapComponent from '../component/MapComponent'

export default class MapEntity extends Entity {
  constructor(config: IMapEntityConfig) {
    super()
    const map = new MapComponent(config.tileMap)
    this.addComponent(map)
  }
}
