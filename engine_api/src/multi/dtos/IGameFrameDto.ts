import IObjectDto from './IObjectDto'

export default interface IGameFrameDto {
  players: Map<string, IObjectDto>

  toPlainObject(): { players: IObjectDto[] }
  addPlayer(playerId: string, playerObject: IObjectDto): void
  removePlayer(playerId: string): void
  getPlayer(playerId: string): IObjectDto | undefined
}
