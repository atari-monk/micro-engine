import { IImmutableVector2 } from 'engine_api'
import {
  GameData,
  ClientEngineDirector,
  ConfigManager,
  EngineDirector,
  IMasterEngineConfigOptions,
  IEngineConfigOptions,
} from 'engine'
import GameClient from './client-lib/GameClient'
import EntityData from './data/EntityData'
import TileMapData from './data/TileMapData'
import './css/styles.css'
import './../assets/ball.png'
import './../data/entityCreatorData.json'
import './../data/entityData.json'

const config = getMasterConfig()
if (config.singlePlayerMode) {
  setupSinglePlayerMode()
} else {
  setupMultiPlayerMode()
}

function getMasterConfig() {
  const initialConfig: IMasterEngineConfigOptions = {
    singlePlayerMode: true,
  }
  const configManager = new ConfigManager<IMasterEngineConfigOptions>(
    initialConfig
  )
  return configManager.getConfig()
}

async function setupSinglePlayerMode() {
  const engine = new EngineDirector().createEngine('canvas')
  engine.configManager.updateConfig({
    enableCamera: false,
  } as IEngineConfigOptions)
  engine.initialize(await getGameData(engine.getScreenCenter()))
  engine.start()
}

async function getGameData(center: IImmutableVector2) {
  const gameData = new GameData()
  const entityData = new EntityData(center)
  await entityData.createData(false)
  gameData.entityData = entityData
  gameData.tileMapData = new TileMapData()
  return gameData
}

async function setupMultiPlayerMode() {
  const gameClient = new GameClient('http://localhost:3001/')
  const engine = new ClientEngineDirector().createEngine('canvas', gameClient)
  engine.configManager.updateConfig({
    enableCamera: true,
  } as IEngineConfigOptions)
  engine.initialize(await getGameData(engine.getScreenCenter()))
  gameClient.loadEngine(engine)
  engine.start()
}
