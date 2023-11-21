import IEntitiesManager from '../entity_component/IEntitiesManager'
import IGameLoop from '../game_loop/IGameLoop'
import IInputManager from '../input_manager/IInputManager'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'

export default interface IEngineConfig {
  gameLoop: IGameLoop
  renderer: IRendererV2
  logger: ILogger
  input: IInputManager
  entitiesManager: IEntitiesManager
}
