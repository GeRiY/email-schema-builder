<template>
  <Loader v-if="isLoadingNow"/>
  <v-card v-else class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    <v-select
        v-model="carId"
        :items="carItems"
        label="Kiválasztott autó"
        item-text="text"
        item-value="value"
    ></v-select>

    <v-card class="mt-5" v-if="selectedCar" :color="appColors.defaultCard">
      <v-card-title>
        <h3>{{selectedCar.nickname}}</h3>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div>
            <p><b>Autó típusa:</b> {{selectedCar.vendor}} {{selectedCar.model}}</p>
            <p><b>Rendszáma:</b> {{selectedCar.licensePlate}}</p>
            <p><b>Vin szám:</b> {{selectedCar.vinNumber}}</p>
            <p><b>Üzemanyag típusa al típusa:</b> {{selectedCar.fuelType}} / {{selectedCar.preferredFuelSubtype}}</p>
            <p><b>Tulajdonos:</b> {{selectedCar.user.name}}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
<!--    <v-card class="mt-5">
      <div class="actions">
        <v-card @click="stepFuelForm" style="width: 150px;height: 150px;display: flex;justify-content: center;align-items: center">
          <v-img src="icon.png" style="width: 130px;height: 130px"/>
        </v-card>
        <v-card @click="stepFuels" style="width: 150px;height: 150px;display: flex;justify-content: center;align-items: center">
          <v-img src="icon.png" style="width: 130px;height: 130px"/>
        </v-card>
        <v-card @click="stepCars" style="width: 150px;height: 150px;display: flex;justify-content: center;align-items: center">
          <v-img src="icon.png" style="width: 130px;height: 130px"/>
        </v-card>
        <v-card @click="stepCarForm" style="width: 150px;height: 150px;display: flex;justify-content: center;align-items: center">
          <v-img src="icon.png" style="width: 130px;height: 130px"/>
        </v-card>
      </div>
    </v-card>-->
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";

export default {
  name: "index",
  async beforeMount() {
    await this.getUserCars();
    const selectedCar = localStorage.getItem('selectedCar')
    if (selectedCar) {
      await this.setSelectedCar(parseInt(selectedCar))
      this.carId = parseInt(selectedCar)
    }
  },
  data() {
    return {
      carId: null,
    };
  },
  watch: {
    carId(val) {
      if (!val) return;
      localStorage.setItem('selectedCar', JSON.stringify(val))
      this.setSelectedCar(val)
    }
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
