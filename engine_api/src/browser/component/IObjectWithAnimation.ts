import IAnimationConfig from '../../tech/sprite/IAnimationConfig'
import IObject from './IObject'

export interface IObjectWithAnimation {
  object: IObject
  animations: IAnimationConfig[]
}
