<template>
  <v-card class="rounded-lg" style="transition: 0.3sec">
    <v-card-text>
      <v-row class="px-3" justify="center" align="center">
        <v-col>
          <div class="text-center text-lg-left py-2">
            <h3>Monthly budget:</h3>
            <h2 class="pt-1" style="font-size: 1.2rem; color: black">{{ monthlyBudgetFormated }}</h2>
          </div>
          <div class="text-center text-lg-left py-2">
            <h3>Yearly budget:</h3>
            <h2 class="pt-1" style="font-size: 1.2rem; color: black">{{ yearlyBudgetFormated }}</h2>
          </div>
        </v-col>
        <v-col v-if="finishedSettingProfile">
          <h3 class="text-center">Approximate gross yearly income to have</h3>
          <div class="d-flex align-center justify-center pt-3">
            <h2 style="color: black; font-size: 1.45rem">{{ approxIncomeBudgetFormated }}</h2>
            <div v-if="diffPercentage" class="d-flex pl-2" :style="`color: ${diffPercentageColor}; font-weight: 600`">
              ({{ diffPercentage }}%)
            </div>
          </div>
        </v-col>
        <v-col class="d-flex justify-center align-center" style="flex-direction: column" v-else>
          <div class="text-center">Detailed Income is not available without completing your profile</div>
          <v-btn @click="goToProfile" color="primary" class="mt-3">Go to profile</v-btn>
        </v-col>
        <v-col class="d-flex justify-center justify-lg-end">
          <!-- <div :style="`width: ${expanded ? '250px' : '160px'}`"> -->
          <div style="width: 140px">
            <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
          </div>
        </v-col>
      </v-row>

      <!-- <div v-if="finishedSettingProfile" @click="expand" class="d-flex justify-center pt-6" style="cursor: pointer">
        <v-icon v-if="expanded" large>mdi-chevron-up</v-icon>
        <div class="d-flex justify-center" style="flex-direction: column" v-else>
          <div class="text-center">More details</div>
          <v-icon large>mdi-chevron-down</v-icon>
        </div>
      </div> -->
    </v-card-text>
  </v-card>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import { mapState } from "vuex";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
import { currencyForamter } from "../helper/functions";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user.dbUser,
    }),
    finishedSettingProfile() {
      return this.user.tax !== null && this.user.net !== null;
    },
    diffPercentageColor() {
      if (Number(this.diffPercentage) === 0) {
        return "#9E9E9E";
      } else if (Number(this.diffPercentage) > 0) {
        return "#8BC34A";
      } else {
        return "#F44336";
      }
    },
    monthlyBudgetFormated() {
      return this.currencyForamter(this.monthlyBudget ? this.monthlyBudget : 0, this.currency);
    },
    yearlyBudgetFormated() {
      return this.currencyForamter(this.yearlyBudget ? this.yearlyBudget : 0, this.currency);
    },
    approxIncomeBudgetFormated() {
      return this.currencyForamter(this.approxIncome ? this.approxIncome : 0, this.currency);
    },
  },
  components: {
    Doughnut,
  },
  props: {
    budget: Object,
    currency: String,
    monthlyBudget: Number,
    yearlyBudget: Number,
    approxIncome: Number,
    diffPercentage: String,
    sumPerMemberList: Array,
    selected: Array,
  },
  data() {
    return {
      currencyForamter,
      chartOptions: {
        responsive: true,
        width: 150,
        height: 150,
        plugins: {
          legend: false, // Hide legend
        },
      },
      expanded: false,
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    },
    setChartData() {
      const data = this.sumPerMemberList.map((el) => Number(el.amount));
      const backgroundColor = this.sumPerMemberList.map((el) => el.color);
      this.chartData.datasets = [{ backgroundColor, data }];
      this.chartData.labels = this.sumPerMemberList.map((el) => el.assignee);
    },
    goToProfile() {
      this.$router.push("/profile");
    },
  },
  mounted() {
    this.setChartData();
  },
  updated() {
    this.setChartData();
  },
  watch: {
    selected: function () {
      this.setChartData();
    },
  },
};
</script>
