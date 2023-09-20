<template>
  <v-card class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    <Loader v-if="isLoadingNow"/>
    <v-form v-model="isValidForm">
      <v-text-field
          v-model="newCar.nickname"
          label="Becenév"
          :rules="[required]"
      ></v-text-field>
      <v-text-field
          v-model="newCar.model"
          label="Modell"
          :rules="[required]"
      ></v-text-field>
      <v-text-field
          v-model="newCar.vendor"
          label="Gyártó"
          :rules="[required]"
      ></v-text-field>
      <v-text-field
          v-model="newCar.vinNumber"
          label="VIN szám"
          :rules="[required]"
      ></v-text-field>
      <v-text-field
          v-model="newCar.licensePlate"
          label="Rendszám"
          :rules="[required]"
      ></v-text-field>
      <v-select
          v-model="newCar.fuelTypeId"
          :items="fuelTypeItems"
          label="Üzemanyag típus"
          item-text="name"
          item-value="id"
          :rules="[required]"
      ></v-select>
      <v-select
          v-model="newCar.preferedFuelSubtypeId"
          :items="fuelSubtypeItems"
          label="Üzemanyag altípus"
          item-text="name"
          item-value="id"
          :rules="[required]"
      ></v-select>
    </v-form>
    <div class="actions">
      <v-btn :disabled="!isValidForm" @click="saveNewCar">Felvitel</v-btn>
    </div>
  </v-card>
</template>

<script>
import {APIGET, APIPOST} from "@/api/apiHelper";

export default {
  name: "new-car",
  beforeMount() {
    this.getAllFuelTypes()
    //this.resetForm();
  },
  computed: {
    fuelTypeItems(){
      if (this.fuelTypes.length === 0) return [];
      const fuelTypes = []
      this.fuelTypes.forEach((fuelType) => {
        fuelTypes.push({
          id: fuelType.id,
          name: fuelType.name
        })
      })
      return fuelTypes
    },
    fuelSubtypeItems(){
      if (this.fuelSubtypes.length === 0) return [];
      if (!this.newCar.fuelTypeId) return [];
      const fuelSubtypes = []
      this.fuelSubtypes.forEach((fuelSubtype) => {
        if (fuelSubtype.fuelTypeId === this.newCar.fuelTypeId){
          fuelSubtypes.push({
            id: fuelSubtype.id,
            name: fuelSubtype.name
          })
        }
      })
      return fuelSubtypes
    }
  },
  data() {
    return {
      fuelTypes: [],
      fuelSubtypes: [],
      isValidForm: false,
      newCar: {
        nickname: "",
        model: "",
        vendor: "",
        vinNumber: "",
        licensePlate: "",
        fuelTypeId: 0,
        preferedFuelSubtypeId: 0
      }
    };
  },
  methods: {
    async saveNewCar() {
      this.changeIsLoading(true);
      const response = await APIPOST('car/', this.newCar);
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
    async getAllFuelTypes() {
      const response = await APIGET('fuel-type/');
      if (response.status === 200){
        this.fuelTypes = response.data;
      } else {
        this.fuelTypes = [];
      }
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
      this.newCar = {
        nickname: "",
        model: "",
        vendor: "",
        vinNumber: "",
        licensePlate: "",
        fuelTypeId: 0,
        preferedFuelSubtypeId: 0
      }
    },
  },
  watch: {
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
