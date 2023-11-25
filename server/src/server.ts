import { GameData, ServerEngineFactory } from 'engine'
import GameServer from './server-lib/GameServer'
// import ObjectDataFactory from './gameData/ObjectDataFactory'
// import TilemapDataFactory from './gameData/TilemapDataFactory'

const engineFactory = new ServerEngineFactory('canvas')

const gameData = new GameData(engineFactory.renderer)
// const gameData2 = new GameData(engineFactory.renderer)
// gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
// gameData2.tileMapData = new TilemapDataFactory()

let engine = engineFactory.createEngine(gameData)
engine.startEngine()

// engine.stopEngine()
// engineFactory.reloadEngine(gameData2)
// engine.startEngine()

const gameServer = new GameServer()
gameServer.startServer()
