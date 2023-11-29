import IScene from "./IScene"

export default interface ISceneManager {
  loadScene(scene: IScene): void
  unloadCurrentScene(): void
}
