import IPlayerManager from '../entity/IPlayerManager'
import IEngineConfig from '../../browser/engine/IEngineConfig'

export default interface IClientEngineConfig extends IEngineConfig {
  playerManager: IPlayerManager
}
