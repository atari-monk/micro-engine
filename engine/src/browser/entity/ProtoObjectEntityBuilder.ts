import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../component/ObjectComponent'
import RenderComponent from '../component/RenderComponent'
import ObjectEntity from './ObjectEntity'

export default class ProtoObjectEntityBuilder extends EntityBuilder<ObjectEntity> {
  buildComponents() {
    const object = new ObjectComponent(this.objectData)
    const render = new RenderComponent(object, this.renderer)

    this.entity.addComponent(object)
    this.entity.addComponent(render)
  }
}
