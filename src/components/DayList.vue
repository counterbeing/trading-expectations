<template>
  <div class="columns">
    <div class="column-1">
      <div class="spaced-input">
        <b-field label="Number of Trades">
          <b-slider
            :min="10"
            :max="500"
            aria-label="Number of Trades"
            :tooltip="false"
            v-model="numberOfTrades"
          >
            <b-slider-tick :value="10">10</b-slider-tick>
            <b-slider-tick :value="100">100</b-slider-tick>
            <b-slider-tick :value="200">200</b-slider-tick>
            <b-slider-tick :value="300">300</b-slider-tick>
            <b-slider-tick :value="400">400</b-slider-tick>
            <b-slider-tick :value="500">500</b-slider-tick>
          </b-slider>
        </b-field>
      </div>

      <div class="spaced-input">
        <b-field label="Starting Bank">
          <b-slider v-model="bank" :value="20" :min="100" :max="10000">
            <b-slider-tick :value="20">$20</b-slider-tick>
            <b-slider-tick :value="2500">$2,500</b-slider-tick>
            <b-slider-tick :value="5000">$5,000</b-slider-tick>
            <b-slider-tick :value="7500">$7,500</b-slider-tick>
            <b-slider-tick :value="10000">$10,000</b-slider-tick>
          </b-slider>
        </b-field>
      </div>

      <div class="spaced-input">
        <b-field label="Accuracy">
          <b-slider v-model="accuracy" step=".001" :value="0.5" :min="0" :max="1">
            <b-slider-tick :value="0">0%</b-slider-tick>
            <b-slider-tick :value=".25">25%</b-slider-tick>
            <b-slider-tick :value=".5">50%</b-slider-tick>
            <b-slider-tick :value=".75">75%</b-slider-tick>
            <b-slider-tick :value="1">100%</b-slider-tick>
          </b-slider>
        </b-field>
      </div>

      <div class="spaced-input">
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
      </div>

      <div class="spaced-input">
        <b-field label="Risk">
          <b-slider v-model="risk" step=".001" :value=".02" :min="0" :max=".5">
            <b-slider-tick :value=".02">2%</b-slider-tick>
          </b-slider>
        </b-field>
      </div>
    </div>
    <div class="column-2">
      <TopTiles
        :bank="bank"
        :numberOfTrades="numberOfTrades"
        :plRatio="plRatio"
        :risk="risk"
        :accuracy="accuracy"
      />
      <mini-chart :data="analyze.averageResult"></mini-chart>
      <AnalysisResults :results="analyze" :iterations="iterations" :bank="bank" />
    </div>
    <div class="column-3">
      <table>
        <thead>
          <tr>
            <td>Running Total</td>
            <td>Win or Loss</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(amount, i) in analyze.averageResult" :key="`amount-${i}`">
            <td>{{ amount | currency }}</td>
            <td>
              <profit-or-loss :amount="amount - analyze.averageResult[i - 1]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line
import calculate from "../LogProcessor";
import ProfitOrLoss from "./micro/ProfitOrLoss.vue";
import MiniChart from "./micro/MiniChart.vue";
import TopTiles from "./micro/TopTiles.vue";
import { max, min, mean } from "lodash";
import { AnalysisResult } from "./types";
import AnalysisResults from "./micro/AnalysisResults.vue";

@Component({
  components: { ProfitOrLoss, MiniChart, TopTiles, AnalysisResults },
})
export default class DayList extends Vue {
  public bank = 2500;
  public plRatio = 2;
  public accuracy = 0.5;
  public risk = 0.02;
  public comission = 3.95;
  public numberOfTrades = 100;
  public iterations = 1000;

  get analyze(): AnalysisResult {
    const results = [];
    for (let i = 0; i < this.iterations; i++) {
      const result = calculate(
        this.bank,
        this.plRatio,
        this.accuracy,
        this.risk,
        this.comission,
        this.numberOfTrades
      );
      results.push({
        finish: result[result.length - 1],
        data: result,
        profitable: result[result.length - 1] > this.bank,
      });
    }
    const averageFinish = mean(results.map((r) => r.finish));
    const averageResult = results.reduce((prev, curr) =>
      Math.abs(curr.finish - averageFinish) <
      Math.abs(prev.finish - averageFinish)
        ? curr
        : prev
    );
    const percentProfitable =
      results.filter((r) => r.profitable).length / this.iterations;
    return {
      blowUps: results.filter((r) => r.finish == 0).length,
      max: max(results.map((r) => r.finish)) || 0,
      min: min(results.map((r) => r.finish)) || 0,
      averageFinish,
      averageResult: averageResult.data,
      percentProfitable,
    };
  }
}
</script>

<style scoped lang="scss">
.spaced-input {
  padding: 30px 0;
}
.columns {
  display: flex;
}

.column-1 {
  flex: 1;
  padding: 50px;
  flex: 30%;
}

.column-2 {
  padding: 50px;
  flex: 1;
  flex: 60%;
}

.column-3 {
  // padding: 50px;
  flex: 1;
  flex: 10%;

  display: flex;
  table {
    margin-top: 40px;
    flex: 1;
  }
}

table {
  thead td {
    padding: 10px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
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
