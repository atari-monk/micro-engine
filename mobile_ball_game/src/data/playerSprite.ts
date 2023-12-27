import { Vector2 } from 'engine'
import { AnimationType, IAnimationConfig } from 'engine_api'

const redSprite = './assets/red-player.png'
const blueSprite = './assets/blue-player.png'

const idle: IAnimationConfig = {
  imagePath: redSprite,
  frameCount: 20,
  frameDuration: 0.05,
  frameSize: new Vector2(80, 160),
  animationType: AnimationType.Sequential,
}

const walk: IAnimationConfig = {
  imagePath: redSprite,
  frameCount: 17,
  frameDuration: 0.05,
  frameSize: new Vector2(80, 160),
  animationType: AnimationType.Sequential,
}

export const redPlayerAnimations: IAnimationConfig[] = [idle, walk]

export const bluePlayerAnimations: IAnimationConfig[] = [
  { ...idle, imagePath: blueSprite },
  { ...walk, imagePath: blueSprite },
]
