import { GameData, ClientEngineDirector } from 'engine'
import GameClient from './client-lib/GameClient'
import EntityData from './data/EntityData'
import TileMapData from './data/TileMapData'
import './css/styles.css'
import './../assets/ball.png'

const gameClient = new GameClient('http://localhost:3001/')

const engine = new ClientEngineDirector().createEngine('canvas', gameClient)
const center = engine.getScreenCenter()

const gameData = new GameData(center)
gameData.entityData = new EntityData(center)
gameData.tileMapData = new TileMapData()

engine.initialize(gameData)
engine.configManager.updateConfig({ enableCamera: false })

gameClient.loadEngine(engine)

engine.start()
