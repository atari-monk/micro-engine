import { ILogger, IObject } from 'engine_api'
import MapManager from '../../../tech/entity_component/MapManager'

export default class ObjectDataManager extends MapManager<IObject> {
  constructor(logger?: ILogger) {
    super(logger)
  }
}
