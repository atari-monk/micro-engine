import { IComponent, IObject, IRendererV2 } from 'engine_api'

export default class RenderComponent implements IComponent {
  constructor(
    private readonly _object: IObject,
    private readonly _renderer: IRendererV2
  ) {}

  update(dt: number) {}

  render(dt: number) {
    this._renderer.drawRect(
      this._object.position,
      this._object.size,
      this._object.color
    )
  }
}
