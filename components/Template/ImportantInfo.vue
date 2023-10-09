<template>
  <div v-if="ts_importantInfoText" :style="`margin-left: ${num_marginnLeft_0_500}px; margin-right: ${num_marginnRight_0_500}px;`">
    <h2>{{ beforeText }}</h2>
    <div>{{ ts_importantInfoText }}</div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'ImportantInfo',
  props: {
    ts_importantInfoText: {
      type: String,
      default: () => null,
    },
    s_lang: {
      type: String,
      default: () => 'hu',
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
    beforeText() {
      switch (this.s_lang) {
        case 'hu':
          return 'Fontos információk';
        case 'en':
          return 'Important information';
        default:
          return 'Important information';
      }
    },
  },
};
</script>
