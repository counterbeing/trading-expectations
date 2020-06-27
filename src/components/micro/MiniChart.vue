<template>
  <div class="mini-chart">
    <!-- <pre>{{ JSON.stringify(data) }}</pre> -->
    <apexchart width="100%" height="600" type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class MiniChart extends Vue {
  @Prop() private data!: number[];
  chartOptions: any = {
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
      forceNiceScale: true,
      min: 0,
      labels: {
        // show: false,
        formatter: function (value: number): string {
          return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
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

  get series(): any {
    return [
      {
        name: "Earnings",
        data: this.data,
      },
    ];
  }
}
</script>

<style scoped lang="scss">
.mini-chart {
  background-color: rgb(1, 1, 1, 0.1);
  margin: 40px 0;
  border-radius: 10px;
}
pre {
  display: none;
  background: black;
  width: 100%;
  padding: 10px;
}
</style>
