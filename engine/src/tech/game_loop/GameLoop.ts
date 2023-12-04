import {
  IGameLoop,
  IUpdateCallback,
  IRenderCallback,
  IEntityManager,
} from 'engine_api'

export default class GameLoop implements IGameLoop {
  private animationFrameId: number | null = null
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private renderCallbacks: IRenderCallback[] = []
  private paused: boolean = false

  constructor(protected readonly _entityManager: IEntityManager) {}

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

    this.lastFrameTime = currentTime

    this.animationFrameId = requestAnimationFrame(this.loop)
  }

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