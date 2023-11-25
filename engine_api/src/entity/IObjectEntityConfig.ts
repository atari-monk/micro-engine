import IObject from '../component/IObject'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'

export default interface IObjectEntityConfig {
  objectConfig: IObject
  renderer: IRendererV2
  logger: ILogger
}
