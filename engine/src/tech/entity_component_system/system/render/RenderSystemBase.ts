import { IEntity, IEntityManager } from 'engine_api'
import IRenderSystem from './IRenderSystem'

export default abstract class RenderSystemBase implements IRenderSystem {
  protected entityList: IEntity[] = []

  constructor(protected readonly entityManager: IEntityManager) {}

  render(deltaTime: number): void {
    this.iterateEntities((entity) => this.renderLogic(deltaTime, entity))
  }

  private iterateEntities(callback: (entity: IEntity) => void): void {
    for (const entity of this.entityList) {
      callback(entity)
    }
  }

  abstract renderLogic(deltaTime: number, entity: IEntity): void

  registerEntityByName(name: string): void {
    this.entityList.push(this.entityManager.getStrict(name))
  }
}
