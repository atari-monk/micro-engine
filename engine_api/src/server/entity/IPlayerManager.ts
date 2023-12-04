import ClientsDto from '../../multi/dtos/ClientsDto'
import IGameFrameDto from '../../multi/dtos/IGameFrameDto'
import InputDto from '../../multi/dtos/InputDto'
import IEntityManager from '../../tech/entity_component/IEntityManager'

export default interface IPlayerManager extends IEntityManager {
  setPlayerInput(inputDto: InputDto): void
  getGameFrameDto(): IGameFrameDto
  getClientsDto(): ClientsDto
}
