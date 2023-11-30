import IResult from './IResult'
import IGameFrameDto from './dtos/IGameFrameDto'

export default interface IEngineClientApi {
  addPlayer(socketId: string): IResult
  getPlayer1Id(): string
  updatePlayer(gameFrameDTO: IGameFrameDto): void
}
