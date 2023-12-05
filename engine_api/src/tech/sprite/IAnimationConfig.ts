import IVector2 from '../../math/vector/IVector2'
import { AnimationType } from './AnimationType'

export default interface IAnimationConfig {
  imagePath: string
  frameSize: IVector2
  frameDuration: number
  frameCount: number
  animationType: AnimationType
}
