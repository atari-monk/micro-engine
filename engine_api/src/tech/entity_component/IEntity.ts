import IComponent from './IComponent'
import IRenderable from './IRenderable'
import IUpdateable from './IUpdateable'

export default interface IEntity extends IUpdateable, IRenderable {
  addComponent(component: IComponent): void
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T
}