import {
  IGameLoop,
  IUpdateCallback,
  IRenderCallback,
  IEntitiesManager,
} from 'engine_api'

export default class GameLoop implements IGameLoop {
  private animationFrameId: number | null = null
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private renderCallbacks: IRenderCallback[] = []
  private paused: boolean = false

  constructor(protected readonly _entitiesManager: IEntitiesManager) {}

  load(): void {}

  startLoop(): void {
    this.paused = false
    this.loop()
  }

  stopLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  pauseLoop(): void {
    this.paused = true
  }

  resumeLoop(): void {
    this.paused = false
    this.loop()
  }

  loop = (): void => {
    if (this.paused) {
      return
    }

    const currentTime = performance.now()
    if (!this.lastFrameTime) {
      this.lastFrameTime = currentTime
    }

    const deltaTime = (currentTime - this.lastFrameTime) / 1000

    this.updateCallbacks.forEach((callback) => callback(deltaTime))

    this.renderCallbacks.forEach((callback) => callback(deltaTime))

    this.onFrameEnd()

    this.lastFrameTime = currentTime

    this.requestFrame()
  }

  protected requestFrame() {
    this.animationFrameId = requestAnimationFrame(this.loop)
  }

  protected onFrameEnd() {}

  subscribeToUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks.push(callback)
  }

  unsubscribeFromUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback)
  }

  subscribeToRender(callback: IRenderCallback): void {
    this.renderCallbacks.push(callback)
  }

  unsubscribeFromRender(callback: IRenderCallback): void {
    this.renderCallbacks = this.renderCallbacks.filter((cb) => cb !== callback)
  }
}
