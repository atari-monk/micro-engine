import { IManager } from 'engine_api'
import IInitLogicSystem from './IInitLogicSystem'

export default interface IInitLogicSystemManager
  extends IManager<IInitLogicSystem> {
  init(): void
}
