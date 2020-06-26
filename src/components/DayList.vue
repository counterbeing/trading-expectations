<template>
  <div class="columns">
    <div class="column-1">
      <label for="bank-input">Bank</label>
      <input type="number" v-model="bank" id="bank-input" placeholder="Bank" />
      <br />

      <label for="plRatio-input">P/L Ratio</label>
      <input
        type="number"
        step="0.01"
        v-model="plRatio"
        id="plRatio-input"
        placeholder="Profit Loss Ratio"
      />
      <br />

      <label for="accuracy-input">Accuracy</label>
      <input
        type="number"
        step="0.001"
        v-model="accuracy"
        id="accuracy-input"
        placeholder="Accuracy"
      />
      <br />

      <label for="risk-input">Risk</label>
      <input type="number" step="0.001" v-model="risk" id="risk-input" placeholder="risk" />
      <br />
      <table>
        <thead>
          <tr>
            <td>amount</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(amount, i) in test" :key="`amount-${i}`">
            <td>{{amount | currency}}</td>
            <td>
              <profit-or-loss :amount="amount - test[i-1]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="column-2">
      <mini-chart :data="test"></mini-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line
import calculate from "../LogProcessor";
import ProfitOrLoss from "./micro/ProfitOrLoss.vue";
import MiniChart from "./micro/MiniChart.vue";

@Component({
  components: { ProfitOrLoss, MiniChart },
})
export default class DayList extends Vue {
  public bank = 800;
  public plRatio = 2;
  public accuracy = 0.5;
  public risk = 0.02;
  public comission = 3.95;
  public iterations = 10;
  get test(): number[] {
    return calculate(
      this.bank,
      this.plRatio,
      this.accuracy,
      this.risk,
      this.comission,
      this.iterations
    );
  }
}
</script>

<style scoped lang="scss">
.columns {
  display: flex;
}

.column-1 {
  flex: 1;
}

.column-2 {
  flex: 1;
  flex: 20%;
}

table {
  thead td {
    padding: 10px;
  }

  tr {
    &:hover {
      background-color: rgb(41, 54, 82);
    }
    cursor: pointer;
  }
  td {
    text-align: right;
    padding: 2px 10px;
  }
}
</style>
