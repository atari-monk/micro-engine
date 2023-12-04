import { Component } from 'engine'
import { IComponent, IEntity } from 'engine_api'

export class EntityMock implements IEntity {
  addComponent(component: IComponent): void {}
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T {
    return new Component() as T
  }
  update(dt: number): void {}
  render(dt: number): void {}
}
