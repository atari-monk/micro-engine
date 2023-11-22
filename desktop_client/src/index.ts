import { EngineFactory, GameData } from 'engine'
import './css/styles.css'

const engineFactory = new EngineFactory('canvas', new GameData())
const engine = engineFactory.createEngine()
engine.initializeEngine()
