import IAnimationCallback from './IAnimationCallback'

export default interface IAnimationManager {
  animate(duration: number, callback: IAnimationCallback): void
  addAnimation(animation: IAnimationCallback): void
}
