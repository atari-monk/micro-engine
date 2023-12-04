import { IEntityManager, ILogger, IResult } from 'engine_api'
import EntityManager2 from '../../tech/entity_component/EntityManager2'
import ObjectComponent from '../../browser/component/ObjectComponent'
import GameFrameDto from '../../multi/dtos/GameFrameDto'
import { IClientPlayerManager as IPlayerManager } from 'engine_api/client'

export default class PlayerManager
  extends EntityManager2
  implements IPlayerManager
{
  constructor(
    protected readonly _logger: ILogger,
    private _entityManager: IEntityManager
  ) {
    super(_logger)
  }

  getPlayer1Id() {
    const player = this.getEntity('player1')
    const playerObj =
      player.getComponentByType<ObjectComponent>(ObjectComponent)
    return playerObj.id
  }

  addPlayer(socketId: string) {
    for (const player of this._list.values()) {
      const object = player.getComponentByType<ObjectComponent>(ObjectComponent)
      if (object.id === socketId)
        return {
          isDone: false,
          message: `Player already on list`,
        } as IResult
    }

    const count = this.getEntityCount()
    if (count >= 2) {
      return {
        isDone: false,
        message: `Number of players is ${count}. Server and clients at capacity`,
      } as IResult
    }

    const playerKey = `player${count + 1}`
    const player = this._entityManager.getEntity(playerKey)
    const playerObject =
      player.getComponentByType<ObjectComponent>(ObjectComponent)
    playerObject.id = socketId
    this.addEntity(playerKey, player)
    return {
      isDone: true,
      message: `Client Engine added player on key: ${playerKey}, id: ${socketId}`,
    } as IResult
  }

  updatePlayer(gameFrameDto: GameFrameDto): void {
    gameFrameDto.players.forEach((playerDto) => {
      for (const player of this._list.values()) {
        const object =
          player.getComponentByType<ObjectComponent>(ObjectComponent)
        if (playerDto.id !== object.id) continue
        this._logger.debug(`updatePlayer: ${playerDto}`)
        object.position.setValues(playerDto.position)
      }
    })
  }
}
