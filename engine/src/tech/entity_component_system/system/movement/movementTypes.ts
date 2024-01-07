export type KeyAction = () => void

export type KeyActionMap = { [key: string]: KeyAction }

export const KeyEvents = {
  KeyDown: 'KeyDown',
  KeyUp: 'KeyUp',
} as const
