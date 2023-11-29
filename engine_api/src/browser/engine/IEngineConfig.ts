import ICamera from '../../tech/camera/ICamera'
import IEntitiesManager from '../../tech/entity_component/IEntitiesManager'
import IGameLoop from '../../tech/game_loop/IGameLoop'
import IInputManager from '../../tech/input_manager/IInputManager'
import ILogger from '../../tech/log_manager/ILogger'
import IRendererV2 from '../../tech/renderer/IRendererV2'

export default interface IEngineConfig {
  gameLoop: IGameLoop
  renderer: IRendererV2
  logger: ILogger
  input: IInputManager
  entitiesManager: IEntitiesManager
  camera: ICamera
}
