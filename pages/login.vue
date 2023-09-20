<template>
    <Loader v-if="isLoadingNow" />
    <Login v-else />
</template>

<script>
import {socketDisconnect} from "@/plugins/socketClient";

export default {
  name: "index",
  layout: 'unauth',
  async beforeMount() {
    socketDisconnect();
    await this.$store.dispatch("appStore/logout");
  }
}
</script>

<style scoped>

</style>
