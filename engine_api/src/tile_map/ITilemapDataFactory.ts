import ITile from "./ITile"

export default interface ITilemapDataFactory {
  createTiles(): ITile[]
  createMap(): number[][]
}
