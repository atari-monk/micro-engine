import { IEntityCreator, IEntityBuilder } from 'engine_api'

export default class EntityCreator implements IEntityCreator {
  private builders: Map<string, IEntityBuilder> = new Map()

  addBuilder(key: string, builder: IEntityBuilder): void {
    this.builders.set(key, builder)
  }

  protected build(
    key: string,
    entityDataKey?: string,
    entityKey?: string
  ): void {
    const builder = this.builders.get(key)
    if (!builder) throw new Error(`Builder with key '${key}' not found.`)
    builder.build(entityDataKey ?? key, entityKey ?? key)
  }

  createEntities() {
    this.build('map', '', 'map1')
    this.build('object', 'object1', 'object1')
    this.build('object', 'object2', 'object2')
    this.build('spriteObject', 'object3', 'object3')
    this.build('player', 'player1', 'player1')
  }
}
