import {
  IEngineConfig,
  IObjectConfig,
  IObjectEntityConfig,
  LogLevel,
} from 'engine_api'
import GameLoop from '../game_loop/GameLoop'
import LogManager from '../log_manager/LogManager'
import RendererV2 from '../renderer/RendererV2'
import Engine from './Engine'
import InputManager from '../input_manager/InputManager'
import ObjectEntity from '../entity/ObjectEntity'
import Vector2 from '../math/Vector2'

export default class EngineFactory {
  private objectConfig: IObjectConfig

  constructor() {
    this.objectConfig = {
      color: 'red',
      position: new Vector2(0, 0),
      size: new Vector2(50, 150),
      speed: new Vector2(10, 10),
    }
  }

  createEngineConfig(canvasId: string) {
    const renderer = new RendererV2(canvasId)
    const input = new InputManager()
    document.addEventListener('keydown', (event) => {
      input.handleKeyDown(event.key)
    })
    const logger = new LogManager(LogLevel.INFO)
    const objectEntityConfig: IObjectEntityConfig = {
      objectConfig: this.objectConfig,
      renderer: renderer,
      input: input,
      logger: logger,
    }

    const engineConfig: IEngineConfig = {
      gameLoop: new GameLoop(),
      renderer: renderer,
      logger: new LogManager(LogLevel.INFO),
      input: input,
      entities: [new ObjectEntity(objectEntityConfig)],
    }
    return engineConfig
  }

  createEngine(canvasId: string) {
    return new Engine(this.createEngineConfig(canvasId))
  }
}
