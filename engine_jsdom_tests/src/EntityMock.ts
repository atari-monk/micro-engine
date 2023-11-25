import { IComponent, IEntity } from 'engine_api'

export class EntityMock implements IEntity {
  addComponent(component: IComponent): void {}
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T | undefined {
    return undefined
  }
  update(dt: number): void {}
  render(dt: number): void {}
}
