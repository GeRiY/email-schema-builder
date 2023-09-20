<template>
  <v-card>
    <v-card-title>
      <span>{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-card
          v-for="(glucose, glucoseIndex) in showMeasures"
          :key="glucoseIndex"
          class="glucose-measure"
      >
        <span>{{ glucose.measurementTime }}</span>
        <span>
                {{ glucose.bloodGlucoseLevel }}
                <v-icon color="red">mdi-water</v-icon>
              </span>
      </v-card>
      <div v-if="filteredMeasures.length" style="display: flex;justify-content: space-between">
        <v-btn color="#f8bbd0"
               style="color: white"
               @click="addShowMeasuresCount(false)">
          Még több
        </v-btn>
        <v-btn color="#f8bbd0"
               style="color: white"
               @click="addShowMeasuresCount"
        >
          Alaphelyzet
        </v-btn>
      </div>
      <div v-else>
        <span>Nincs megjeleníthető adat</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "index",
  setup() {
    return {
      moment
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    measures: {
      type: Array,
      default: () => []
    },
    defaultShowCount: {
      type: Number,
      default: 3
    },
    fromHour: {
      type: Number,
      default: null
    },
    toHour: {
      type: Number,
      default: null
    }
  },
  beforeMount() {
    if (this.defaultShowCount) {
      this.showMeasuresCount = this.defaultShowCount;
    } else {
      this.showMeasuresCount = 3;
    }
  },
  data() {
    return {
      showMeasuresCount: 0,
    }
  },
  methods: {
    addShowMeasuresCount(toDefault = true) {
      if (!toDefault) {
        this.showMeasuresCount += 3;
      } else {
        this.showMeasuresCount = this.defaultShowCount ? this.defaultShowCount : 3;
      }
    },
    convertTimeFormat(array, key, format) {
      if (Array.isArray(array) && key && format) {
        return array.map((item) => {
          item[key] = moment(item[key]).format(format);
          return item;
        });
      }
      return []
    },
  },
  computed: {
    filteredMeasures() {
      return this.convertTimeFormat(this.measures, 'measurementTime', 'YYYY-MM-DD HH:mm').filter(measure => {
        const measureTime = moment(measure.measurementTime, 'YYYY-MM-DD HH:mm');
        if (this.fromHour && this.toHour) {
          return measureTime.isBetween(moment(measureTime).startOf('day').add(this.fromHour, 'hours'), moment().startOf('day').add(this.toHour, 'hours'));
        } else if (this.fromHour) {
          return measureTime.isAfter(moment(measureTime).startOf('day').add(this.fromHour, 'hours'));
        } else if (this.toHour) {
          return measureTime.isBefore(moment(measureTime).startOf('day').add(this.toHour, 'hours'));
        } else {
          return true;
        }
      });
    },
    showMeasures() {
      return this.filteredMeasures.slice(0, this.showMeasuresCount);
    }
  }
}
</script>

<style scoped>
.glucose-measure {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  width: 150%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.glucose-measure span {
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}
</style>