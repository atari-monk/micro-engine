import { SocketEvents } from 'engine_api'
import { Socket, io } from 'socket.io-client'

export default class GameClient {
  private readonly _socket: Socket

  get socket(): Socket {
    return this._socket
  }

  constructor(serverHost: string) {
    this._socket = io(serverHost)
    this._socket.on(SocketEvents.Connect, this.onConnect.bind(this))
    this._socket.on(SocketEvents.ChatMessage, (message: string) => {
      try {
        console.log(message)
      } catch (error) {
        console.error('Error handling chat message:', error)
      }
    })
    this._socket.on(SocketEvents.ConnectError, (error: Error) => {
      console.error('Connection error:', error)
    })
  }

  private onConnect() {
    console.log(`Connected to the server with ID: ${this._socket.id}`)
    this._socket.emit(
      SocketEvents.ChatMessage,
      `Hello, I am new at your server`
    )
  }

  disconnect() {
    this._socket.disconnect()
  }
}
