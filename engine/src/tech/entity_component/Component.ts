import { IComponent } from 'engine_api'

export default class Component implements IComponent {
  private _name: string

  get name(): string {
    return this._name
  }

  constructor(name: string) {
    this._name = name
  }

  update(deltaTime: number) {}

  render(deltaTime: number) {}
}
