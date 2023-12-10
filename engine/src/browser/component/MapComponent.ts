import { IRenderable } from 'engine_api'
import Component from '../../tech/entity_component/Component'

export default class MapComponent extends Component {
  constructor(private readonly _tileMap: IRenderable) {
    super('MapComponent')
  }

  update(dt: number) {}

  render(dt: number) {
    this._tileMap.render(dt)
  }
}
