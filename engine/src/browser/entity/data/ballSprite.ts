import { AnimationType, IAnimationConfig } from 'engine_api'

const ballSprite = './assets/ball.png'

const idle = {
  imagePath: ballSprite,
  frameCount: 20,
  frameDuration: 100,
  frameWidth: 80,
  frameHeight: 40,
  animationType: AnimationType.Sequential,
} as unknown as IAnimationConfig

const rotate = {
  imagePath: ballSprite,
  frameCount: 20,
  frameDuration: 100,
  frameWidth: 80,
  frameHeight: 40,
  animationType: AnimationType.Sequential,
} as unknown as IAnimationConfig

export const ballAnimations: IAnimationConfig[] = [idle, rotate]
