import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import ConnectionManager from './ConnectionManager'
import { IEngineServerApi, SocketEvents } from 'engine_api'

export default class GameServer {
  private readonly _app = express()
  private readonly _httpServer = http.createServer(this._app)
  private readonly _io = new Server(this._httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  })
  private readonly _port: number = +(process.env.PORT ?? 3001)
  private readonly _connectionManager: ConnectionManager =
    new ConnectionManager(this._io)
  private _engine?: IEngineServerApi

  constructor() {
    this.setMiddleware()
    this._io.on(SocketEvents.Connect, this._connectionManager.OnConnection)
  }

  loadEngine(engine: IEngineServerApi) {
    this._engine = engine
    this._connectionManager.loadEngine(engine)
  }

  private setMiddleware() {
    this._app.use(cors())
  }

  startServer() {
    this._httpServer.listen(this._port, () => {
      console.log(`Server is running on port ${this._port}`)
    })
  }
}
