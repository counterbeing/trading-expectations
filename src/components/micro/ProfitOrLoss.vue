<template>
  <span :class="{ gain: isPositive, loss: isNegative }">{{
    amount | currency
  }}</span>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ProfitOrLoss extends Vue {
    @Prop() private amount!: number;

    get isPositive(): boolean {
      return this.amount > 0;
    }
    get isNegative(): boolean {
      return this.amount < 0;
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables.scss';
  .gain {
    color: $green;
  }
  .loss {
    color: $red;
  }
</style>
