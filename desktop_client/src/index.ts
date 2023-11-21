import { EngineFactory } from 'engine'
import './css/styles.css'

const engineFactory = new EngineFactory('canvas')
const engine = engineFactory.createEngine()
engine.initializeEngine()
