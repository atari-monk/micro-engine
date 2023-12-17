import { ServerEngineDirector, GameData } from 'engine'
import GameServer from './server-lib/GameServer'

const gameServer = new GameServer()
const engine = new ServerEngineDirector().createEngine(gameServer)
engine.initialize(new GameData(engine.getScreenCenter()))
gameServer.loadEngine(engine)

engine.start()
gameServer.start()
