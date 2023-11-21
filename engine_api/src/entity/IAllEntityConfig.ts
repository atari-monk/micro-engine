import IMapEntityConfig from './IMapEntityConfig'
import IObjectEntityConfig from './IObjectEntityConfig'
import IPlayerEntityConfig from './IPlayerEntityConfig'

export default interface IAllEntityConfig
  extends IMapEntityConfig,
    IObjectEntityConfig,
    IPlayerEntityConfig {}
