import {
  IGameClientApi,
  IEntityManager,
  IEntity,
  InputDto,
  IUpdateCallback,
  IRenderCallback,
  IClientGameLoop as IGameLoop,
} from 'engine_api'
import ClientMovementComponent from '../tech/component/ClientMovementComponent'
import ObjectComponent from '../tech/component/ObjectComponent'

export default class GameLoop implements IGameLoop {
  private animationFrameId: number | null = null
  private lastFrameTime: number = 0
  private updateCallbacks: IUpdateCallback[] = []
  private renderCallbacks: IRenderCallback[] = []
  private paused: boolean = false

  private _player!: IEntity
  private _inputDto: InputDto | undefined

  private _entityManager!: IEntityManager
  private _clientApi!: IGameClientApi

  set entityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
  }

  set clientApi(clientApi: IGameClientApi) {
    this._clientApi = clientApi
  }

  load(clientId: string) {
    console.log('Load GameLoop clientId: ', clientId)
    const player1 = this._entityManager.getStrict('player1')
    const player2 = this._entityManager.getStrict('player2')
    const player1Id = player1.getComponentByTypeStrict(ObjectComponent).id
    const player2Id = player2.getComponentByTypeStrict(ObjectComponent).id
    if (clientId == player1Id) {
      this._player = player1
      console.log('Player1 was chosen')
    }
    if (clientId == player2Id) {
      this._player = player2
      console.log('Player2 was chosen')
    }
    if (!this._player) throw new Error('player was not assigned!')
    this._inputDto = this._player.getComponentByTypeStrict(
      ClientMovementComponent
    ).inputDto
  }

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

    this.sendFrame()

    this.lastFrameTime = currentTime

    this.animationFrameId = requestAnimationFrame(this.loop)
  }

  private sendFrame() {
    if (this._inputDto) {
      this._clientApi.sendInput(this._inputDto)
    }
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
