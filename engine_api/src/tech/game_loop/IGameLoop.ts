import IRenderCallback from './IRenderCallback'
import IUpdateCallback from './IUpdateCallback'

export default interface IGameLoop {
  start(): void
  stop(): void
  pause(): void
  resume(): void
  subscribeUpdate(callback: IUpdateCallback): void
  unsubscribeUpdate(callback: IUpdateCallback): void
  subscribeRender(callback: IRenderCallback): void
  unsubscribeRender(callback: IRenderCallback): void
}
