import { ILogger, ISprite } from 'engine_api'
import MapManager from '../../../tech/entity_component/MapManager'

export default class SpriteDataManager extends MapManager<ISprite> {
  constructor(logger?: ILogger) {
    super(logger)
  }
}
