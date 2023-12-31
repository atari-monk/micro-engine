import { GameFrameDto } from 'engine'
import {
  ClientsDto,
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
    const socketOptions = {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 10000,
    }
    this._socket = io(serverHost, socketOptions)
    this._socket.on(SocketEvents.Connect, this.onConnect.bind(this))
    this._socket.on(SocketEvents.PlayerJoined, this.onPlayerJoined.bind(this))
    this._socket.on(SocketEvents.SendPlayers, this.onSendPlayers.bind(this))
    this._socket.on(SocketEvents.ChatMessage, (message: string) => {
      try {
        console.log(message)
      } catch (error) {
        console.error('Error handling chat message:', error)
      }
    })
    this._socket.on(SocketEvents.ServerFrame, (players: any) => {
      try {
        //console.log(players)
        const frame = GameFrameDto.fromPlainObject(players)
        //console.log(frame.players)
        if (frame.players.size > 0) {
          this._engine!.updatePlayer(frame)
        }
      } catch (error) {
        console.error('Error handling GameDataFrame:', error)
      }
    })
    this._socket.on(SocketEvents.ConnectError, (error: Error) => {
      //console.error('Connection error:', error)
    })
  }

  loadEngine(engine: IEngineClientApi) {
    this._engine = engine
  }

  sendInput(inputDto: InputDto) {
    if (inputDto.direction && inputDto.direction.length > 0) {
      inputDto.id = this._engine!.getPlayer1Id()
      this._socket.emit(SocketEvents.ClientFrame, {
        id: inputDto.id,
        direction: inputDto.direction,
      })
    }
  }

  private onConnect() {
    this.AssertEngine()
    this._engine!.clientId = this._socket.id
    this._socket.emit(
      SocketEvents.ChatMessage,
      `Hello, I am new client at your server`
    )
  }

  private AssertEngine() {
    if (!this._engine) throw new Error('_engine not valid!')
  }

  private onPlayerJoined(socketId: string) {
    console.log(`${socketId}: User is connecting`)
    const result = this._engine!.addPlayer(socketId)
    console.log(result.message)
    this._engine!.loadGameLoop()
  }

  private onSendPlayers(clients: string[]) {
    console.log('Recived players:')
    const dto = new ClientsDto()
    dto.clients = clients
    dto.clients.forEach((id) => {
      const result = this._engine!.addPlayer(id)
      console.log(result.message)
    })
  }

  disconnect() {
    this._socket.disconnect()
  }
}
