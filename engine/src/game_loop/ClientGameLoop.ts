import { IClientApi, IEntitiesManager, IEntity, InputDto } from 'engine_api'
import GameLoop from './GameLoop'
import ClientMovementComponent from '../component/ClientMovementComponent'

export class ClientGameLoop extends GameLoop {
  private _player?: IEntity
  private _inputDto: InputDto | undefined

  constructor(
    entitiesManager: IEntitiesManager,
    private readonly _clientApi: IClientApi
  ) {
    super(entitiesManager)
  }

  load() {
    this._player = this._entitiesManager.getEntity('player')
    this._inputDto = this._player?.getComponentByType<ClientMovementComponent>(
      ClientMovementComponent
    )?.inputDto
  }

  protected onFrameEnd() {
    if (this._inputDto?.direction) {
      this._clientApi.sendInput(this._inputDto)
    }
  }
}
