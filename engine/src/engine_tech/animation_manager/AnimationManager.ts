import { IAnimationCallback, IAnimationManager } from 'engine_api'

export default class AnimationManager implements IAnimationManager {
  private animations: IAnimationCallback[] = []

  animate(duration: number, callback: IAnimationCallback): void {
    const startTime = performance.now()

    const animateFrame = () => {
      const currentTime = performance.now()
      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        callback(progress)
        requestAnimationFrame(animateFrame)
      } else {
        callback(1)
      }
    }

    animateFrame()
  }

  addAnimation(animation: IAnimationCallback): void {
    this.animations.push(animation)
  }
}
