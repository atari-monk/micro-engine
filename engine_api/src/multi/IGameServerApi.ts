export default interface IGameServerApi {
  sendPlayers(clients: any): void
  sendFrame(frameDto: any): void
}
