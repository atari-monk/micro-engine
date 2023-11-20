import IInputCallback from './IInputCallback'

export default interface IInputManager {
  subscribeInputEvent(eventType: string, callback: IInputCallback): void
  handleKeyDown(key: string): void
  handleKeyUp(key: string): void
  isKeyDown(key: string): boolean
}
