import { IRendererV2, IEntityDataModel, IDataEntityBuilder } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import SpriteComponent from '../../component/SpriteComponent'
import ObjectEntity from '../ObjectEntity'
import EntityBuilder from './EntityBuilder'
import { ISpriteObjectEntityBuilder } from './EntityBuilderAPI'

export default class SpriteObjectEntityBuilder
  extends EntityBuilder
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
