import { IEventHandler, IEventSystem } from 'engine_api'

export default class EventSystem implements IEventSystem {
  private events: { [key: string]: IEventHandler[] } = {}

  subscribe(eventName: string, handler: IEventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(handler)
  }

  publish(eventName: string, data?: any): void {
    const handlers = this.events[eventName]
    if (handlers) {
      handlers.forEach((handler) => handler(data))
    }
  }
}
