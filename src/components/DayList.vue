<template>
  <div class="columns">
    <div class="column-1">
      <br />
      <b-field label="Number of Trades">
        <b-slider
          :min="10"
          :max="500"
          aria-label="Number of Trades"
          :tooltip="false"
          v-model="iterations"
        >
          <b-slider-tick :value="10">10</b-slider-tick>
          <b-slider-tick :value="100">100</b-slider-tick>
          <b-slider-tick :value="200">200</b-slider-tick>
          <b-slider-tick :value="300">300</b-slider-tick>
          <b-slider-tick :value="400">400</b-slider-tick>
          <b-slider-tick :value="500">500</b-slider-tick>
        </b-slider>
      </b-field>
      <b-field label="Starting Bank">
        <b-slider v-model="bank" :value="20" :min="100" :max="10000">
          <b-slider-tick :value="20">$20</b-slider-tick>
          <b-slider-tick :value="2500">$2,500</b-slider-tick>
          <b-slider-tick :value="5000">$5,000</b-slider-tick>
          <b-slider-tick :value="7500">$7,500</b-slider-tick>
          <b-slider-tick :value="10000">$10,000</b-slider-tick>
        </b-slider>
      </b-field>

      <b-field label="Accuracy">
        <b-slider v-model="accuracy" step=".001" :value="0.5" :min="0" :max="1">
          <b-slider-tick :value="0">0%</b-slider-tick>
          <b-slider-tick :value=".25">25%</b-slider-tick>
          <b-slider-tick :value=".5">50%</b-slider-tick>
          <b-slider-tick :value=".75">75%</b-slider-tick>
          <b-slider-tick :value="1">100%</b-slider-tick>
        </b-slider>
      </b-field>
      <br />

      <b-field label="Profit and Loss Ratio">
        <b-slider v-model="plRatio" step=".01" :value="2" :min="0" :max="10">
          <b-slider-tick :value="1">1:1</b-slider-tick>
          <b-slider-tick :value="2">2:1</b-slider-tick>
          <b-slider-tick :value="3">3:1</b-slider-tick>
          <b-slider-tick :value="4">4:1</b-slider-tick>
          <b-slider-tick :value="5">5:1</b-slider-tick>
          <b-slider-tick :value="6">6:1</b-slider-tick>
          <b-slider-tick :value="7">7:1</b-slider-tick>
          <b-slider-tick :value="8">8:1</b-slider-tick>
          <b-slider-tick :value="9">9:1</b-slider-tick>
          <b-slider-tick :value="10">10:1</b-slider-tick>
        </b-slider>
      </b-field>

      <b-field label="Risk">
        <b-slider v-model="risk" step=".001" :value=".02" :min="0" :max=".5">
          <b-slider-tick :value=".02">2%</b-slider-tick>
        </b-slider>
      </b-field>

      <br />
      <table>
        <thead>
          <tr>
            <td>Running Total</td>
            <td>Win or Loss</td>
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
  public iterations = 100;
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
// .columns .field .label {
//   color: white;
// }
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
