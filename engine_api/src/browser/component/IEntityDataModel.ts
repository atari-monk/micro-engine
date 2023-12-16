import IAnimationConfig from '../../tech/sprite/IAnimationConfig'
import IObject from './IObject'

export default interface IEntityDataModel {
  object: IObject
  animations: IAnimationConfig[]
}
