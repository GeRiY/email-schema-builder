<template>
  <v-card class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    <Loader v-if="isLoadingNow"/>
    <v-select
        v-model="carId"
        :items="carItems"
        label="Kiválasztott autó"
        item-text="text"
        item-value="value"
    ></v-select>
    <v-card class="pa-2 mt-5" :color="appColors.defaultCard">
      <v-form v-model="isValidForm" :disabled="!car">
        <v-select
            v-model="newFuel.fuelSubtypeId"
            :items="fuelSubtypeItems"
            :label="`Üzemanyag al típusa ${car ? '('+car.fuelType+')' : ''}`"
            item-text="name"
            item-value="id"
            :rules="[required]"
        ></v-select>
        <v-text-field
            v-model="newFuel.unitPrice"
            :label="`Egységár`"
            type="number"
            :rules="[required]"
        ></v-text-field>
        <v-text-field
            v-model="newFuel.fullPrice"
            :label="`Teljes ár`"
            type="number"
            :rules="[required]"
        ></v-text-field>
        <v-text-field
            v-model="newFuel.volume"
            :label="`Mennyiség`"
            type="number"
            :rules="[required]"
        ></v-text-field>
        <v-text-field
            v-model="newFuel.kilometerNumber"
            :label="`Kilométer óra állása`"
            type="number"
            :rules="[required]"
        ></v-text-field>
      </v-form>
      <div class="actions">
        <v-btn :disabled="!isValidForm" @click="saveNewFuel">Felvitel</v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET, APIPOST} from "@/api/apiHelper";
import moment from "moment/moment";

export default {
  name: "new-fuel",
  async beforeMount() {
    await this.getUserCars();
    const selectedCar = localStorage.getItem('selectedCar')
    if (selectedCar) {
      await this.setSelectedCar(parseInt(selectedCar))
      this.carId = parseInt(selectedCar)
      this.newFuel.carId = selectedCar;
      await this.getAllFuelSubtypes();
    }
  },
  computed: {
    car(){
      if (!this.selectedCar) return null;
      return this.selectedCar
    },
    fuelSubtypeItems(){
      if (this.fuelSubtypes.length === 0) return [];
      if (!this.car) return [];
      const fuelSubtypes = []
      this.fuelSubtypes.forEach((fuelSubtype) => {
        if (fuelSubtype.fuelType === this.car.fuelType) {
          if (fuelSubtype.name === this.car.preferredFuelSubtype) {
            this.newFuel.fuelSubtypeId = fuelSubtype.id
          }
          fuelSubtypes.push({
            id: fuelSubtype.id,
            name: fuelSubtype.name
          })
        }
      })
      return fuelSubtypes
    },
  },
  data() {
    return {
      carId: null,
      cars: [],
      fuelTypes: [],
      fuelSubtypes: [],
      isValidForm: false,
      newFuel: {
        carId: null,
        fuelSubtypeId: null,
        unitPrice: null,
        fullPrice: null,
        volume: null,
        kilometerNumber: null
      }
    };
  },
  methods: {
    async saveNewFuel() {
      this.changeIsLoading(true);
      const response = await APIPOST('fuel/', this.newFuel);
      if (response.status === 201){
        this.resetForm();
        alert(response.data)
      } else if(response.status === 401) {
        this.$router.push('/login')
      } else if(response.status === 422) {
        alert(response.data.message)
      } else {
        console.error(response)
      }
      this.changeIsLoading(false);
    },
    async getAllCar() {
      this.changeIsLoading(true);
      const response = await APIGET('car');
      if (response.status !== 200) {
        this.changeIsLoading(false);
        return;
      }
      this.cars = response.data;
      this.changeIsLoading(false);
    },
    async getAllFuelSubtypes() {
      const response = await APIGET('fuel-subtype/');
      if (response.status === 200){
        this.fuelSubtypes = response.data;
      } else {
        this.fuelSubtypes = [];
      }
    },
    resetForm() {
      this.newFuel = {
        ...this.newFuel,
        unitPrice: null,
        fullPrice: null,
        volume: null,
        kilometerNumber: null
      }
    },
  },
  watch: {
    async carId(val) {
      if (val){
        this.newFuel.carId = val;
        localStorage.setItem('selectedCar', val)
        await this.getAllFuelSubtypes()
      }
    },
    'newCar.fuelTypeId': function (val) {
      if (val){
        this.getAllFuelSubtypes()
      }
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
