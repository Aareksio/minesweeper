<template>
  <div class="minesweeper__cell" :class="classList" @click="$emit('click')" @contextmenu.prevent="$emit('right-click')">
    <img class="minesweeper__cell-bomb" src="../assets/bomb.png" alt="+" v-if="cell.isRevealed && cell.isMine">

    <img class="minesweeper__cell-flag" src="../assets/flag.png" alt="?" v-else-if="cell.isMarked">

    <span class="minesweeper__cell-value" :class="`minesweeper__cell-value--${cell.connectedMinesCount}`" v-else-if="cell.isRevealed && cell.connectedMinesCount">
      {{ cell.connectedMinesCount }}
    </span>
  </div>
</template>

<script>
  import { Cell } from '../models/Cell';

  export default {
    name: 'minesweeper-cell',
    props: {
      cell: {
        type: Cell
      }
    },
    computed: {
      classList() {
        const classList = [];

        if (this.cell.isRevealed && this.cell.isMine) classList.push('minesweeper__cell--is-mine');
        if (this.cell.isRevealed && this.cell.isMine && this.cell.isFinalMine) classList.push('minesweeper__cell--is-final-mine');
        if (this.cell.isMarked) classList.push('minesweeper__cell--is-marked');
        if (this.cell.isRevealed) classList.push('minesweeper__cell--is-revealed');

        return classList;
      }
    }
  }
</script>

<style lang="scss">
  .minesweeper__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    background: #e3e3e3;
    cursor: pointer;
    border: 1px solid #e9e9e9;
    line-height: 1;

    &:hover {
      background: #f6f6f6;
    }

    &--is-revealed {
      background: #d3d3d3;
    }

    &--is-marked, &--is-mine {
      font-weight: bold;
      font-size: 1.2rem;
    }

    &--is-mine {
      > img {
      }

      &.minesweeper__cell--is-marked {
        background: #90e78e;
      }
    }

    &--is-final-mine {
      background: #e78d7b;
    }
  }

  .minesweeper__cell-bomb {
    width: 0.8rem;
    height: 0.8rem;
  }

  .minesweeper__cell-flag {
    height: 1rem;
  }

  .minesweeper__cell-value {
    font-weight: bold;
    font-size: 1rem;

    &--1 {
      color: #3a8669;
    }

    &--2 {
      color: #b48648;
    }

    &--3 {
      color: #d55d5d;
    }

    &--4 {
      color: #161f96;
    }

    &--5 {
      color: #973881;
    }

    &--6 {
      color: #31b1a8;
    }

    &--7 {
      color: #324008;
    }

    &--8 {
      color: #878780;
    }
  }
</style>
