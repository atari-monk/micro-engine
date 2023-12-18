import { IGameLoop, IUpdateCallback, IRenderCallback } from 'engine_api'

export default class GameLoop implements IGameLoop {
  private animationFrameId: number | null = null
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private renderCallbacks: IRenderCallback[] = []
  private paused: boolean = false

  start(): void {
    this.paused = false
    this.loop()
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  pause(): void {
    this.paused = true
  }

  resume(): void {
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

    this.lastFrameTime = currentTime

    this.animationFrameId = requestAnimationFrame(this.loop)
  }

  subscribeUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks.push(callback)
  }

  unsubscribeUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback)
  }

  subscribeRender(callback: IRenderCallback): void {
    this.renderCallbacks.push(callback)
  }

  unsubscribeRender(callback: IRenderCallback): void {
    this.renderCallbacks = this.renderCallbacks.filter((cb) => cb !== callback)
  }
}
