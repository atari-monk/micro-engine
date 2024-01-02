import { IManager } from 'engine_api'
import ILogicSystem from './IRegisterEntityByName'

export default interface ILogicSystemManager extends IManager<ILogicSystem> {
  update(deltaTime: number): void
}
