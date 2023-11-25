import IRenderCallback from './IRenderCallback'
import IUpdateCallback from './IUpdateCallback'

export default interface IGameLoop {
  startLoop(): void
  stopLoop(): void
  pauseLoop(): void
  resumeLoop(): void
  subscribeToUpdate(callback: IUpdateCallback): void
  unsubscribeFromUpdate(callback: IUpdateCallback): void
  subscribeToRender(callback: IRenderCallback): void
  unsubscribeFromRender(callback: IRenderCallback): void
  load(): void
}
