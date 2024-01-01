export default interface ILogicSystem {
  registerEntityByName(name: string): void
  update(deltaTime: number): void
}
