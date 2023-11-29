import { IComponent, IRenderable } from 'engine_api'

export default class MapComponent implements IComponent {
  constructor(private readonly _tileMap: IRenderable) {}

  update(dt: number) {}

  render(dt: number) {
    this._tileMap.render(dt)
  }
}
