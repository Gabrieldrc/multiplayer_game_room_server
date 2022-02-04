import { Injectable, Logger } from '@nestjs/common';
import Chess from 'src/games/chess/chess';
import { PieceFactoryService } from 'src/games/chess/factories/piece-factory/piece-factory.service';
import { ChessGameState } from 'src/games/chess/schemas/chess-game-state.schema';
import { ChessGamesStateRepository } from 'src/games/repositories/chess-games-state-repository/chess-games-state-repository.service';

@Injectable()
export class ChessGamesStateService {
  private logger: Logger = new Logger('ChessGamesStateService');

  constructor(
    private chessStateRepository: ChessGamesStateRepository,
    private pieceFactory: PieceFactoryService,
  ) {}

  createGameState(room: string, game: Chess) {
    const state = this.chessStateRepository.createGameState({
      roomId: room,
      ...game.getState(),
    });
    if (state) {
      return true;
    }
    return false;
  }

  getGame(room: string) {
    const document = this.chessStateRepository.findGameState(room);
    if (document) {
      return this.gameStateToGameObject(document);
    }
    return null;
  }

  private gameStateToGameObject(gameState: any): Chess {
    const gameObject = new Chess(this.pieceFactory);
    gameObject.setBoard(gameState.board);
    gameObject.setTurn(gameState.turn);

    return gameObject;
  }

  updateGameState(room: string, game: Chess) {
    const state = this.chessStateRepository.updateGameState({
      roomId: room,
      ...game.getState(),
    });
    if (state) {
      return true;
    }
    return false;
  }

  deleteGameState(room: string) {
    return this.chessStateRepository.deleteGameState(room);
  }
}
