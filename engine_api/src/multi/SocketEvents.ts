export const SocketEvents = {
  Connect: 'connect',
  ChatMessage: 'chat message',
  Disconnect: 'disconnect',
  ConnectError: 'connect_error',
} as const

export type SocketEvent = keyof typeof SocketEvents
