import IInputManager from '../../../tech/input_manager/IInputManager'
import ILogger from '../../../tech/log_manager/ILogger'
import IRendererV2 from '../../../tech/renderer/IRendererV2'
import ITileMap from '../../../tech/tile_map/ITileMap'

export interface IWithLogger {
  withLogger(logger: ILogger): this
}

export interface IWithTileMap {
  withTileMap(tileMap: ITileMap): this
}

export interface IWithRenderer {
  withRenderer(renderer: IRendererV2): this
}

export interface IWithInputManager {
  withInputManager(input: IInputManager): this
}
