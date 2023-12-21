import IGameServerApi from '../multi/IGameServerApi'
import IUpdateCallback from '../tech/game_loop/IUpdateCallback'
import IPlayerManager from './IPlayerManager'

export default interface IGameLoop {
  set serverApi(serverApi: IGameServerApi)
  set playerManager(playerManager: IPlayerManager)
  start(): void
  stop(): void
  pause(): void
  resume(): void
  subscribeUpdate(callback: IUpdateCallback): void
  unsubscribeUpdate(callback: IUpdateCallback): void
}
