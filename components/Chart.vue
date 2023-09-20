<template>
    <client-only>
      <RadarChart :data="chartData" />
    </client-only>
</template>

<script>
export default {
  computed: {
    chartData() {
      return {
        labels: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
        responsive: true,
        maintainAspectRatio: false,
        datasets: [
          {
            label: 'mérés',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [6.5,7,5.5,6.7,7.5,8,9]
          },
          {
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [1]
          },
        ]
      }
    },
  },
}
</script>