import { IObject } from 'engine_api'
import EntityBuilder from '../../../browser/entity/builder/EntityBuilder'
import ObjectEntity from '../../../browser/entity/ObjectEntity'
import ObjectComponent from '../../../browser/component/ObjectComponent'

export default class ObjectEntityBuilder extends EntityBuilder {
  build(objectData: IObject): ObjectEntity {
    if (!this._logger) throw new Error('Logger not set!')
    if (!objectData) throw new Error('ObjectData not set!')

    const entity = new ObjectEntity()
    entity.logger = this._logger
    const objectComponent = new ObjectComponent(objectData)
    entity.addComponent(objectComponent)

    return entity
  }
}
