import { GameData, ServerEngineFactory } from 'engine'
import GameServer from './server-lib/GameServer'

const gameServer = new GameServer()
const engineFactory = new ServerEngineFactory(gameServer)
const gameData = new GameData(engineFactory.renderer)
const engine = engineFactory.createEngine(gameData)
gameServer.loadEngine(engine)

engine.startEngine()
gameServer.startServer()
