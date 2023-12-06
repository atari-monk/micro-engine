import MapEntity from './MapEntity'
import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../component/ObjectComponent'
import SpriteComponent from '../component/SpriteComponent'

export default class SpriteObjectEntityBuilder extends EntityBuilder<MapEntity> {
  buildComponents() {
    const object = new ObjectComponent(this.objectData)
    const render = new SpriteComponent(this.renderer, object, this.animConfig!)

    this.entity.addComponent(object)
    this.entity.addComponent(render)
  }
}
