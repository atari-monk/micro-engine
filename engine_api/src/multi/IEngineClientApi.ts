import IResult from '../data_model/IResult'

export default interface IEngineClientApi {
  addPlayer(socketId: string): IResult
  getPlayer1Id(): string
}
