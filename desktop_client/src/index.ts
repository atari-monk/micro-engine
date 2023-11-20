import { EngineFactory } from 'engine'
import './css/styles.css'

const engineFactory = new EngineFactory()
const engine = engineFactory.createEngine('canvas')
engine.initializeEngine()
