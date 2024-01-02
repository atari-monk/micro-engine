import { IEntity, IEntityManager } from 'engine_api'
import ILogicSystem from './ILogicSystem'

export default abstract class LogicSystemBase implements ILogicSystem {
  protected entityList: IEntity[] = []

  constructor(protected readonly entityManager: IEntityManager) {}

  update(deltaTime: number): void {
    this.iterateEntities((entity) => this.updateLogic(deltaTime, entity))
  }

  private iterateEntities(callback: (entity: IEntity) => void): void {
    for (const entity of this.entityList) {
      callback(entity)
    }
  }

  abstract updateLogic(deltaTime: number, entity: IEntity): void

  registerEntityByName(name: string): void {
    this.entityList.push(this.entityManager.getStrict(name))
  }
}
