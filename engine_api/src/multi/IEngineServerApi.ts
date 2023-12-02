import IResult from './IResult'
import InputDto from './dtos/InputDto'

export default interface IEngineServerApi {
  addPlayer(socketId: string): IResult
  passClientInputToPlayerMovementComponent(inputDto: InputDto): void
  getPlayerCount(): number
  sendPlayers(): void
}
