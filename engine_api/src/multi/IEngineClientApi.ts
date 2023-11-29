import IResult from './IResult'

export default interface IEngineClientApi {
  addPlayer(socketId: string): IResult
  getPlayer1Id(): string
}
