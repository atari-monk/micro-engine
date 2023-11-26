import { IEngineServerApi, InputDto, SocketEvents } from 'engine_api'
import { Server, Socket } from 'socket.io'

export default class ConnectionManager {
  private _engine?: IEngineServerApi

  constructor(private readonly _io: Server) {}

  loadEngine(engine: IEngineServerApi) {
    this._engine = engine
  }

  private AssertEngine() {
    if (!this._engine) throw new Error('_engine not valid!')
  }

  OnConnection = (socket: Socket) => {
    this.AssertEngine()
    console.log(`${socket.id}: User is connecting`)
    const result = this._engine!.addPlayer(socket.id)
    console.log(result.message)
    if (result.isDone) this._io.emit(SocketEvents.PlayerJoined, socket.id)

    socket.on(SocketEvents.ChatMessage, (message: string) => {
      console.log(`${socket.id}: ${message}`)
      this._io.emit(SocketEvents.ChatMessage, `${socket.id}: ${message}`)
    })

    socket.on(SocketEvents.GameDataFrame, (inputDto: InputDto) => {
      console.log('InputDto', inputDto)
    })

    socket.on(SocketEvents.Disconnect, () => {
      console.log(`${socket.id}: User disconnected`)
    })
  }
}
