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
import { IImmutableVector2 } from 'engine_api'

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

function setupSinglePlayerMode() {
  const engine = new EngineDirector().createEngine('canvas')
  engine.configManager.updateConfig({
    enableCamera: false,
  } as IEngineConfigOptions)
  engine.initialize(getGameData(engine.getScreenCenter()))
  engine.start()
}

function getGameData(center: IImmutableVector2) {
  const gameData = new GameData(center)
  gameData.entityData = new EntityData(center)
  gameData.tileMapData = new TileMapData()
  return gameData
}

function setupMultiPlayerMode() {
  const gameClient = new GameClient('http://localhost:3001/')
  const engine = new ClientEngineDirector().createEngine('canvas', gameClient)
  engine.configManager.updateConfig({
    enableCamera: true,
  } as IEngineConfigOptions)
  engine.initialize(getGameData(engine.getScreenCenter()))
  gameClient.loadEngine(engine)
  engine.start()
}
