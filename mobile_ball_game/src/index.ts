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
  MovementSystem,
  KinematicsSystem,
  CollisionSystem,
  PlayerBallCollisionHandler,
  BallGateCollisionHandler,
  SimpleCollisionSystem,
  InsideBoxCollisionSubSystem,
  LimitMoveSubSystem,
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

  engineBuilder
    .withBuilderFromLibrary('gameState', BuilderLibrary.GameState)
    .withBuilderFromLibrary('field', BuilderLibrary.Sprite)
    //.withBuilderFromLibrary('map', BuilderLibrary.TileMap)
    .withBuilderFromLibrary('gate', BuilderLibrary.FootballGate)
    .withBuilderFromLibrary('ball', BuilderLibrary.Football)
    .withBuilderFromLibrary('player', BuilderLibrary.SinglePlayer)

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

    const wallSystem = new SimpleCollisionSystem(
      engine.entityManager,
      new InsideBoxCollisionSubSystem()
    )
    wallSystem.registerEntityByName('ball')
    engine.logicSystemManager.add('wall', wallSystem)

    const limitSystem = new SimpleCollisionSystem(
      engine.entityManager,
      new LimitMoveSubSystem()
    )
    limitSystem.registerEntityByName('player1')
    limitSystem.registerEntityByName('player2')
    engine.logicSystemManager.add('limitMove', limitSystem)

    const kinematicSystem = new KinematicsSystem(
      engine.entityManager,
      engine.eventSystem
    )
    kinematicSystem.registerEntityByName('ball')
    kinematicSystem.registerEntityByName('player1')
    kinematicSystem.registerEntityByName('player2')
    engine.logicSystemManager.add('kinematic', kinematicSystem)

    const playerBallCollisionSystem = new CollisionSystem(
      engine.entityManager,
      engine.collisionManager.getCollisionDetector(),
      new PlayerBallCollisionHandler(engine.eventSystem)
    )
    playerBallCollisionSystem.registerEntityByName('player1')
    playerBallCollisionSystem.registerEntityByName('player2')
    const player1Collider = player1.getComponentByType(CollisionComponent)
    player1Collider.objectIdToCollideWith = ballObj.id
    playerBallCollisionSystem.initilize(player1)
    const player2Collider = player2.getComponentByType(CollisionComponent)
    player2Collider.objectIdToCollideWith = ballObj.id
    playerBallCollisionSystem.initilize(player2)
    engine.logicSystemManager.add(
      'playerBallCollision',
      playerBallCollisionSystem
    )

    const ballGateCollisionSystem = new CollisionSystem(
      engine.entityManager,
      engine.collisionManager.getCollisionDetector(),
      new BallGateCollisionHandler(
        entityManager,
        engine.entityDataManager,
        engine.eventSystem
      )
    )
    ballGateCollisionSystem.registerEntityByName('leftGate')
    ballGateCollisionSystem.registerEntityByName('rightGate')
    const leftGateCollider = leftGate.getComponentByType(CollisionComponent)
    leftGateCollider.objectIdToCollideWith = ballObj.id
    ballGateCollisionSystem.initilize(leftGate)
    const rightGateCollider = rightGate.getComponentByType(CollisionComponent)
    rightGateCollider.objectIdToCollideWith = ballObj.id
    ballGateCollisionSystem.initilize(rightGate)
    engine.logicSystemManager.add('ballGateCollision', ballGateCollisionSystem)

    const moveSystem = new MovementSystem(
      engine.entityManager,
      engine.input,
      engine.eventSystem
    )
    moveSystem.registerEntityByName('player1')
    moveSystem.registerEntityByName('player2')
    engine.initLogicSystemManager.add('move', moveSystem)
    engine.initLogicSystemManager.init()
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
