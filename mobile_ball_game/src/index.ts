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
  RenderSystem,
  RenderSubSystem,
  MapManager,
  GameEventSystem,
  StateMachineSystem,
  EntityId,
  MovementSubSystemFactory,
  StepMovementSubSystemFactory,
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
import { SpriteAnimator } from 'engine/tech/sprite/SpriteAnimator'

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
    .withBuilderFromLibrary(EntityId.GameState, BuilderLibrary.GameState)
    .withBuilderFromLibrary(EntityId.Field, BuilderLibrary.Sprite)
    //.withBuilderFromLibrary('map', BuilderLibrary.TileMap)
    .withBuilderFromLibrary('gate', BuilderLibrary.FootballGate)
    .withBuilderFromLibrary('ball', BuilderLibrary.Football)
    .withBuilderFromLibrary('player', BuilderLibrary.SinglePlayer)

  const engine = engineBuilder.build()

  engine.configManager.updateConfig({
    enableCamera: false,
  } as IEngineConfigOptions)

  engine.afterCreateEntitiesCallback = (entityManager) => {
    const ball = entityManager.getStrict(EntityId.Ball)
    const ballObj = ball.getComponentByTypeStrict(ObjectComponent)
    const player1 = entityManager.getStrict(EntityId.Player1)
    const player2 = entityManager.getStrict(EntityId.Player2)
    const leftGate = entityManager.getStrict(EntityId.LeftGate)
    const rightGate = entityManager.getStrict(EntityId.RightGate)
    const field = entityManager.getStrict(EntityId.Field)
    const gameState = entityManager.getStrict(EntityId.GameState)

    const wallSystem = new SimpleCollisionSystem(
      engine.entityManager,
      new InsideBoxCollisionSubSystem()
    )
    wallSystem.registerEntityByName(EntityId.Ball)
    engine.logicSystemManager.add('wall', wallSystem)

    const limitSystem = new SimpleCollisionSystem(
      engine.entityManager,
      new LimitMoveSubSystem()
    )
    limitSystem.registerEntityByName(EntityId.Player1)
    limitSystem.registerEntityByName(EntityId.Player2)
    engine.logicSystemManager.add('limitMove', limitSystem)

    const kinematicSystem = new KinematicsSystem(
      engine.entityManager,
      engine.eventSystem
    )
    kinematicSystem.registerEntityByName(EntityId.Ball)
    kinematicSystem.registerEntityByName(EntityId.Player1)
    kinematicSystem.registerEntityByName(EntityId.Player2)
    engine.logicSystemManager.add('kinematic', kinematicSystem)

    const playerBallCollisionSystem = new CollisionSystem(
      engine.entityManager,
      engine.collisionManager.getCollisionDetector(),
      new PlayerBallCollisionHandler(engine.eventSystem)
    )
    playerBallCollisionSystem.registerEntityByName(EntityId.Player1)
    playerBallCollisionSystem.registerEntityByName(EntityId.Player2)
    const player1Collider = player1.getComponentByTypeStrict(CollisionComponent)
    player1Collider.objectIdToCollideWith = ballObj.id
    playerBallCollisionSystem.initilize(player1)
    const player2Collider = player2.getComponentByTypeStrict(CollisionComponent)
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
    ballGateCollisionSystem.registerEntityByName(EntityId.LeftGate)
    ballGateCollisionSystem.registerEntityByName(EntityId.RightGate)
    const leftGateCollider =
      leftGate.getComponentByTypeStrict(CollisionComponent)
    leftGateCollider.objectIdToCollideWith = ballObj.id
    ballGateCollisionSystem.initilize(leftGate)
    const rightGateCollider =
      rightGate.getComponentByTypeStrict(CollisionComponent)
    rightGateCollider.objectIdToCollideWith = ballObj.id
    ballGateCollisionSystem.initilize(rightGate)
    engine.logicSystemManager.add('ballGateCollision', ballGateCollisionSystem)

    const stepMove = false
    const movementSubSystemFactory = stepMove
      ? new StepMovementSubSystemFactory(engine.input, engine.eventSystem)
      : new MovementSubSystemFactory(engine.input, engine.eventSystem)
    const moveSystem = new MovementSystem(
      engine.entityManager,
      movementSubSystemFactory
    )
    moveSystem.registerEntityByName(EntityId.Player1)
    moveSystem.registerEntityByName(EntityId.Player2)

    const gameEventSystem = new GameEventSystem(
      entityManager,
      engine.eventSystem
    )
    gameEventSystem.registerEntityByName(EntityId.GameState)

    const stateMachineSystem = new StateMachineSystem(
      entityManager,
      engine.eventSystem
    )
    stateMachineSystem.registerEntityByName(EntityId.Player1)
    stateMachineSystem.registerEntityByName(EntityId.Player2)
    stateMachineSystem.registerEntityByName(EntityId.Ball)

    engine.initLogicSystemManager.add('move', moveSystem)
    engine.initLogicSystemManager.add('event', gameEventSystem)
    engine.initLogicSystemManager.add('state', stateMachineSystem)
    engine.initLogicSystemManager.init()

    const renderSubSystem = new RenderSubSystem(
      engine.renderer,
      new MapManager<SpriteAnimator>(),
      engine.eventSystem
    )
    const renderSystem = new RenderSystem(entityManager, renderSubSystem)

    renderSubSystem.addSprite(field)
    renderSubSystem.addSprite(player1)
    renderSubSystem.addSprite(player2)
    renderSubSystem.addSprite(ball)
    renderSubSystem.addSprite(leftGate)
    renderSubSystem.addSprite(rightGate)

    renderSystem.registerEntityByName(EntityId.Field)
    renderSystem.registerEntityByName(EntityId.Player1)
    renderSystem.registerEntityByName(EntityId.Player2)
    renderSystem.registerEntityByName(EntityId.Ball)
    renderSystem.registerEntityByName(EntityId.LeftGate)
    renderSystem.registerEntityByName(EntityId.RightGate)
    renderSystem.registerEntityByName(EntityId.GameState)

    engine.renderSystemManager.add('render', renderSystem)
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
