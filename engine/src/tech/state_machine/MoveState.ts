import { IEntity, IState } from 'engine_api'
import SpriteComponent from '../component/SpriteComponent'

export default class MoveState implements IState {
  enter(entity: IEntity): void {
    const sprite = entity.getComponentByType<SpriteComponent>(SpriteComponent)
    sprite.switchAnimation(1)
  }
  execute(entity: IEntity): void {}
  exit(entity: IEntity): void {}
}
