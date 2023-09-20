<template>
  <v-col xs="12" sm="6" md="4" lg="4" xl="3">
    <v-card class="add-new-measure">
      <v-card-title>
        <span>Új mérés felvitele</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="value"
            label="Mért érték"
            type="number"
            :rules="[(value) => !!value || 'Kötelező kitölteni']"
        />
        <v-btn
            color="primary"
            class="mt-2"
            width="100%"
            @click="saveGlucose"
            :disabled="isLoadingNow"
        >
          Mentés
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import {APIPOST} from "@/api/apiHelper";
import { emitMessage } from "@/plugins/socketClient";

export default {
  name: "NewGlucoseMeasure",
  props: {
    socket: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      value: null
    }
  },
  methods: {
    async saveGlucose() {
      if (!this.value) {
        return;
      }
      this.changeIsLoading(true)
      const response = await APIPOST('measurement/', {
        value: this.value,
      });
      this.changeIsLoading(false)
      if (!response) {
        alert('Hiba történt a mentés során!');
        return;
      }
      emitMessage({type: 'message', data: 'Új mérést vittem fel!'});
      this.value = null;
      await this.$router.push('/');
    },
  }
}
</script>

<style scoped></style>