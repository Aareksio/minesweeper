<template>
  <div class="minesweeper">
    <minesweeper-score :game="game" @reset="reset"></minesweeper-score>
    <minesweeper-board :board="game.board" @reveal="reveal" @mark="mark"></minesweeper-board>
  </div>
</template>

<script>
  import MinesweeperBoard from './minesweeper-board.vue';
  import MinesweeperScore from './minesweeper-score.vue';
  import { Game } from '../models/Game';

  export default {
    name: 'app-minesweeper',
    components: { MinesweeperBoard, MinesweeperScore },
    data() {
      return {
        game: new Game(9, 9)
      }
    },
    methods: {
      reveal(x, y) {
        this.game.revealCell(x, y);
      },
      mark(x, y) {
        this.game.markCell(x, y);
      },
      reset() {
        this.game.reset();
      }
    }
  };
</script>

<style lang="scss">
  .minesweeper {
    display: flex;
    flex-direction: column;
  }
</style>
