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

const engineFactory = new EngineFactory('canvas')

const gameData = new GameData(engineFactory.renderer)
const gameData2 = new GameData(engineFactory.renderer)
gameData2.objectData = new ObjectDataFactory(engineFactory.renderer)
gameData2.tileMapData = new TilemapDataFactory()

let engine = engineFactory.createEngine(gameData)
engine.startEngine()

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'c') {
    // Your code to handle the 'c' key press goes here
    console.log('The "c" key was pressed!')
  }
})

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'o') {
    // Your code to handle the 'c' key press goes here
    console.log('The "o" key was pressed!')
    engine.stopEngine()
    engineFactory.reloadEngine(gameData2)
    engine.startEngine()
  }
  if (event.key.toLowerCase() === 'p') {
    // Your code to handle the 'c' key press goes here
    console.log('The "p" key was pressed!')
    engine.stopEngine()
    engineFactory.reloadEngine(gameData)
    engine.startEngine()
  }
})

// for (let index = 0; index < 50; index++) {
//   await waitSome(10)
//   if (index % 2 === 0) {
//     engine.stopEngine()
//     engineFactory.reloadEngine(gameData2)
//     engine.startEngine()
//   } else {
//     engine.stopEngine()
//     engineFactory.reloadEngine(gameData)
//     engine.startEngine()
//   }
// }
