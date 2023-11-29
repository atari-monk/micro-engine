import { IEntitiesManager, IGameServerApi, IUpdateCallback } from 'engine_api'

export default class GameLoop {
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private paused: boolean = false

  constructor(
    entitiesManager: IEntitiesManager,
    private readonly _serverApi: IGameServerApi
  ) {}

  startLoop(): void {
    this.paused = false
    this.loop()
  }

  stopLoop(): void {}

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

    this.sendFrame()

    this.lastFrameTime = currentTime
  }

  subscribeToUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks.push(callback)
  }

  unsubscribeFromUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback)
  }

  private buildGameFrame() {}

  private sendFrame() {}
}
