<template>
  <span :class="{ buy: isBuy, sell: isSell }">{{ action }}</span>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({})
  export default class BuySell extends Vue {
    @Prop() private action!: 'Buy' | 'Sell';

    get isBuy(): boolean {
      return this.action == 'Buy';
    }
    get isSell(): boolean {
      return this.action == 'Sell';
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables.scss';
  .buy {
    color: $green;
  }
  .sell {
    color: $red;
  }
</style>
