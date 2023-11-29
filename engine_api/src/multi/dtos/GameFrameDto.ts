import ObjectDto from './ObjectDto'

export default class GameFrameDto {
  public players: Map<string, ObjectDto>

  constructor() {
    this.players = new Map<string, ObjectDto>()
  }

  static fromData(data: { players: Map<string, ObjectDto> }): GameFrameDto {
    const gameFrameDTO = new GameFrameDto()
    gameFrameDTO.players = data.players
    return gameFrameDTO
  }

  toData(): { players: Map<string, ObjectDto> } {
    return {
      players: this.players,
    }
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
