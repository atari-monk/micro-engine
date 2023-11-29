import IResult from '../data_model/IResult'
import InputDto from './dtos/InputDto'

export default interface IEngineServerApi {
  addPlayer(socketId: string): IResult
  passClientInputToPlayerMovementComponent(inputDto: InputDto): void
}
