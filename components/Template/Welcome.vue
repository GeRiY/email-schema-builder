<template>
  <div v-if="s_name || ts_thankYou" :style="`margin-left: ${num_marginnLeft_0_500}px; margin-right: ${num_marginnRight_0_500}px;`">
    <h1 v-if="s_name">Kedves {{ s_name }}!</h1>
    <p v-if="ts_thankYou">{{ ts_thankYou }}</p>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: {
    s_name: {
      type: String,
      default: () => null,
    },
    ts_thankYou: {
      type: String,
      default: () => null,
    },
    s_lang: {
      type: String,
      default: () => null,
    },
    num_marginnLeft_0_500: {
      type: Number,
      default() {
        return 0;
      },
    },
    num_marginnRight_0_500: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  computed: {
    beforeName() {
      switch (this.s_lang){
        case 'hu':
          return 'Kedves';
        case 'en':
          return 'Dear';
        default:
          return 'Dear';
      }
    },
  },
};
</script>
