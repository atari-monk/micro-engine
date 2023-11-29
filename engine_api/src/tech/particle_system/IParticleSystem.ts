import IVector2 from '../../math/vector/IImmutableVector2'

export default interface IParticleSystem {
  createParticle(
    position: IVector2,
    velocity: IVector2,
    size: number,
    color: string,
    life: number
  ): void
  updateParticles(): void
  renderParticles(context: CanvasRenderingContext2D): void
}
