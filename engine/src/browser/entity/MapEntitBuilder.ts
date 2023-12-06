import MapEntity from './MapEntity'
import MapComponent from '../component/MapComponent'
import EntityBuilder from './EntityBuilder'

export default class MapEntityBuilder extends EntityBuilder<MapEntity> {
  buildComponents() {
    const map = new MapComponent(this.tileMap)

    this.entity.addComponent(map)
  }
}
