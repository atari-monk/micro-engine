import { IObject, IRendererV2 } from 'engine_api'
import Component from '../entity_component/Component'

export default class RenderComponent extends Component {
  constructor(
    private readonly _object: IObject,
    private readonly _renderer: IRendererV2
  ) {
    super('RenderComponent')
  }

  update(dt: number) {}

  render(dt: number) {
    this._renderer.drawRect(
      this._object.position,
      this._object.size,
      this._object.color
    )
  }
}
