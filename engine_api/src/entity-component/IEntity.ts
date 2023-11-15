import { IComponent } from './IComponent'

export interface IEntity {
  addComponent(component: IComponent): void
  update(): void
  render(): void
}
