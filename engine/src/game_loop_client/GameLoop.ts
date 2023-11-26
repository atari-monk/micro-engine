import {
  IGameClientApi,
  IEntitiesManager,
  IEntity,
  InputDto,
  IUpdateCallback,
  IRenderCallback,
} from 'engine_api'
import ClientMovementComponent from '../component_client/MovementComponent'

export class GameLoop {
  private animationFrameId: number | null = null
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private renderCallbacks: IRenderCallback[] = []
  private paused: boolean = false

  private _player?: IEntity
  private _inputDto: InputDto | undefined

  constructor(
    private readonly _entitiesManager: IEntitiesManager,
    private readonly _clientApi: IGameClientApi
  ) {}

  load() {
    this._player = this._entitiesManager.getEntity('player1')
    this._inputDto = this._player?.getComponentByType<ClientMovementComponent>(
      ClientMovementComponent
    )?.inputDto
  }

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

    this.sendFrame()

    this.lastFrameTime = currentTime

    this.animationFrameId = requestAnimationFrame(this.loop)
  }

  private sendFrame() {
    if (this._inputDto) {
      this._clientApi.sendInput(this._inputDto)
    }
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
