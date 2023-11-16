import { IComponent, IEntity } from 'engine_api'

export default class Entity implements IEntity {
  private components = [] as IComponent[]

  addComponent(component: IComponent) {
    this.components.push(component)
  }

  update() {
    for (const component of this.components) {
      component.update()
    }
  }

  render() {
    for (const component of this.components) {
      component.render()
    }
  }
}
