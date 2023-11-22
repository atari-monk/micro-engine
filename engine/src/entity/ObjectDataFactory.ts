import { IObjectConfig, IObjectDataManager } from 'engine_api'
import Vector2 from '../math/Vector2'
import ObjectDataManager from './ObjectDataManager'

export default class ObjectDataFactory extends ObjectDataManager {
  constructor() {
    super()
    this.createData()
  }

  createData() {
    this.addObjectData('object', {
      color: 'blue',
      position: new Vector2(150, 200),
      size: new Vector2(150, 50),
      speed: new Vector2(10, 10),
    } as IObjectConfig)

    this.addObjectData('player', {
      color: 'red',
      position: new Vector2(0, 0),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    } as IObjectConfig)
  }
}
