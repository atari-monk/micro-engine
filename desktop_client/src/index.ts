import { EngineFactory, GameData } from 'engine'
import './css/styles.css'
import ObjectDataFactory from './ObjectDataFactory'
import TilemapDataFactory from './TilemapDataFactory'

function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * seconds)
  })
}

async function waitSome(seconds: number) {
  console.log(`Wait for ${seconds} seconds...`)
  await wait(seconds)
  console.log('Done Waiting!')
}

const gameData = new GameData()

const gameData2 = new GameData()
gameData2.objectData = new ObjectDataFactory()
gameData2.tileMapData = new TilemapDataFactory()

const engineFactory = new EngineFactory('canvas', gameData)
let engine = engineFactory.createEngine()
engine.startEngine()

for (let index = 0; index < 50; index++) {
  await waitSome(10)
  if (index % 2 === 0) {
    engine.stopEngine()
    engineFactory.reloadEngine(gameData2)
    engine.startEngine()
  } else {
    engine.stopEngine()
    engineFactory.reloadEngine(gameData)
    engine.startEngine()
  }
}
