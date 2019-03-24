import { Board } from './Board';

export const GameState = {
  ACTIVE: 1,
  WON: 2,
  LOST: 3
};

export class Game {
  constructor(x = 6, y = 6, mines = 10) {
    this.options = { x, y, mines };
    this.start();
  }

  revealCell(x, y) {
    if (this.state !== GameState.ACTIVE) return;

    const isBomb = this.board.reveal(x, y);
    if (isBomb) return this.end();
    if (!this.board.remainingCellCount) this.end(true);
  }

  markCell(x, y) {
    if (this.state !== GameState.ACTIVE) return;

    this.board.mark(x, y);
  }

  end(win = false) {
    this.state = win ? GameState.WON : GameState.LOST;

    if (win) this.board.markMines();
    else this.board.revealMines();

    cancelAnimationFrame(this.nextFrame);
  }

  tick() {
    if (this.state !== GameState.ACTIVE) return;
    this.time = Math.floor((Date.now() - this.startedAt) / 1000);
    this.nextFrame = requestAnimationFrame(() => this.tick());
  }

  reset() {
    cancelAnimationFrame(this.nextFrame);
    this.start();
  }

  start() {
    this.nextFrame = null;
    this.state = GameState.ACTIVE;
    this.time = 0;
    this.startedAt = Date.now();
    this.board = new Board(this.options.x, this.options.y, this.options.mines);

    this.tick();
  }
}
