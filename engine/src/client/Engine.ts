import {
  ICamera,
  IEngineClientApi,
  IEntityManager,
  IInputManager,
  ILogger,
  IRendererV2,
  IGameFrameDto,
  IResult,
  IEntityDataModel,
  IManager,
  ITileMap,
  IEntityCreator,
  IConfigurationManager,
  IEventSystem,
} from 'engine_api'
import {
  IClientPlayerManager as IPlayerManager,
  IClientGameLoop as IGameLoop,
} from 'engine_api/client'
import { default as EngineBase } from '../single/Engine'
import IEngineConfigOptions from '../tech/config_manager/IEngineConfigOptions'
import CollisionManager from '../tech/collision_detector/CollisionManager'
import ILogicSystemManager from '../tech/entity_component_system/system/ILogicSystemManager'

export default class Engine extends EngineBase implements IEngineClientApi {
  private readonly _playerManager: IPlayerManager
  private readonly _clientGameLoop: IGameLoop

  private _clientId: string = ''

  set clientId(id: string) {
    this._clientId = id
  }

  get clientId(): string {
    return this._clientId
  }

  constructor(
    logger: ILogger,
    clientGameLoop: IGameLoop,
    renderer: IRendererV2,
    input: IInputManager,
    entityDataManager: IManager<IEntityDataModel>,
    entityManager: IEntityManager,
    camera: ICamera,
    tileMap: ITileMap,
    entityCreator: IEntityCreator,
    configManager: IConfigurationManager<IEngineConfigOptions>,
    collisionManager: CollisionManager,
    eventSystem: IEventSystem,
    logicSystemManager: ILogicSystemManager,
    playerManager: IPlayerManager
  ) {
    super(
      logger,
      clientGameLoop,
      renderer,
      input,
      entityDataManager,
      entityManager,
      camera,
      tileMap,
      entityCreator,
      configManager,
      collisionManager,
      eventSystem,
      logicSystemManager
    )
    this._playerManager = playerManager
    this._clientGameLoop = clientGameLoop
  }

  addPlayer(socketId: string): IResult {
    return this._playerManager.addPlayer(socketId)
  }

  getPlayer1Id(): string {
    return this._playerManager.getPlayer1Id()
  }

  updatePlayer(gameFrameDTO: IGameFrameDto): void {
    this._playerManager.updatePlayer(gameFrameDTO)
  }

  loadGameLoop() {
    this._clientGameLoop.load(this.clientId)
  }
}
