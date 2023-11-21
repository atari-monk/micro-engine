import {
  IEngineConfig,
  IEntitiesManager,
  IGameLoop,
  ILogger,
  IObjectEntityConfig,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import GameLoop from '../game_loop/GameLoop'
import LogManager from '../log_manager/LogManager'
import RendererV2 from '../renderer/RendererV2'
import Engine from './Engine'
import InputManager from '../input_manager/InputManager'
import Vector2 from '../math/Vector2'
import ObjectEntityFactory from '../entity/ObjectEntityFactory'
import EntitiesManager from '../entity_component/EntitiesManager'

export default class EngineFactory {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager
  private readonly _logger: ILogger
  private readonly _objectEntityFactory: ObjectEntityFactory
  private readonly _entitiesManager: IEntitiesManager

  constructor(canvasId: string) {
    this._gameLoop = new GameLoop()
    this._renderer = new RendererV2(canvasId)
    this._input = new InputManager()
    document.addEventListener('keydown', (event) => {
      this._input.handleKeyDown(event.key)
    })
    this._logger = new LogManager(LogLevel.INFO)
    const defaultObjectEntityConfig: IObjectEntityConfig = {
      objectConfig: {
        color: 'red',
        position: new Vector2(0, 0),
        size: new Vector2(50, 150),
        speed: new Vector2(10, 10),
      },
      renderer: this._renderer,
      input: this._input,
      logger: this._logger,
    }
    this._objectEntityFactory = new ObjectEntityFactory(
      defaultObjectEntityConfig
    )
    this._entitiesManager = new EntitiesManager()
    this._entitiesManager.addEntity(
      'player',
      this._objectEntityFactory.createObjectEntity()
    )
    this._entitiesManager.addEntity(
      'player2',
      this._objectEntityFactory.createObjectEntity({
        color: 'blue',
        position: new Vector2(150, 200),
        size: new Vector2(150, 50),
        speed: new Vector2(10, 10),
      })
    )
  }

  createEngineConfig() {
    const engineConfig: IEngineConfig = {
      gameLoop: this._gameLoop,
      renderer: this._renderer,
      logger: this._logger,
      input: this._input,
      entitiesManager: this._entitiesManager,
    }
    return engineConfig
  }

  createEngine() {
    return new Engine(this.createEngineConfig())
  }
}
