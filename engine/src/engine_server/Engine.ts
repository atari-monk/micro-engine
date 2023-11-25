import { IEngineServerApi, IEntitiesManager, ILogger } from 'engine_api'
import EntitiesManager from '../entity_component/EntitiesManager'
import LogManager from '../log_manager/LogManager'
import ServerGameLoop from '../game_loop_server/GameLoop'

export default class Engine implements IEngineServerApi {
  private readonly _logger: ILogger = new LogManager()
  private readonly _entitiesManager: IEntitiesManager = new EntitiesManager()
  private readonly _playerManager: IEntitiesManager = new EntitiesManager()
  private readonly _gameLoop: ServerGameLoop = new ServerGameLoop(
    this._entitiesManager
  )

  addPlayer(socketId: string): void {}

  updateCallback = (dt: number) => {
    this._entitiesManager.updateEntities(dt)
  }

  startEngine() {
    this._logger.log(`Starting Engine`)
    this._logger.log(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.log(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }

  stopEngine() {
    this._logger.log(`Stoping Engine`)
    this._logger.log(`Stoping Game Loop`)
    this._gameLoop.stopLoop()
    this._logger.log(`Unsubscribe From Update`)
    this._gameLoop.unsubscribeFromUpdate(this.updateCallback)
  }
}
