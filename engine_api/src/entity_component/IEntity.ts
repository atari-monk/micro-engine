import IComponent from './IComponent'

export default interface IEntity {
  addComponent(component: IComponent): void
  update(): void
  render(): void
}
