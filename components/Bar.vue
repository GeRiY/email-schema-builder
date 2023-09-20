<template>
  <v-card class="pa-2 mt-5">
    <div class="diagram">
      <div class="leftSide">
        <div>1</div>
        <div>5</div>
        <div>10</div>
        <div>15</div>
      </div>
      <div
          class="column"
          :style="`height: ${column.height}px`"
          v-for="(column, index) in dataset"
          :key="`${index}-column`"
      >
        {{ column.measure }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    measures: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  beforeMount() {
    this.measures.forEach((measure) => {
      this.dataset.push({measure,height: this.mapMeasureToHeight(measure)})
    })
  },
  data() {
    return {
      dataset: []
    }
  },
  methods: {
    mapMeasureToHeight(measure) {
      const minMeasure = 1.0;
      const maxMeasure = 15.0;
      const minHeight = 1;
      const maxHeight = 125;

      // Calculate the percentage of the measure relative to the scale range
      const percentage = ((measure - minMeasure) / (maxMeasure - minMeasure)) * 100;

      // Calculate the height based on the percentage and the height range
      const height = (percentage / 100) * (maxHeight - minHeight) + minHeight;

      return Math.round(height); // Round to the nearest whole number
    }
  }
}
</script>

<style>
.diagram {
  border: 0.5px solid grey;
  padding: 10px;
  display: flex;
  gap: 1px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
}

.diagram:first-child {
  gap: 10px!important;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  background-color: #f87979;
  border-radius: 5px;
  color: white;
}

.leftSide {
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  justify-content: center;
  border-right: 0.5px solid grey;
  height: 100%;
  width: 10%;
}
</style>
