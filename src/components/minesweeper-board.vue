<template>
  <div class="minesweeper__board">
    <div class="minesweeper__row" v-for="(row, y) in rows" :key="`row-${y}`">
      <minesweeper-cell
          :cell="cell"
          v-for="(cell, x) in row"
          :key="`cell-${x}-${y}`"
          @click="reveal(x, y)"
          @right-click="mark(x, y)"></minesweeper-cell>
    </div>
  </div>
</template>

<script>
  import { Board } from '../models/Board';
  import MinesweeperCell from './minesweeper-cell';

  export default {
    name: 'minesweeper-board',
    components: { MinesweeperCell },
    props: {
      board: {
        type: Board
      }
    },
    computed: {
      rows() {
        return Array.from({ length: this.board.y })
          .map((_, y) =>
            Array.from({ length: this.board.x })
              .map((_, x) => this.board.getCell(x + 1, y + 1))
          );
      }
    },
    methods: {
      reveal(x, y) {
        this.$emit('reveal', x + 1, y + 1);
      },
      mark(x, y) {
        this.$emit('mark', x + 1, y + 1);
      }
    }
  };
</script>

<style lang="scss">
  .minesweeper__board {
    font-family: monospace;
  }

  .minesweeper__row {
    display: flex;
  }


</style>
