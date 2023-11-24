import InputDto from './dtos/InputDto'

export default interface IServerApi {
  sendInput(input: InputDto): void
}
