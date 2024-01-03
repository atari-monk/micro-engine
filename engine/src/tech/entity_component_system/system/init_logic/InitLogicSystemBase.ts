import { IEntity, IEntityManager } from 'engine_api'
import IInitLogicSystem from './IInitLogicSystem'

export default abstract class InitLogicSystemBase implements IInitLogicSystem {
  protected entityList: IEntity[] = []

  constructor(protected readonly entityManager: IEntityManager) {}

  init(): void {
    this.iterateEntities((entity) => this.initLogic(entity))
  }

  private iterateEntities(callback: (entity: IEntity) => void): void {
    for (const entity of this.entityList) {
      callback(entity)
    }
  }

  abstract initLogic(entity: IEntity): void

  registerEntityByName(name: string): void {
    this.entityList.push(this.entityManager.getStrict(name))
  }
}
