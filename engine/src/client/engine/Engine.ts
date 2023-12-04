import {
  ICamera,
  IEngineClientApi,
  IEngineConfig,
  IEntityManager,
  IEntity,
  IGameLoop,
  IInputManager,
  ILogger,
  IRendererV2,
  IResult,
  IVector2,
} from 'engine_api'
import ObjectComponent from '../../browser/component/ObjectComponent'
import EntityManager from '../../tech/entity_component/EntityManager'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import { GameLoop } from '../game_loop/GameLoop'

export default class Engine implements IEngineClientApi {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _logger: ILogger
  private readonly _input: IInputManager
  protected _entityManager: IEntityManager
  private readonly _playerManager: IEntityManager = new EntityManager()
  private readonly _camera: ICamera
  private _player: IEntity = {} as IEntity
  private _playerPosition?: IVector2
  private _clientId: string = ''

  constructor(private readonly _engineConfig: IEngineConfig) {
    this._logger = this._engineConfig.logger
    this._logger.log(`Logger`)
    this._logger.log(`Game Loop`)
    this._gameLoop = this._engineConfig.gameLoop
    this._logger.log(`Renderer`)
    this._renderer = this._engineConfig.renderer
    this._logger.log(`Input`)
    this._input = this._engineConfig.input
    this._logger.log(`Entities Manager`)
    this._entityManager = this._engineConfig.entitiesManager
    this._camera = this._engineConfig.camera
  }

  set clientId(id: string) {
    this._clientId = id
  }

  get clientId(): string {
    return this._clientId
  }

  loadGameLoop() {
    ;(this._gameLoop as GameLoop).load(this.clientId)
  }

  updateCallback = (dt: number) => {
    this._entityManager.updateEntities(dt)
  }

  renderCallback = (dt: number) => {
    this._renderer.clearCanvas()
    this._renderer.fillCanvas('rgba(87, 40, 145, 0.8)')
    if (this._playerPosition) this._camera.setPosition(this._playerPosition)
    this._entityManager.renderEntities(dt)
    this._renderer.resetTranslation()
  }

  startEngine() {
    this._logger.log(`Starting Engine`)
    this._player = this._entityManager.getEntity('player1')
    this._playerPosition =
      this._player.getComponentByType<ObjectComponent>(
        ObjectComponent
      )?.position
    this._logger.log(`Subscribe To Update`)
    this._gameLoop.subscribeToUpdate(this.updateCallback)
    this._logger.log(`Subscribe To Render`)
    this._gameLoop.subscribeToRender(this.renderCallback)
    this._logger.log(`Starting Game Loop`)
    this._gameLoop.startLoop()
  }

  stopEngine() {
    this._logger.log(`Stoping Engine`)
    this._logger.log(`Stoping Game Loop`)
    this._gameLoop.stopLoop()
    this._logger.log(`Unsubscribe From Render`)
    this._gameLoop.unsubscribeFromRender(this.renderCallback)
    this._logger.log(`Unsubscribe From Update`)
    this._gameLoop.unsubscribeFromUpdate(this.updateCallback)
    this._player = {} as IEntity
    this._playerPosition = undefined
  }

  getPlayer1Id() {
    const player = this._playerManager.getEntity('player1')
    const playerObj =
      player.getComponentByType<ObjectComponent>(ObjectComponent)
    return playerObj?.id ?? 'error'
  }

  addPlayer(socketId: string) {
    const players = this._playerManager.getAllAsRecord()
    for (const player of Object.values(players)) {
      const object = player.getComponentByType<ObjectComponent>(ObjectComponent)
      if (!object) continue
      if (object.id === socketId)
        return {
          isDone: false,
          message: `Player already on list`,
        } as IResult
    }

    this._logger.log('Adding player to client engine')
    const count = this._playerManager.getEntityCount()

    if (count >= 2) {
      return {
        isDone: false,
        message: `Number of players is ${count}. Server and clients at capacity`,
      } as IResult
    }

    const playerKey = `player${count + 1}`
    const player = this._entityManager.getEntity(playerKey)

    if (!player) {
      return {
        isDone: false,
        message: 'Error getting player entity!',
      } as IResult
    }

    const playerObject =
      player.getComponentByType<ObjectComponent>(ObjectComponent)

    if (!playerObject) {
      return {
        isDone: false,
        message: 'Error getting player Object!',
      } as IResult
    }

    playerObject!.id = socketId
    this._playerManager.addEntity(playerKey, player)
    return {
      isDone: true,
      message: `Client Engine added player on key: ${playerKey}, id: ${socketId}`,
    } as IResult
  }

  updatePlayer(gameFrameDto: GameFrameDto): void {
    gameFrameDto.players.forEach((playerDto) => {
      const allPlayers = this._playerManager.getAllAsRecord()
      for (const player of Object.values(allPlayers)) {
        const object =
          player.getComponentByType<ObjectComponent>(ObjectComponent)
        if (!object) continue
        //console.log('playerdto:', playerDto.id)
        //console.log('player:', object.id)
        if (playerDto.id !== object.id) continue
        //console.log('pos upd:', playerDto.id)
        object.position.setValues(playerDto.position)
      }
    })
  }
}
