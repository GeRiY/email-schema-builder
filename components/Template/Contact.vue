<template>
  <div v-if="rows" :style="`margin-left: ${num_marginnLeft_0_500}px; margin-right: ${num_marginnRight_0_500}px;`">
    <strong>{{ beforeText }}</strong>
    <br>
    <span v-for="row in rows">{{ row.s_title }}: <a href="#">{{ row.s_value }}</a><br></span>
    <!-- További kapcsolati információk -->
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    rows: {
      type: Array,
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
          return 'Kapcsolat';
        case 'en':
          return 'Contact';
        default:
          return 'Contact';
      }
    },
  },
};
</script>
