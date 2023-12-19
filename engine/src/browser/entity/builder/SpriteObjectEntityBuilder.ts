import { IRendererV2, IEntityDataModel, IDataEntityBuilder } from 'engine_api'
import ObjectComponent from '../../../tech/component/ObjectComponent'
import SpriteComponent from '../../../tech/component/SpriteComponent'
import ObjectEntity from '../../../tech/entity/ObjectEntity'
import EntityBuilderBase from './EntityBuilderBase'
import { ISpriteObjectEntityBuilder } from './EntityBuilderAPI'

export default class SpriteObjectEntityBuilder
  extends EntityBuilderBase
  implements
    IDataEntityBuilder<ObjectEntity, IEntityDataModel>,
    ISpriteObjectEntityBuilder
{
  private _renderer?: IRendererV2

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  build(objectData: IEntityDataModel): ObjectEntity {
    if (this._logger === undefined) throw new Error('Logger not set!')
    if (!this._renderer) throw new Error('Renderer not set!')
    if (!objectData) throw new Error('ObjectData not set!')

    const entity = new ObjectEntity()
    entity.logger = this._logger
    const objectComponent = new ObjectComponent(objectData.object)
    entity.addComponent(objectComponent)
    entity.addComponent(
      new SpriteComponent(
        this._renderer,
        objectComponent,
        objectData.animations
      )
    )

    return entity
  }
}
