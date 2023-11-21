import { IComponent, IEntity } from 'engine_api'

export default class Entity implements IEntity {
  private components = [] as IComponent[]

  addComponent(component: IComponent) {
    this.components.push(component)
  }

  update(dt: number) {
    for (const component of this.components) {
      component.update(dt)
    }
  }

  render(dt: number) {
    for (const component of this.components) {
      component.render(dt)
    }
  }
}
