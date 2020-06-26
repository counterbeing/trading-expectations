<template>
  <table>
    <thead>
      <tr>
        <td>P/L</td>
        <td>Trades</td>
        <td>Shares</td>
        <td>Comission</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <ProfitOrLoss :amount="stats.profitAndLoss" />
        </td>
        <td>{{ stats.tradeCount }}</td>
        <td>{{ stats.sharesCount }}</td>
        <td>{{ stats.comission | currency }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProfitOrLoss from "./micro/ProfitOrLoss.vue";

@Component({
  components: { ProfitOrLoss },
})
export default class SymbolStats extends Vue {
  @Prop() private stats!: {
    tradeCount: number;
    sharesCount: number;
    profitAndLoss: number;
  };
}
</script>

<style scoped lang="scss">
table {
  thead {
    font-size: 75%;
    text-transform: uppercase;
  }
  background-color: rgb(16, 15, 15);
  color: white;
}
</style>