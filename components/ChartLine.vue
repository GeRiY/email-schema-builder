<template>
    <client-only>
      <LineChart :data="chartData" />
    </client-only>
</template>

<script>
export default {
  props: {
    measures: {
      type: Array,
      default: () => []
    }
  },
  beforeMount() {
    this.dataset = this.chartData.datasets[0].data = this.measures.sort(
      (a, b) => {
        return new Date(a.measurementTime) - new Date(b.measurementTime);
    });
    this.dataset = this.chartData.datasets[0].data = this.dataset.map(
      (item) => {
        return item.bloodGlucoseLevel;
    });
  },
  computed: {
    chartData() {
      return {
        labels: ['', '', '', '', '', '', '','', '', ''],
        datasets: [
          {
            label: 'Mérés',
            //backgroundColor: '#f87979',
            data: [],
            borderColor: '#f87979',
            //backgroundColor: null
          }
        ],
      }
    },
  },
}
</script>