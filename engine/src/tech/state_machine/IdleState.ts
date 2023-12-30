import { IEntity, IState } from 'engine_api'
import SpriteComponent from '../component/SpriteComponent'

export default class IdleState implements IState {
  enter(entity: IEntity): void {
    const sprite = entity.getComponentByType<SpriteComponent>(SpriteComponent)
    sprite.switchAnimation(0)
  }
  execute(entity: IEntity): void {}
  exit(entity: IEntity): void {}
}
