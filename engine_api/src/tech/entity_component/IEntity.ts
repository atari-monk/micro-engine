import IComponent from './IComponent'
import IRenderable from './IRenderable'
import IUpdateable from './IUpdateable'
import ILogable from './ILogable'

export default interface IEntity extends IUpdateable, IRenderable, ILogable {
  addComponent(component: IComponent): void
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T
}
