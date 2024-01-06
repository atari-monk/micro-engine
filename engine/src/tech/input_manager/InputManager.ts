import { IInputCallback, IInputManager } from 'engine_api'

export default class InputManager implements IInputManager {
  private inputCallbacks: { [key: string]: IInputCallback[] } = {}
  private keyStates: { [key: string]: boolean } = {}

  subscribeInputEvent(eventType: string, callback: IInputCallback): void {
    if (!this.inputCallbacks[eventType]) {
      this.inputCallbacks[eventType] = []
    }
    this.inputCallbacks[eventType].push(callback)
  }

  unsubscribeInputEvent(eventType: string, callback: IInputCallback): void {
    const callbacks = this.inputCallbacks[eventType]
    if (callbacks) {
      this.inputCallbacks[eventType] = callbacks.filter((cb) => cb !== callback)
    }
  }

  unsubscribeAll(eventType: string): void {
    if (this.inputCallbacks[eventType]) {
      delete this.inputCallbacks[eventType]
    }
  }

  handleKeyDown(key: string): void {
    this.keyStates[key] = true
    this.handleInputEvent('KeyDown', key)
  }

  handleKeyUp(key: string): void {
    this.keyStates[key] = false
    this.handleInputEvent('KeyUp', key)
  }

  isKeyDown(key: string): boolean {
    return this.keyStates[key] || false
  }

  private handleInputEvent(eventType: string, inputData: any): void {
    const callbacks = this.inputCallbacks[eventType]
    if (callbacks) {
      callbacks.forEach((callback) => callback(inputData))
    }
  }
}
