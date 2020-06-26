<template>
  <div id="app">
    <DayList />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import DayList from './components/DayList.vue';

  @Component({
    components: {
      DayList,
    },
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #acc7e1;
  }
  html,
  body {
    background-color: rgb(30, 39, 46);
    padding: 0;
    margin: 0;
  }
</style>
