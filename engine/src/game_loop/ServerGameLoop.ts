import { IEntitiesManager } from 'engine_api'
import GameLoop from './GameLoop'

export default class ServerGameLoop extends GameLoop {
  constructor(entitiesManager: IEntitiesManager) {
    super(entitiesManager)
  }

  protected requestFrame() {}
}
