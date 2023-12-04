import { ILogger, ITilemap } from 'engine_api'
import Entity from '../../tech/entity_component/Entity'
import MapComponent from '../component/MapComponent'

export default class MapEntity extends Entity {
  constructor(logger: ILogger, tileMap: ITilemap) {
    super(logger)
    const map = new MapComponent(tileMap)
    this.addComponent(map)
  }
}
