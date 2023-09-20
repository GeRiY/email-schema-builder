<template>
  <v-card class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    <div v-for="car in cars" :key="car.id">
      <v-card @click="selectCar(car)" :color="appColors.defaultCard" class="pa-2 mx-2 my-2">
        <v-card-title>
          <h3>{{car.nickname}}</h3>
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div>
              <p><b>Autó típusa:</b> {{car.vendor}} {{car.model}}</p>
              <p><b>Rendszáma:</b> {{car.licensePlate}}</p>
              <p><b>Vin szám:</b> {{car.vinNumber}}</p>
              <p><b>Üzemanyag típusa al típusa:</b> {{car.fuelType}} / {{car.preferredFuelSubtype}}</p>
              <p><b>Tulajdonos:</b> {{car.user.name}}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";

export default {
  name: "cars",
  async beforeMount() {
    await this.getUserCars();
    this.cars = this.$store.getters["carStore/getUserCars"]
  },
  data(){
    return {
      cars: []
    }
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
}
</style>
