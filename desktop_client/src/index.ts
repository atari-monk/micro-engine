import { EngineDirector, EngineFactory, GameData, RendererV2 } from 'engine'
import './css/styles.css'
import ObjectDataFactory from './gameData/ObjectDataFactory'
import TileMapDataFactory from './gameData/TileMapDataFactory'
import './../assets/ball.png'
import { IRendererV2 } from 'engine_api'

// const engineFactory = new EngineFactory('canvas')

// const gameData = new GameData(engineFactory.renderer)
// const gameData2 = new GameData(engineFactory.renderer)
// gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
// gameData2.tileMapData = new TileMapDataFactory()

// let engine = engineFactory.createEngine(gameData)
// engine.startEngine()

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

const renderer: IRendererV2 = new RendererV2('canvas')
const engineDirector = new EngineDirector()
const gameData = new GameData(renderer)
let engine = engineDirector.createEngine(renderer)
engine.initialize(gameData)
engine.start()
