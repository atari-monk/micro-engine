export const SocketEvents = {
  Connect: 'connect',
  PlayerJoined: 'player_joined',
  ChatMessage: 'chat message',
  Disconnect: 'disconnect',
  ConnectError: 'connect_error',
  GameStarts: 'game_starts',
  GameDataFrame: 'game_data_frame',
} as const

export type SocketEvent = keyof typeof SocketEvents
