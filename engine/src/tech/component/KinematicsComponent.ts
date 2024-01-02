import Component from '../entity_component/Component'

export class KinematicsComponent extends Component {
  public frictionCoefficient: number = 0
  public stopThreshold: number = 0

  constructor() {
    super('KinematicsComponent')
  }
}
