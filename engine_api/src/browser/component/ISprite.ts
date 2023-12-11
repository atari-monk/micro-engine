import IAnimationConfig from '../../tech/sprite/IAnimationConfig'
import IObject from './IObject'

export default interface ISprite {
  object: IObject
  animations: IAnimationConfig[]
}
