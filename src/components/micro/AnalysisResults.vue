<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-12">
      <div class="tile">
        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification" :class="blowUpStatus">
            <p class="title">{{results.blowUps / iterations | percent}}</p>
            <p class="subtitle">Percent Blown Up</p>
          </article>

          <article class="tile is-child notification" :class="blowUpStatus">
            <p class="title"></p>
            <p class="subtitle">Percent Profitable</p>
          </article>
        </div>
        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification" :class="averageGainsStatus">
            <p class="title">{{averageGains | currency}}</p>
            <p class="subtitle">Average Gains</p>
          </article>
          <article class="tile is-child notification" :class="maxGainsStatus">
            <p class="title">{{ maxGains| currency}}</p>
            <p class="subtitle">Maximum Gains</p>
          </article>
          <article class="tile is-child notification" :class="minGainsStatus">
            <p class="title">{{ minGains| currency}}</p>
            <p class="subtitle">Minimum Gains</p>
          </article>
        </div>

        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification is-info">
            <p class="title"></p>
            <p class="subtitle">Number of Trades</p>
          </article>
          <article class="tile is-child notification is-info">
            <p class="title"></p>
            <p class="subtitle">Commission per Trade</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { AnalysisResult } from "../types";

@Component({})
export default class AnalysisResults extends Vue {
  @Prop() private results!: AnalysisResult;
  @Prop() private iterations!: number;
  @Prop() private bank!: number;

  get blowUpStatus(): string {
    if (this.results.blowUps > 10) return "is-danger";
    if (this.results.blowUps > 2) return "is-warning";
    return "is-success";
  }

  get averageGains(): number {
    return this.results.averageFinish - this.bank;
  }
  get averageGainsStatus(): string {
    if (this.averageGains <= 0) return "is-danger";
    if (this.averageGains < this.bank) return "is-warning";
    return "is-success";
  }

  get maxGains(): number {
    return this.results.max - this.bank;
  }
  get maxGainsStatus(): string {
    if (this.maxGains <= 0) return "is-danger";
    if (this.maxGains < this.bank) return "is-warning";
    return "is-success";
  }

  get minGains(): number {
    return this.results.min - this.bank;
  }
  get minGainsStatus(): string {
    if (this.minGains <= 0) return "is-danger";
    if (this.minGains < this.bank) return "is-warning";
    return "is-success";
  }
}
</script>


