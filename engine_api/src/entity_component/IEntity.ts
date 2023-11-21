import IComponent from "./IComponent"

export default interface IEntity {
  addComponent(component: IComponent): void
  update(dt: number): void
  render(dt: number): void
}
