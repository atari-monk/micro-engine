import IEventHandler from './IEventHandler'

export default interface IEventSystem {
  subscribe(eventName: string, handler: IEventHandler): void
  publish(eventName: string, data?: any): void
}
