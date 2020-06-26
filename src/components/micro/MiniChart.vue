<template>
  <div class="mini-chart">
    <!-- <pre>{{ JSON.stringify(data) }}</pre> -->
    <apexchart width="100%" height="400" type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class MiniChart extends Vue {
  @Prop() private data!: number[];
  chartOptions: any = {};

  get series(): any {
    return [
      {
        name: "Earnings",
        data: this.data,
      },
    ];
  }

  @Watch("data")
  onPropertyChanged(): void {
    this.chartOptions = {
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        // enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },

      yaxis: {
        labels: {
          // show: false,
          formatter: function (value: number): string {
            return "$" + value;
          },
        },
      },

      chart: {
        id: "vuechart-example",

        toolbar: {
          show: false,
        },
      },
    };
  }
}
</script>

<style scoped lang="scss">
pre {
  display: none;
  background: black;
  width: 100%;
  padding: 10px;
}
</style>
