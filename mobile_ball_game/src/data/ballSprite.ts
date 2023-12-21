import { AnimationType, IAnimationConfig } from 'engine_api'
import { Vector2 } from 'engine'

const ballSprite = './assets/ball.png'

const idle: IAnimationConfig = {
  imagePath: ballSprite,
  frameCount: 20,
  frameDuration: 100,
  frameSize: new Vector2(80, 40),
  animationType: AnimationType.Sequential,
}

const rotate: IAnimationConfig = {
  imagePath: ballSprite,
  frameCount: 20,
  frameDuration: 0.05,
  frameSize: new Vector2(80, 40),
  animationType: AnimationType.Sequential,
}

export const ballAnimations: IAnimationConfig[] = [idle, rotate]
