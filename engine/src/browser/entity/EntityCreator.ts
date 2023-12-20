import { IEntityCreator, IEntityBuilder } from 'engine_api'

export default class EntityCreator implements IEntityCreator {
  private builders: Map<string, IEntityBuilder> = new Map()

  addBuilder(key: string, builder: IEntityBuilder): void {
    this.builders.set(key, builder)
  }

  private build(key: string, entityDataKey?: string, entityKey?: string): void {
    const builder = this.builders.get(key)
    if (!builder) throw new Error(`Builder with key '${key}' not found.`)
    builder.build(entityDataKey ?? key, entityKey ?? key)
  }

  createEntities() {
    this.build('map')
    this.build('object')
    this.build('spriteObject', 'object2', 'object2')
    this.build('player', 'player1', 'player1')
  }
}
