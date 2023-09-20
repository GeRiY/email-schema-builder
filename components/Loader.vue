<template>
  <div class="loader-container">
    <v-progress-circular
        :size="70"
        :width="7"
        color="white"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.loader-container {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>