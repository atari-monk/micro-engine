import { IEntityManager, IResult } from 'engine_api'
import EntityManager from '../tech/entity_component/EntityManager'
import ObjectComponent from '../tech/component/ObjectComponent'
import GameFrameDto from '../dto/GameFrameDto'
import { IClientPlayerManager as IPlayerManager } from 'engine_api/client'

export default class PlayerManager
  extends EntityManager
  implements IPlayerManager
{
  private _entityManager!: IEntityManager

  set entityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
  }

  getPlayer1Id(): string {
    const player = this.getStrict('player1')
    const playerObj =
      player.getComponentByType<ObjectComponent>(ObjectComponent)
    return playerObj.id ?? ''
  }

  addPlayer(socketId: string): IResult {
    for (const player of this.values()) {
      const object = player.getComponentByType<ObjectComponent>(ObjectComponent)
      if (object.id === socketId) {
        return {
          isDone: false,
          message: 'Player already on the list',
        }
      }
    }

    const count = this.count
    if (count >= 2) {
      return {
        isDone: false,
        message: `Number of players is ${count}. Server and clients at capacity`,
      }
    }

    const playerKey = `player${count + 1}`
    const player = this._entityManager.getStrict(playerKey)
    const playerObject =
      player.getComponentByType<ObjectComponent>(ObjectComponent)
    if (playerObject) {
      playerObject.id = socketId
      this.add(playerKey, player)
      return {
        isDone: true,
        message: `Client Engine added player on key: ${playerKey}, id: ${socketId}`,
      }
    }

    return {
      isDone: false,
      message: `Failed to add player. Entity not found for key: ${playerKey}`,
    }
  }

  updatePlayer(gameFrameDto: GameFrameDto): void {
    gameFrameDto.players.forEach((playerDto) => {
      for (const player of this.values()) {
        const object =
          player.getComponentByType<ObjectComponent>(ObjectComponent)
        if (playerDto.id === object.id) {
          this.logDebug(
            `updatePlayer: (${playerDto.position.x}, ${playerDto.position.y})`
          )
          object.position.setValues(playerDto.position)
        }
      }
    })
  }
}
