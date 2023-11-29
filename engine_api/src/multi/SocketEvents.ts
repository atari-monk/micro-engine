export const SocketEvents = {
  Connect: 'connect',
  PlayerJoined: 'player_joined',
  ChatMessage: 'chat message',
  Disconnect: 'disconnect',
  ConnectError: 'connect_error',
  GameStarts: 'game_starts',
  ClientFrame: 'client_frame',
  ServerFrame: 'server_frame',
} as const

export type SocketEvent = keyof typeof SocketEvents
