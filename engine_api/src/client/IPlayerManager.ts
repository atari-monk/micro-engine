import IResult from '../multi/IResult'
import IGameFrameDto from '../multi/dtos/IGameFrameDto'
import IEntityManager from '../tech/entity_component/IEntityManager'

export default interface IPlayerManager extends IEntityManager {
  set entityManager(entityManager: IEntityManager)

  getPlayer1Id(): string
  addPlayer(socketId: string): IResult
  updatePlayer(gameFrameDto: IGameFrameDto): void
}
