import { IParticleSystem, IParticle, IVector2 } from 'engine_api'

export default class ParticleSystem implements IParticleSystem {
  private particles: IParticle[] = []

  createParticle(
    position: IVector2,
    velocity: IVector2,
    size: number,
    color: string,
    life: number
  ): void {
    const particle: IParticle = {
      position,
      velocity,
      size,
      color,
      life,
    }
    this.particles.push(particle)
  }

  updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i]

      // Update particle position based on velocity
      particle.position = particle.position.add(particle.velocity)

      // Reduce particle life
      particle.life--

      if (particle.life <= 0) {
        // Remove dead particles
        this.particles.splice(i, 1)
      }
    }
  }

  renderParticles(context: CanvasRenderingContext2D): void {
    for (const particle of this.particles) {
      // Render each particle
      context.fillStyle = particle.color
      context.beginPath()
      context.arc(
        particle.position.x,
        particle.position.y,
        particle.size,
        0,
        Math.PI * 2
      )
      context.fill()
    }
  }
}
