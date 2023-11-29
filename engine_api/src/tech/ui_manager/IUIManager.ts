import IUIElement from "./IUIElement"

export default interface IUIManager {
  createButton(text: string, onClick: () => void): IUIElement
  createTextElement(text: string): IUIElement
  updateTextElement(text: string): void
  clearUI(): void
}
