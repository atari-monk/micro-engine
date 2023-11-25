import InputDto from '../multi/dtos/InputDto'

export default interface IClientApi {
  sendInput(inputDto: InputDto): void
}
