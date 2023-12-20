import { IGameFrameDto } from 'engine_api'
import ObjectDto from './ObjectDto'

export default class GameFrameDto implements IGameFrameDto {
  public players: Map<string, ObjectDto>

  constructor() {
    this.players = new Map<string, ObjectDto>()
  }

  toPlainObject(): { players: ObjectDto[] } {
    return {
      players: Array.from(this.players.values()),
    }
  }

  static fromPlainObject(data: { players: ObjectDto[] }): GameFrameDto {
    const gameFrameDTO = new GameFrameDto()
    gameFrameDTO.players = new Map<string, ObjectDto>(
      data.players.map((player) => [player.id, ObjectDto.fromData(player)])
    )
    return gameFrameDTO
  }

  addPlayer(playerId: string, playerObject: ObjectDto): void {
    this.players.set(playerId, playerObject)
  }

  removePlayer(playerId: string): void {
    this.players.delete(playerId)
  }

  getPlayer(playerId: string): ObjectDto | undefined {
    return this.players.get(playerId)
  }
}
