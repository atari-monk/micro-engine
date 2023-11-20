import { IEngineConfig, LogLevel } from 'engine_api'
import GameLoop from '../game_loop/GameLoop'
import LogManager from '../log_manager/LogManager'
import RendererV2 from '../renderer/RendererV2'
import Engine from './Engine'

export default class EngineFactory {
  createEngineConfig(canvasId: string) {
    const engineConfig: IEngineConfig = {
      gameLoop: new GameLoop(),
      renderer: new RendererV2(canvasId),
      logger: new LogManager(LogLevel.INFO),
    }
    return engineConfig
  }

  createEngine(canvasId: string) {
    return new Engine(this.createEngineConfig(canvasId))
  }
}
