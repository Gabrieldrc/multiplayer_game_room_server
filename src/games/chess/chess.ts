import { PieceFactoryService } from './factories/piece-factory/piece-factory.service';
import ChessPieceAbstract from './classes/chess-piece-abstract';

export default class Chess {
  private pieceFactory: PieceFactoryService;
  private turn: number;
  private board: ChessPieceAbstract[][];
  private players: string[];

  constructor(pieceFactory: PieceFactoryService) {
    this.turn = Math.floor(Math.random() * 2 + 1);
    this.board = [];
    this.pieceFactory = pieceFactory;
    this.players = [];
  }

  newGame() {
    const board: ChessPieceAbstract[][] = [];
    const boardLength = 8;
    for (let i = 0; i < boardLength; i++) {
      board.push([]);
      for (let j = 0; j < boardLength; j++) {
        if (i === 0) {
          if (j === 0 || j === boardLength - 1) {
            board[i].push(this.getPieceFactory().getPiece('ROOK', 2, i, j));
          } else if (j === 1 || j === boardLength - 2) {
            // Caballo
            board[i].push(this.getPieceFactory().getPiece('KNIGHT', 2, i, j));
          } else if (j === 2 || j === boardLength - 3) {
            // Alfil
            board[i].push(this.getPieceFactory().getPiece('BISHOP', 2, i, j));
          } else if (j === 3) {
            // Rey
            board[i].push(this.getPieceFactory().getPiece('KING', 2, i, j));
          } else if (j === 4) {
            // Reina
            board[i].push(this.getPieceFactory().getPiece('QUEEN', 2, i, j));
          } else {
            board[i].push(this.getPieceFactory().getPiece());
          }
        } else if (i === 1) {
          board[i].push(this.getPieceFactory().getPiece('PAWN', 2, i, j));
        } else if (i === boardLength - 2) {
          board[i].push(this.getPieceFactory().getPiece('PAWN', 1, i, j));
        } else if (i === boardLength - 1) {
          if (j === 0 || j === boardLength - 1) {
            board[i].push(this.getPieceFactory().getPiece('ROOK', 1, i, j));
          } else if (j === 1 || j === boardLength - 2) {
            // Caballo
            board[i].push(this.getPieceFactory().getPiece('KNIGHT', 1, i, j));
          } else if (j === 2 || j === boardLength - 3) {
            // Alfil
            board[i].push(this.getPieceFactory().getPiece('BISHOP', 1, i, j));
          } else if (j === 3) {
            // Rey
            board[i].push(this.getPieceFactory().getPiece('KING', 1, i, j));
          } else if (j === 4) {
            // Reina
            board[i].push(this.getPieceFactory().getPiece('QUEEN', 1, i, j));
          } else {
            board[i].push(this.getPieceFactory().getPiece());
          }
        } else {
          board[i].push(this.getPieceFactory().getPiece());
        }
      }
    }
    this.setBoard(board);
  }

  move(x1: number, y1: number, x2: number, y2: number) {
    if (this.getTurn() !== this.getBoard()[x1][y1].getPlayer()) {
      return false;
    }
    if (this.getBoard()[x1][y1].canMove(this.getBoard(), x2, y2)) {
      this.getBoard()[x1][y1].move(x2, y2);
      this.getBoard()[x2][y2] = this.getBoard()[x1][y1];
      this.getBoard()[x1][y1] = this.getPieceFactory().getPiece();
      this.setTurn(this.getTurn() === 1 ? 2 : 1);

      return true;
    }
    return false;
  }

  getBoardData() {
    const data: any[] = [];
    for (let i = 0; i < this.getBoard().length; i++) {
      data.push([]);
      for (let j = 0; j < this.getBoard()[i].length; j++) {
        data[i].push(this.getBoard()[i][j].getData(this.getBoard()));
      }
    }
    return {
      turn: this.turn,
      board: data,
    };
  }

  getState() {
    const data: any[] = [];
    for (let i = 0; i < this.getBoard().length; i++) {
      data.push([]);
      for (let j = 0; j < this.getBoard()[i].length; j++) {
        data[i].push(this.getBoard()[i][j].getModel());
      }
    }
    return {
      turn: this.getTurn(),
      board: data,
      players: this.getPlayers(),
    };
  }

  getWinner() {
    const kings = [];
    let winner = 0;
    for (let i = 0; i < this.getBoard().length; i++) {
      for (let j = 0; j < this.getBoard()[i].length; j++) {
        if (this.getBoard()[i][j].getName() === 'king') {
          kings.push(this.board[i][j]);
        }
      }
    }
    if (kings.length === 1) {
      winner = kings[0].getPlayer();
    }
    return winner;
  }

  getTurn(): number {
    return this.turn;
  }

  setTurn(value: number) {
    this.turn = value;
  }

  getBoard(): ChessPieceAbstract[][] {
    return this.board;
  }

  setBoard(value: ChessPieceAbstract[][]) {
    this.board = value;
  }

  getPieceFactory(): PieceFactoryService {
    return this.pieceFactory;
  }

  setPieceFactory(value: PieceFactoryService) {
    this.pieceFactory = value;
  }

  setPlayers(players: string[]) {
    if (players.length <= 2) {
      this.players = players;

      return true;
    }

    return false;
  }

  getPlayers(): string[] {
    return this.players;
  }

  addPlayer(player: string) {
    if (
      this.getPlayers().length < 2 &&
      this.getPlayers().indexOf(player) == -1
    ) {
      this.setPlayers([...this.getPlayers(), player]);

      return true;
    }

    return false;
  }
}
