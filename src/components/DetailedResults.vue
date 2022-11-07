<template>
  <v-card class="rounded-lg">
    <v-card-text>
      <v-row class="px-3" justify="center">
        <v-col>
          <div>Monthly expenses</div>
          <div>yearly expenses</div>
          <div>
            shared expenses <span><v-btn>split</v-btn></span>
          </div>
        </v-col>
        <v-col>
          <div>approximate income to have this many expenses</div>
        </v-col>
        <v-col class="d-flex justify-end">
          <div style="width: 120px">
            <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        width: 150,
        height: 150,
      },
      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      chartData: {
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };
  },
};
</script>
