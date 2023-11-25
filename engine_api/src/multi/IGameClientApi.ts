import InputDto from './dtos/InputDto'

export default interface IGameClientApi {
  sendInput(inputDto: InputDto): void
}
