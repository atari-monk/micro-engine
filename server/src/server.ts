import { GameData, ServerEngineFactory } from 'engine'
import GameServer from './server-lib/GameServer'

const engineFactory = new ServerEngineFactory()
const gameData = new GameData(engineFactory.renderer)
const engine = engineFactory.createEngine(gameData)

const gameServer = new GameServer()
gameServer.loadEngine(engine)

engine.startEngine()
gameServer.startServer()
