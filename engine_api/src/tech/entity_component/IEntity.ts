import IComponent from './IComponent'
import IRenderable from './IRenderable'
import IUpdatable from './IUpdatable'
import ILogable from './ILogable'

export default interface IEntity extends IUpdatable, IRenderable, ILogable {
  addComponent(component: IComponent): void
  getComponentByTypeStrict<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T
  getComponentByType<T extends IComponent>(
    componentType: new (...args: any[]) => T
  ): T | undefined
}
