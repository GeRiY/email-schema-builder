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
        //
    },
    methods: {
        async getUserCarsFuels() {
            this.changeIsLoading(true);
            const response = await APIGET('secured/user/fuels');
            if (response.status !== 200) {
                this.changeIsLoading(false);
                return;
            }
            await this.$store.dispatch('fuelStore/setUserCarsFuels', response.data);
            this.changeIsLoading(false);
        }
    }
})