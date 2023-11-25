import { Direction, InputDto, SocketEvents } from 'engine_api'
import { Server, Socket } from 'socket.io'

export default class ConnectionManager {
  constructor(private readonly _io: Server) {}

  OnConnection = (socket: Socket) => {
    console.log(`A user connected: ${socket.id}`)

    socket.on(SocketEvents.ChatMessage, (message: string) => {
      console.log(`Message from ${socket.id}: ${message}`)
      this._io.emit(SocketEvents.ChatMessage, `${socket.id}: ${message}`)
    })

    socket.on(SocketEvents.GameDataFrame, (direction: Direction) => {
      console.log(`GameDataFrame: ${socket.id} ${direction}`)
      this._io.emit(SocketEvents.GameDataFrame, direction)
    })

    socket.on(SocketEvents.Disconnect, () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  }
}
