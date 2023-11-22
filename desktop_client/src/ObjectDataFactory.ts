import { IObjectConfig } from 'engine_api'
import { ObjectDataManager, Vector2 } from 'engine'

export default class ObjectDataFactory extends ObjectDataManager {
  constructor() {
    super()
    this.createData()
  }

  createData() {
    this.addObjectData('object', {
      color: 'yellow',
      position: new Vector2(550, 400),
      size: new Vector2(70, 50),
      speed: new Vector2(10, 10),
    } as IObjectConfig)

    this.addObjectData('player', {
      color: 'pink',
      position: new Vector2(600, 400),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    } as IObjectConfig)
  }
}
