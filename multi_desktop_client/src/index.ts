import { GameData, ClientEngineDirector } from 'engine'
import './css/styles.css'
import EntityDataFactory from './gameData/EntityDataFactory'
import TilemapDataFactory from './gameData/TilemapDataFactory'
import GameClient from './client-lib/GameClient'
import './../assets/ball.png'

// const gameData = new GameData(engineFactory.renderer)
// const gameData2 = new GameData(engineFactory.renderer)
// gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
// gameData2.tileMapData = new TilemapDataFactory()

// document.addEventListener('keydown', (event: KeyboardEvent) => {
//   if (event.key.toLowerCase() === 'o') {
//     engine.stopEngine()
//     engineFactory.reloadEngine(gameData2)
//     engine.startEngine()
//   }
//   if (event.key.toLowerCase() === 'p') {
//     engine.stopEngine()
//     engineFactory.reloadEngine(gameData)
//     engine.startEngine()
//   }
// })

const gameClient = new GameClient('http://localhost:3001/')

const engine = new ClientEngineDirector().createEngine('canvas', gameClient)
engine.initialize(new GameData(engine.getScreenCenter()))

gameClient.loadEngine(engine)

engine.start()
