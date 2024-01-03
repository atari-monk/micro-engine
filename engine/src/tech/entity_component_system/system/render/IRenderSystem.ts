import IRegisterEntityByName from '../IRegisterEntityByName'

export default interface IRenderSystem extends IRegisterEntityByName {
  render(deltaTime: number): void
}
