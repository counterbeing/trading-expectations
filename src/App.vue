<template>
  <div id="app">
    <DayList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DayList from "./components/DayList.vue";

@Component({
  components: {
    DayList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: green;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $white,
    $white,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$slider-track-background: red;
@import "~bulma";
@import "~buefy/src/scss/buefy";
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
