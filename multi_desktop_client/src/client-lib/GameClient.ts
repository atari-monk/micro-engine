import { Engine } from 'engine'
import { Direction, IGameClientApi, InputDto, SocketEvents } from 'engine_api'
import { Socket, io } from 'socket.io-client'

export default class GameClient implements IGameClientApi {
  private readonly _socket: Socket
  private _engine?: Engine

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
    this._socket.on(
      SocketEvents.GameDataFrame,
      (direction: Direction[] | undefined) => {
        try {
          console.log('Server move', direction)
          //this._engine.updatePlayerPosition()
        } catch (error) {
          console.error('Error handling GameDataFrame:', error)
        }
      }
    )
    this._socket.on(SocketEvents.ConnectError, (error: Error) => {
      console.error('Connection error:', error)
    })
  }

  loadEngine(engine: Engine) {
    this._engine = engine
  }

  sendInput(inputDto: InputDto): void {
    if (inputDto.direction && inputDto.direction.length > 0)
      this._socket.emit(SocketEvents.GameDataFrame, inputDto.direction)
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
