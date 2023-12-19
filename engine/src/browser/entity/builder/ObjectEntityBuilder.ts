import { IDataEntityBuilder, IObject, IRendererV2 } from 'engine_api'
import RenderComponent from '../../component/RenderComponent'
import ObjectEntity from '../ObjectEntity'
import EntityBuilderBase from './EntityBuilderBase'
import ObjectComponent from '../../component/ObjectComponent'
import { IObjectEntityBuilder } from './EntityBuilderAPI'

export default class ObjectEntityBuilder
  extends EntityBuilderBase
  implements IDataEntityBuilder<ObjectEntity, IObject>, IObjectEntityBuilder
{
  private _renderer?: IRendererV2

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  build(objectData: IObject): ObjectEntity {
    if (!this._logger) throw new Error('Logger not set!')
    if (!this._renderer) throw new Error('Renderer not set!')
    if (!objectData) throw new Error('ObjectData not set!')

    const entity = new ObjectEntity()
    entity.logger = this._logger
    const objectComponent = new ObjectComponent(objectData)
    entity.addComponent(objectComponent)
    entity.addComponent(new RenderComponent(objectComponent, this._renderer))

    return entity
  }
}
