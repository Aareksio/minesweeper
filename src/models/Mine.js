import { Cell } from './Cell';

export class Mine extends Cell {
  constructor() {
    super();
    this.isMine = true;
    this.isFinalMine = false;
  }
}
