import IResult from '../data_model/IResult'

export default interface IEngineServerApi {
  addPlayer(socketId: string): IResult
}