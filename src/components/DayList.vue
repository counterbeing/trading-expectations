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
          <b-slider
            v-model="accuracy"
            step=".001"
            :value="0.5"
            :min="0"
            :max="1"
          >
            <b-slider-tick :value="0">0%</b-slider-tick>
            <b-slider-tick :value="0.25">25%</b-slider-tick>
            <b-slider-tick :value="0.5">50%</b-slider-tick>
            <b-slider-tick :value="0.75">75%</b-slider-tick>
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
          <b-slider
            v-model="risk"
            step=".001"
            :value="0.02"
            :min="0"
            :max="0.5"
          >
            <b-slider-tick :value="0.02">2%</b-slider-tick>
          </b-slider>
        </b-field>
      </div>
      <div class="about">
        <h1>Expectationometer</h1>
        <p>
          The basics of day trading make it a numbers game. In simplest terms,
          you run a number of trades, and try to have your wins end up larger
          than your losses. Here is
          <a href="https://www.youtube.com/watch?v=MGglyvc8d58">
            a good explanation
          </a>
          of how it works.
        </p>
        <p>
          This tool is not designed to tell you how much you will make, or even
          how much you can make. It's much too simple for that and doesn't take
          many things into account. But what it can tell you what
          <b>absolutely will not work</b>.
        </p>

        <h2>Instructions</h2>
        <ul>
          <li>Set any values you already know</li>
          <li>Set reasonable targets for other values</li>
          <li>Determine if your setup is incapable of making money</li>
          <li>
            Adjust values to see what your goals should be for making money
          </li>
        </ul>

        <h2>How it Works</h2>
        <p>
          After you've entered all of your variables, a virtual weighted coin is
          tossed for each of your specified trades. The outcome of this coin
          toss determines if money will be taken from or added to your bank
          account, multiplied by your profit and loss ratio. This is run 1000
          times to ensure you're not just being shown the one out of 1000 result
          that doesn't reflect what is likely to happen.
        </p>
        <p>
          Once we have a thousand sets of result we pick an average one. We also
          look for the maximums and minimums. And also determine how likely this
          approach is to blow up an account.
        </p>

        <h2>Disclaimer</h2>
        <p>
          This is not trading advice, and should't be taken as such. Just
          something to potentially warn you that you'll likely flop, if you're
          thinking of getting into the market with a small account. I'm also not
          sure if this information is accurate, if you think not, please let me
          know.
          <a href="mailto:he@corylogan.com">he@corylogan.com</a>
        </p>
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
      <AnalysisResults
        :results="analyze"
        :iterations="iterations"
        :bank="bank"
      />
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
  import { Component, Vue } from 'vue-property-decorator';
  // eslint-disable-next-line
  import calculate from '../TradeGenerator';
  import ProfitOrLoss from './micro/ProfitOrLoss.vue';
  import MiniChart from './micro/MiniChart.vue';
  import TopTiles from './micro/TopTiles.vue';
  import { max, min, mean } from 'lodash';
  import { AnalysisResult } from './types';
  import AnalysisResults from './micro/AnalysisResults.vue';

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
          this.numberOfTrades,
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
          : prev,
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
    height: 100vh;
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

  .about {
    h1 {
      font-size: 40px;
    }

    h2 {
      padding-top: 10px;
      font-size: 20px;
      text-align: left;
    }
    p {
      text-align: left;
      margin: 10px 0;
    }
    ul {
      text-align: left;
      list-style-type: decimal-leading-zero;
    }
  }
</style>
