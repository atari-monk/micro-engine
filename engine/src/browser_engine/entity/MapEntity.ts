import { ITilemap } from 'engine_api'
import Entity from '../../engine_tech/entity_component/Entity'
import MapComponent from '../component/MapComponent'

export default class MapEntity extends Entity {
  constructor(tileMap: ITilemap) {
    super()
    const map = new MapComponent(tileMap)
    this.addComponent(map)
  }
}
