<template>
  <v-card class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    <div v-if="fuelsByCars">
      <div v-for="car in Object.entries(fuelsByCars)" :key="car[0]" class="mt-5">
        <div>
          <h3>{{ car[1][0].car.vendor }} {{ car[1][0].car.model }} ({{ car[1][0].car.nickname }})</h3>
        </div>
        <v-data-table
            class="mt-2 elevation-1"
            v-if="car[1]"
            :headers="[{
              text: 'Üzemanyag',
              align: 'start',
              sortable: false,
              value: 'fuelSubtype.name'
            },
            { text: 'Egységár (Ft)', value: 'unitPrice' },
            { text: 'Teljes ár (Ft)', value: 'fullPrice' },
            { text: 'Mennyiség (L)', value: 'volume' },
            { text: 'Kilométer óra állása (Km)', value: 'kilometerNumber' },
            { text: 'Felvitel dátuma', value: 'createdAt' },
            { text: 'Felvitte', value: 'createdBy.name' }
            ]"
            :items="car[1]"
            :items-per-page="5"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";

export default {
  name: "fuels",
  async beforeMount() {
    await this.getUserCarsFuels();
    this.fuels = this.$store.getters["fuelStore/getUserCarsFuels"]
  },
  computed: {
    fuelsByCars() {
      if (!this.fuels) return []
      return this.fuels.reduce((acc, fuel) => {
        if (!acc[fuel.car.id]) {
          acc[fuel.car.id] = []
        }
        acc[fuel.car.id].push(fuel)
        return acc
      }, {})
    }
  },
  data() {
    return {
      fuels: []
    }
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
}

.fb-20 {
  flex-basis: 30px
}
</style>
