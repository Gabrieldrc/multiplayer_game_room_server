export default interface GameStateService {
  setGameState(room: string, gameState: any);
  getGameState(room: string);
}
