import { Direction, IEngineServerApi, InputDto, SocketEvents } from 'engine_api'
import { Server, Socket } from 'socket.io'

export default class ConnectionManager {
  private _engine?: IEngineServerApi

  constructor(private readonly _io: Server) {}

  loadEngine(engine: IEngineServerApi) {
    this._engine = engine
  }

  private AssertRefs() {
    if (!this._engine) throw new Error('_engine not valid!')
  }

  OnConnection = (socket: Socket) => {
    this.AssertRefs()
    console.log(`A user connected: ${socket.id}`)
    this._engine!.addPlayer(socket.id)

    socket.on(SocketEvents.ChatMessage, (message: string) => {
      console.log(`Message from ${socket.id}: ${message}`)
      this._io.emit(SocketEvents.ChatMessage, `${socket.id}: ${message}`)
    })

    socket.on(
      SocketEvents.GameDataFrame,
      (direction: Direction[] | undefined) => {
        console.log('direction', direction)
        this._io.emit(SocketEvents.GameDataFrame, direction)
      }
    )

    socket.on(SocketEvents.Disconnect, () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  }
}
