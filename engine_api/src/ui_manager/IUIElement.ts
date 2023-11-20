export default interface IUIElement {
  element: HTMLElement
  addToContainer(container: HTMLElement): void
}
