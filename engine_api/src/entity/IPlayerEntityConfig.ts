import IObject from '../component/IObject'
import IInputManager from '../input_manager/IInputManager'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'

export default interface IPlayerEntityConfig {
  objectConfig: IObject
  renderer: IRendererV2
  input: IInputManager
  logger: ILogger
}
