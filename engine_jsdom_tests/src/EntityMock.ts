import { Component } from 'engine'
import { IComponent, IEntity, ILogger } from 'engine_api'

export class EntityMock implements IEntity {
  set logger(logger: ILogger) {
    throw new Error('Method not implemented.')
  }
  addComponent(component: IComponent): void {}
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T {
    return new Component('name') as unknown as T
  }
  update(dt: number): void {}
  render(dt: number): void {}
}
