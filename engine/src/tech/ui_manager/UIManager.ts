import { IUIElement, IUIManager } from 'engine_api'

export default class UIManager implements IUIManager {
  private container: HTMLElement

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement
  }

  createButton(text: string, onClick: () => void): IUIElement {
    const button = document.createElement('button')
    button.innerText = text
    button.addEventListener('click', onClick)

    return {
      element: button,
      addToContainer: (container: HTMLElement) => {
        container.appendChild(button)
      },
    }
  }

  createTextElement(text: string): IUIElement {
    const textElement = document.createElement('p')
    textElement.innerText = text

    return {
      element: textElement,
      addToContainer: (container: HTMLElement) => {
        container.appendChild(textElement)
      },
    }
  }

  updateTextElement(text: string): void {
    // Assuming there's only one text element in the container
    const textElement = this.container.querySelector('p')
    if (textElement) {
      textElement.innerText = text
    }
  }

  clearUI(): void {
    this.container.innerHTML = '' // Clear all child elements
  }
}
