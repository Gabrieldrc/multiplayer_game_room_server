export default interface GameStateRepository {
  createGameState(room: string, gameState: any);
  findGameState(room: string);
  updateGameState(gameStateModel: any, gameState: any);
  deleteGameState(room: string);
}
