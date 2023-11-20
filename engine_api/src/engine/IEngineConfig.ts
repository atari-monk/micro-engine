import IGameLoop from '../game_loop/IGameLoop'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'

export default interface IEngineConfig {
  gameLoop: IGameLoop
  renderer: IRendererV2
  logger: ILogger
}
