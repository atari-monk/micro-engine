import {
  Direction,
  IEngineClientApi,
  IGameClientApi,
  InputDto,
  SocketEvents,
} from 'engine_api'
import { Socket, io } from 'socket.io-client'

export default class GameClient implements IGameClientApi {
  private readonly _socket: Socket
  private _engine?: IEngineClientApi

  get socket(): Socket {
    return this._socket
  }

  constructor(serverHost: string) {
    this._socket = io(serverHost)
    this._socket.on(SocketEvents.Connect, this.onConnect.bind(this))
    this._socket.on(SocketEvents.PlayerJoined, this.onPlayerJoined.bind(this))
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

  loadEngine(engine: IEngineClientApi) {
    this._engine = engine
  }

  sendInput(inputDto: InputDto): void {
    if (inputDto.direction && inputDto.direction.length > 0) {
      inputDto.id = this._engine?.getPlayer1Id() ?? 'error'
      this._socket.emit(SocketEvents.GameDataFrame, inputDto)
    }
  }

  private onConnect() {
    this._socket.emit(
      SocketEvents.ChatMessage,
      `Hello, I am new client at your server`
    )
  }

  private AssertEngine() {
    if (!this._engine) throw new Error('_engine not valid!')
  }

  private onPlayerJoined(socketId: string) {
    this.AssertEngine()
    console.log(`${socketId}: User is connecting`)
    const result = this._engine!.addPlayer(socketId)
    console.log(result.message)
  }

  disconnect() {
    this._socket.disconnect()
  }
}
