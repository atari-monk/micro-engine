import { IComponent, IEntity, ILogger } from 'engine_api'

export default class Entity implements IEntity {
  private _list = new Map<string, IComponent>()
  protected _logger?: ILogger

  set logger(logger: ILogger) {
    this._logger = logger
  }

  addComponent(component: IComponent): void {
    this._list.set(component.name, component)
  }

  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T | undefined {
    const componentName = componentType.name
    const component = this._list.get(componentName) as T | undefined

    return component
  }

  getComponentByTypeStrict<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T {
    const componentName = componentType.name
    const component = this._list.get(componentName) as T | undefined

    if (!component) {
      const message = `Component of type ${componentName} not found.`
      this._logger?.error(message)
      throw new Error(message)
    }

    return component
  }

  update(dt: number): void {
    for (const component of this._list.values()) {
      component.update(dt)
    }
  }

  render(dt: number): void {
    for (const component of this._list.values()) {
      component.render(dt)
    }
  }
}
