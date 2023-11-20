import IVector2 from '../math/IVector2'

export default interface IParticle {
  position: IVector2
  velocity: IVector2
  size: number
  color: string
  life: number
}
