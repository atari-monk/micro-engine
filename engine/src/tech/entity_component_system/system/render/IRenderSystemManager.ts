import { IManager } from 'engine_api'
import IRenderSystem from './IRenderSystem'

export default interface IRenderSystemManager extends IManager<IRenderSystem> {
  render(deltaTime: number): void
}
