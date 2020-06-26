<template>
  <div class="columns">
    <div class="column-1">
      <br />
      <b-field label="Number of Trades">
        <b-slider
          :min="10"
          :max="10000"
          aria-label="Number of Trades"
          :tooltip="false"
          v-model="iterations"
        >
          <b-slider-tick :value="10">10</b-slider-tick>
          <b-slider-tick :value="100">100</b-slider-tick>
          <b-slider-tick :value="500">500</b-slider-tick>
          <b-slider-tick :value="1000">1000</b-slider-tick>
          <b-slider-tick :value="5000">5000</b-slider-tick>
        </b-slider>
      </b-field>
      <b-field label="Starting Bank">
        <b-slider v-model="bank" size="is-large" :value="20" :min="100" :max="10000"></b-slider>
      </b-field>

      <b-field label="Accurachy">
        <b-slider v-model="accuracy" size="is-large" step=".001" :value="0.5" :min="0" :max="1"></b-slider>
      </b-field>
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
            <td>{{ amount | currency }}</td>
            <td>
              <profit-or-loss :amount="amount - test[i - 1]" />
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
  padding: 50px;
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
