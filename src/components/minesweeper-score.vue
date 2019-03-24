<template>
  <div class="minesweeper__score">
    <div class="minesweeper__statistic">
      <span class="minesweeper__statistic-value">{{ game.board.remainingMinesCount }}</span>
      <span class="minesweeper__statistic-name">Bombs</span>
    </div>

    <div class="minesweeper__reset" @click="$emit('reset')">
      <span>Reset</span>
    </div>

    <div class="minesweeper__statistic">
      <span class="minesweeper__statistic-value">{{ game.time }}</span>
      <span class="minesweeper__statistic-name">Time</span>
    </div>
  </div>
</template>

<script>
  import { Game } from '../models/Game';

  export default {
    name: 'minesweeper-score',
    props: {
      game: Game
    }
  }
</script>

<style lang="scss">
  .minesweeper__score {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }

  .minesweeper__statistic {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    align-items: center;
  }

  .minesweeper__statistic-name {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .minesweeper__statistic-value {
    font-size: 1.2rem;
  }

  .minesweeper__reset {
    display: flex;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem;
  }
</style>
