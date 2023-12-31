import { IImmutableVector2 } from 'engine_api'
import {
  GameData,
  ClientEngineDirector,
  ConfigManager,
  EngineDirector,
  IMasterEngineConfigOptions,
  IEngineConfigOptions,
  CollisionComponent,
  ObjectComponent,
  BuilderLibrary,
} from 'engine'
import GameClient from './client-lib/GameClient'
import EntityData from './data/EntityData'
import TileMapData from './data/TileMapData'
import './css/styles.css'
import './../assets/ball.png'
import './../assets/red-player.png'
import './../assets/blue-player.png'
import './../assets/goalPost.png'
import './../assets/grass.png'
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
  const engineBuilder = new EngineDirector().createDefaultEngineBuilder(
    'canvas'
  )
  engineBuilder.withBuilderFromLibrary('gameState', BuilderLibrary.GameState)
  engineBuilder.withBuilderFromLibrary('field', BuilderLibrary.Sprite)
  engineBuilder.withBuilderFromLibrary('map', BuilderLibrary.TileMap)
  engineBuilder.withBuilderFromLibrary('gate', BuilderLibrary.FootballGate)
  engineBuilder.withBuilderFromLibrary('ball', BuilderLibrary.Football)
  engineBuilder.withBuilderFromLibrary('player', BuilderLibrary.SinglePlayer)
  const engine = engineBuilder.build()
  engine.configManager.updateConfig({
    enableCamera: false,
  } as IEngineConfigOptions)
  engine.afterCreateEntitiesCallback = (entityManager) => {
    const ball = entityManager.getStrict('ball')
    const ballObj = ball.getComponentByType(ObjectComponent)
    const player1 = entityManager.getStrict('player1')
    const player2 = entityManager.getStrict('player2')
    const leftGate = entityManager.getStrict('leftGate')
    const rightGate = entityManager.getStrict('rightGate')

    const player1Collider = player1.getComponentByType(CollisionComponent)
    player1Collider.object2 = ballObj
    player1Collider.setCollisionHandler()

    const player2Collider = player2.getComponentByType(CollisionComponent)
    player2Collider.object2 = ballObj
    player2Collider.setCollisionHandler()

    const leftGateCollider = leftGate.getComponentByType(CollisionComponent)
    leftGateCollider.object2 = ballObj
    leftGateCollider.setCollisionHandler()

    const rightGateCollider = rightGate.getComponentByType(CollisionComponent)
    rightGateCollider.object2 = ballObj
    rightGateCollider.setCollisionHandler()
  }
  engine.initialize(await getGameData(engine.getScreenCenter()))
  engine.start()
}

async function getGameData(center: IImmutableVector2) {
  const gameData = new GameData()
  const entityData = new EntityData(center)
  await entityData.loadData()
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
