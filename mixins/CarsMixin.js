import Vue from 'vue'
import {APIGET} from "@/api/apiHelper";

Vue.mixin({
    beforeMount() {
      //
    },
    data() {
      return {
          //
      }
    },
    computed: {
        selectedCarId() {
            return this.$store.getters['carStore/getSelectedCarId'];
        },
        selectedCar() {
            return this.$store.getters['carStore/getSelectedCar'];
        },
        carItems() {
            const cars = this.$store.getters['carStore/getUserCars'];
            if (!cars) return [];
            const carItems = [];
            cars.forEach(car => {
                carItems.push({
                    text: `${car.vendor} ${car.model} ${car.licensePlate} ( ${car.nickname})`,
                    value: car.id
                });
            });
            return carItems;
        }
    },
    methods: {
        async getUserCars() {
            this.changeIsLoading(true);
            const response = await APIGET('secured/user/cars');
            if (response.status !== 200) {
                this.changeIsLoading(false);
                return;
            }
            await this.$store.dispatch('carStore/setUserCars', response.data);
            this.changeIsLoading(false);
        },
        async setSelectedCar(carId) {
            await this.$store.dispatch('carStore/setSelectedCar', carId);
        }
    }
})