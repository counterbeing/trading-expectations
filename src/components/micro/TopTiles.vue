<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-12">
      <div class="tile">
        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification" :class="bankStatus">
            <p class="title">{{bank | currency}}</p>
            <p class="subtitle">Starting Bank</p>
          </article>

          <article class="tile is-child notification" :class="accuracyStatus">
            <p class="title">{{accuracy}}</p>
            <p class="subtitle">Accuracy</p>
          </article>
        </div>
        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification" :class="plStatus">
            <p class="title">{{plRatio}} to 1</p>
            <p class="subtitle">Profit and Loss Ratio</p>
          </article>
          <article class="tile is-child notification" :class="riskStatus">
            <p class="title">{{risk}}</p>
            <p class="subtitle">Risk per Trade</p>
          </article>
        </div>

        <div class="tile is-parent is-vertical is-4">
          <article class="tile is-child notification is-info">
            <p class="title">{{iterations}}</p>
            <p class="subtitle">Number of Trades</p>
          </article>
          <article class="tile is-child notification is-info">
            <p class="title">{{ 3.95 | currency }}</p>
            <p class="subtitle">Commission per Trade</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class TopTiles extends Vue {
  @Prop() private bank!: number;
  @Prop() private iterations!: number;
  @Prop() private plRatio!: number;
  @Prop() private risk!: number;
  @Prop() private accuracy!: number;

  get bankStatus(): string {
    if (this.bank < 1000) return "is-danger";
    if (this.bank < 5000) return "is-warning";
    return "is-success";
  }

  get plStatus(): string {
    if (this.plRatio < 1) return "is-danger";
    if (this.plRatio < 2) return "is-warning";
    return "is-success";
  }

  get accuracyStatus(): string {
    if (this.accuracy < 0.5) return "is-danger";
    if (this.accuracy < 0.6) return "is-warning";
    return "is-success";
  }

  get riskStatus(): string {
    if (this.risk > 0.05) return "is-danger";
    if (this.risk > 0.02) return "is-warning";
    return "is-success";
  }
}
</script>


