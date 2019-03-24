<template>
  <div id="app">
    <app-minesweeper></app-minesweeper>
  </div>
</template>

<script>
import AppMinesweeper from './components/app-minesweeper.vue'

export default {
  name: 'app',
  components: {
    AppMinesweeper
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
