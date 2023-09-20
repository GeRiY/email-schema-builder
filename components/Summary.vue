<template>
  <v-container>
    <v-row
        class="mt-2 list-measurements"
    >
      <!-- <v-col cols="12">
        <Chart />
      </v-col> -->
      <v-col cols="12">
        <div style="display: flex;justify-content: center;gap:10px">
          <v-btn
              :color="$store.state.appStore.listViewSettings.morning ? 'primary' : 'light'"
              @click="$store.commit('appStore/changeListViewSettings', {key: 'morning', value: !$store.state.appStore.listViewSettings.morning})"
          >
            Reggeli
          </v-btn>
          <v-btn
              :color="$store.state.appStore.listViewSettings.daily ? 'primary' : 'light'"
              @click="$store.commit('appStore/changeListViewSettings', {key: 'daily', value: !$store.state.appStore.listViewSettings.daily})"
          >
            Nappali
          </v-btn>
          <v-btn
              :color="$store.state.appStore.listViewSettings.night ? 'primary' : 'light'"
              @click="$store.commit('appStore/changeListViewSettings', {key: 'night', value: !$store.state.appStore.listViewSettings.night})"
          >
            Esti
          </v-btn>
          <v-btn
              :disabled="!glucoseMeasuresAtMorning.length"
              :color="$store.state.appStore.listViewSettings.morningBarChart ? 'primary' : 'light'"
              @click="$store.commit('appStore/changeListViewSettings', {key: 'morningBarChart', value: !$store.state.appStore.listViewSettings.morningBarChart})"
          >
            Éhgyomor
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" v-if="$store.state.appStore.listViewSettings.morningBarChart && glucoseMeasuresAtMorning.length">
        <v-card>
          <v-card-title>
            Éhgyomor mérések
          </v-card-title>
          <ChartLine :measures="glucoseMeasuresAtMorning" />
        </v-card>
      </v-col>
      <v-col md="6" lg="4" v-if="$store.state.appStore.listViewSettings.morning">
        <MeasureList
            title="Reggeli órákban"
            :measures="glucoseMeasures"
            :defaultShowCount="showMorningCount"
            :toHour="10"
        />
      </v-col>
      <v-col sm="6" md="6" lg="4" v-if="$store.state.appStore.listViewSettings.daily">
        <MeasureList
            title="Nappali órákban"
            :measures="glucoseMeasures"
            :defaultShowCount="showDailyCount"
            :fromHour="10"
            :toHour="17"
        />
      </v-col>
      <v-col sm="12" md="12" lg="4" v-if="$store.state.appStore.listViewSettings.night">
        <MeasureList
            title="Esti órákban"
            :measures="glucoseMeasures"
            :defaultShowCount="showNightCount"
            :fromHour="17"
        />
      </v-col>
      <v-col cols="12">
        <MeasureList
            title="Mérési adatok összesen"
            :measures="glucoseMeasures"
            :defaultShowCount="showMeasuresCount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import {APIGET} from "@/api/apiHelper";

export default {
  name: "index",
  setup() {
    return {
      moment
    }
  },
  props: {
    glucoseMeasures: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //
    }
  },
  mounted() {

  },
  computed: {
    showMorningCount() {
      return this.$store.state.appStore.showMorningCount;
    },
    showDailyCount() {
      return this.$store.state.appStore.showDailyCount;
    },
    showNightCount() {
      return this.$store.state.appStore.showNightCount;
    },
    showMeasuresCount() {
      return this.$store.state.appStore.showMeasuresCount;
    },
    glucoseMeasuresAtMorning() {
      const measures = JSON.parse(JSON.stringify(this.glucoseMeasures)).filter((measure) => {
        return moment(measure.measurementTime).hour() < 8;
      });
      if (measures.length >= 7) {
        return measures.splice(0,10)
      } else {
        return [];
      }
    }
  },
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