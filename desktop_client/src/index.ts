import { EngineFactory, GameData } from 'engine'
import './css/styles.css'
import ObjectDataFactory from './gameData/ObjectDataFactory'
import TilemapDataFactory from './gameData/TilemapDataFactory'

const engineFactory = new EngineFactory('canvas')

const gameData = new GameData(engineFactory.renderer)
const gameData2 = new GameData(engineFactory.renderer)
gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
gameData2.tileMapData = new TilemapDataFactory()

let engine = engineFactory.createEngine(gameData)
engine.startEngine()

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'o') {
    engine.stopEngine()
    engineFactory.reloadEngine(gameData2)
    engine.startEngine()
  }
  if (event.key.toLowerCase() === 'p') {
    engine.stopEngine()
    engineFactory.reloadEngine(gameData)
    engine.startEngine()
  }
})
