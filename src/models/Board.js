import { Mine } from './Mine';
import { Cell } from './Cell';

export class Board {
  constructor (x = 6, y = 6, mines = 10) {
    this.x = x;
    this.y = y;
    this.mines = mines;

    this.remainingCellCount = this.size - mines;
    this.remainingMinesCount = mines;

    this.field = new Array(this.size);

    this.generateField();
  }

  get size() {
    return this.x * this.y;
  }

  getCell(x, y) {
    return this.field[this.getIndex(x, y)];
  }

  replaceCellByIndex(index, cell) {
    this.field[index] = cell;
  }

  getCellByIndex(index) {
    return this.field[index];
  }

  getConnectedCells(x, y) {
    return this.getConnectedCoordinates(x, y)
      .map(({ x, y }) => this.getCell(x, y));
  }

  isOnBoard(x, y) {
    return x > 0 && y > 0
      && x <= this.x && y <= this.y;
  }

  generateField() {
    this.generateCells();
    this.generateMines();
    this.calculateConnectedMines();
  }

  generateCells() {
    for (let i = 0; i < this.size; ++i) {
      this.replaceCellByIndex(i, new Cell());
    }
  }

  generateMines() {
    let minesCount = 0;

    while (minesCount < this.mines) {
      const index = Math.floor(Math.random() * this.size);
      const cell = this.getCellByIndex(index);
      if (cell.isMine) continue;

      this.replaceCellByIndex(index, new Mine());
      minesCount++;
    }
  }

  calculateConnectedMines() {
    for (let i = 0; i < this.size; ++i) {
      const { x, y } = this.getCoordinates(i);
      const connectedCells = this.getConnectedCells(x, y);
      const cell = this.getCellByIndex(i);

      cell.connectedMinesCount = connectedCells
        .reduce((connectedMinesCount, cell) => connectedMinesCount + (cell.isMine ? 1 : 0), 0);
    }
  }

  revealMines() {
    for (let cell of this.field) {
      if (cell.isMine) cell.isRevealed = true;
    }
  }

  markMines() {
    for (let cell of this.field) {
      if (cell.isMine) cell.isMarked = true;
    }

    this.remainingMinesCount = 0;
  }

  reveal(x, y) {
    const cell = this.getCell(x, y);

    if (cell.isRevealed || cell.isMarked) return;

    if (cell.isMine) {
      cell.isFinalMine = true;
      return true;
    }

    cell.isRevealed = true;
    this.remainingCellCount--;

    if (!cell.connectedMinesCount) {
      this.getConnectedCoordinates(x, y).map(({ x, y }) => this.reveal(x, y));
    }

    return false;
  }

  mark(x, y) {
    const cell = this.getCell(x, y);

    if (cell.isRevealed) return;
    cell.isMarked = !cell.isMarked;

    this.remainingMinesCount += cell.isMarked ? -1 : 1;
  }

  getIndex(x, y) {
    return this.x * (y - 1) + (x - 1);
  }

  getCoordinates(index) {
    return {
      x: (index % this.x) + 1,
      y: Math.floor(index / this.y) + 1
    };
  }

  getConnectedCoordinates(x, y) {
    return [
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 }
    ].filter(({ x, y }) => this.isOnBoard(x, y))
  }
}
