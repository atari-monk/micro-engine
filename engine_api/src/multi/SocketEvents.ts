export const SocketEvents = {
  Connect: 'connect',
  ChatMessage: 'chat message',
  Disconnect: 'disconnect',
  ConnectError: 'connect_error',
  GameDataFrame: 'game_data_frame',
} as const

export type SocketEvent = keyof typeof SocketEvents
