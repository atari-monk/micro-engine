import { EngineDirector, GameData } from 'engine'
import './css/styles.css'
import EntityDataFactory from './gameData/EntityDataFactory'
import TileMapDataFactory from './gameData/TileMapDataFactory'
import './../assets/ball.png'

// const gameData = new GameData(engineFactory.renderer)
// const gameData2 = new GameData(engineFactory.renderer)
// gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
// gameData2.tileMapData = new TileMapDataFactory()

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

const engine = new EngineDirector().createEngine('canvas')
engine.initialize(new GameData(engine.getScreenCenter()))
engine.start()
