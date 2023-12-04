import { IGameServerApi, IUpdateCallback } from 'engine_api'
import { IServerPlayerManager as IPlayerManager } from 'engine_api/server'

export default class GameLoop {
  private updateCallbacks: IUpdateCallback[] = []
  private paused: boolean = false
  private fps: number = 60
  private frameInterval: number = 1000 / this.fps
  private lastFrameTime: number = 0

  constructor(
    private readonly _serverApi: IGameServerApi,
    private readonly _playerManager: IPlayerManager
  ) {}

  startLoop(): void {
    this.paused = false
    this.lastFrameTime = performance.now()
    this.loop()
  }

  stopLoop(): void {}

  pauseLoop(): void {
    this.paused = true
  }

  resumeLoop(): void {
    this.paused = false
    this.lastFrameTime = performance.now()
    this.loop()
  }

  private loop = (): void => {
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

    setTimeout(this.loop, this.frameInterval)
  }

  subscribeToUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks.push(callback)
  }

  unsubscribeFromUpdate(callback: IUpdateCallback): void {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback)
  }

  private sendFrame(): void {
    const frame = this._playerManager.getGameFrameDto()
    this._serverApi.sendFrame(frame.toPlainObject())
  }
}
