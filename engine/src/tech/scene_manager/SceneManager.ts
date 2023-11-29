import { IScene, ISceneManager } from 'engine_api'

export default class SceneManager implements ISceneManager {
  private currentScene: IScene | null = null

  loadScene(scene: IScene): void {
    this.unloadCurrentScene()
    this.currentScene = scene
    this.currentScene.start()
  }

  unloadCurrentScene(): void {
    if (this.currentScene) {
      console.log('Unloading current scene')
    }
  }
}
