<template>
  <v-card class="pa-2 mx-2 my-2" :color="appColors.defaultCard">
    Comming soon!!
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";

export default {
  name: "car-share"
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
}
</style>
