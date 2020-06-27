<template>
  <div class="mini-chart">
    <!-- <pre>{{ JSON.stringify(data) }}</pre> -->
    <apexchart width="100%" height="600" type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class MiniChart extends Vue {
  @Prop() private data!: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartOptions: any = {
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },

    annotations: {
      yaxis: [
        {
          y: this.data[0],
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "Starting Bank",
          },
        },
      ],
    },
    yaxis: {
      forceNiceScale: true,
      min: 0,
      labels: {
        // show: false,
        formatter: function (value: number): string {
          return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
        },
        style: {
          colors: "white",
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
