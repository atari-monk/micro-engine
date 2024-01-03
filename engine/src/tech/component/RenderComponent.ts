import { IAnimationConfig } from 'engine_api'
import Component from '../entity_component/Component'

export default class RenderComponent extends Component {
  public renderObject: boolean = true
  public spriteAnimation: IAnimationConfig[] = [] 

  constructor() {
    super('RenderComponent')
  }
}
