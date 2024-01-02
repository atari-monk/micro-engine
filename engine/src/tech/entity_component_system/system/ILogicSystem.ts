import IRegisterEntityByName from './IRegisterEntityByName'

export default interface ILogicSystem extends IRegisterEntityByName {
  update(deltaTime: number): void
}
