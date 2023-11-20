import IObjectConfig from '../component/IObjectConfig'
import IInputManager from '../input_manager/IInputManager'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'

export default interface IObjectEntityConfig {
  objectConfig: IObjectConfig
  renderer: IRendererV2
  input: IInputManager
  logger: ILogger
}
