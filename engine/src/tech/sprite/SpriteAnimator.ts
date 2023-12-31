import { IAnimationConfig, AnimationType, IAnimationFrame } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export class SpriteAnimator {
  private image: HTMLImageElement
  private animations: IAnimationFrame[][]
  private currentAnimationIndex: number = 0
  private currentFrameIndex: number = 0
  private timeSinceLastFrame: number = 0
  private frameDurations: number[]
  private animationType: AnimationType
  private isForward: boolean = true

  constructor(private readonly animationConfigs: IAnimationConfig[]) {
    this.image = new Image()
    this.image.src = animationConfigs[0].imagePath
    this.animationType = animationConfigs[0].animationType
    this.animations = animationConfigs.map((config, index) =>
      this.createAnimationFrames(config, index)
    )
    this.frameDurations = animationConfigs.map((config) => config.frameDuration)
  }

  private createAnimationFrames(
    config: IAnimationConfig,
    animIndex: number
  ): IAnimationFrame[] {
    const frames: IAnimationFrame[] = []
    for (let i = 0; i < config.frameCount; i++) {
      frames.push({
        framePosition: new Vector2(
          i * config.frameSize.x,
          animIndex * config.frameSize.y
        ),
        frameSize: Vector2.getNew(config.frameSize),
      } as IAnimationFrame)
    }
    return frames
  }

  update(deltaTime: number) {
    switch (this.animationType) {
      case AnimationType.Cyclic:
        this.cyclic(deltaTime)
        break
      case AnimationType.Sequential:
        this.sequential(deltaTime)
        break
      default:
        break
    }
  }

  private cyclic(deltaTime: number) {
    this.timeSinceLastFrame += deltaTime

    if (
      this.timeSinceLastFrame >= this.frameDurations[this.currentAnimationIndex]
    ) {
      if (
        this.currentFrameIndex <
          this.animations[this.currentAnimationIndex].length - 1 &&
        this.isForward
      ) {
        this.currentFrameIndex++
      } else if (this.currentFrameIndex > 0 && !this.isForward) {
        this.currentFrameIndex--
      } else {
        this.isForward = !this.isForward
      }
      this.timeSinceLastFrame = 0
    }
  }

  private sequential(deltaTime: number) {
    this.timeSinceLastFrame += deltaTime

    if (
      this.timeSinceLastFrame >= this.frameDurations[this.currentAnimationIndex]
    ) {
      if (
        this.currentFrameIndex <
        this.animations[this.currentAnimationIndex].length - 1
      ) {
        this.currentFrameIndex++
      } else {
        this.currentFrameIndex = 0
      }
      this.timeSinceLastFrame = 0
    }
  }

  switchAnimation(animationIndex: number) {
    if (animationIndex >= 0 && animationIndex < this.animations.length) {
      this.currentAnimationIndex = animationIndex
      this.currentFrameIndex = 0
      this.timeSinceLastFrame = 0

      const config = this.animationConfigs[animationIndex]
      this.image.src = config.imagePath
      this.animationType = config.animationType
    }
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, isFlipped = false) {
    const currentFrame =
      this.animations[this.currentAnimationIndex][this.currentFrameIndex]

    if (isFlipped) {
      this.drawFlipped(ctx, currentFrame, x, y)
    } else {
      this.drawNormal(ctx, currentFrame, x, y)
    }
  }

  private drawNormal(
    ctx: CanvasRenderingContext2D,
    frame: IAnimationFrame,
    x: number,
    y: number
  ) {
    ctx.drawImage(
      this.image,
      frame.framePosition.x,
      frame.framePosition.y,
      frame.frameSize.x,
      frame.frameSize.y,
      x,
      y,
      frame.frameSize.x,
      frame.frameSize.y
    )
  }

  private drawFlipped(
    ctx: CanvasRenderingContext2D,
    frame: IAnimationFrame,
    x: number,
    y: number
  ) {
    ctx.save()
    ctx.translate(x + frame.frameSize.x, y)
    ctx.scale(-1, 1)
    this.drawNormal(ctx, frame, 0, 0)
    ctx.restore()
  }
}
