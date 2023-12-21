import IGameClientApi from '../multi/IGameClientApi'
import IEntityManager from '../tech/entity_component/IEntityManager'
import { default as IGameLoopBase } from '../tech/game_loop/IGameLoop'

export default interface IGameLoop extends IGameLoopBase {
  set entityManager(entityManager: IEntityManager)
  set clientApi(clientApi: IGameClientApi)
  load(clientId: string): void
}
