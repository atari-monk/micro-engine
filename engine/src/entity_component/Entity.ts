import { IComponent, IEntity } from 'engine_api'

export default class Entity implements IEntity {
  private componentsMap = new Map<string, IComponent>()

  addComponent(component: IComponent): void {
    // Use the component type as the key
    this.componentsMap.set(component.constructor.name, component)
  }

  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T | undefined {
    // Use the component type to retrieve the component
    return this.componentsMap.get(componentType.name) as T | undefined
  }

  update(dt: number): void {
    for (const component of this.componentsMap.values()) {
      component.update(dt)
    }
  }

  render(dt: number): void {
    for (const component of this.componentsMap.values()) {
      component.render(dt)
    }
  }
}
