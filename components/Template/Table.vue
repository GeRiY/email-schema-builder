<template>
  <table style="width: 100%" v-if="rows"  :style="`margin-left: ${num_marginnLeft_0_500}px; margin-right: ${num_marginnRight_0_500}px;`">
    <tr>
      <td style="width: 33%;" align="left">
        <table v-if="sel_lay_layout === 'left'">
          <!-- Táblázat tartalma -->
          <tr v-for="row in rows">
            <td style="font-weight: bold">{{ row.s_title }}:</td>
            <td>{{ row.s_value }}</td>
          </tr>
          <!-- További sorok -->
        </table>
      </td>
      <td style="width: 33%;" align="center">
        <table v-if="sel_lay_layout === 'center'">
          <!-- Táblázat tartalma -->
          <tr v-for="row in rows">
            <td style="font-weight: bold">{{ row.s_title }}:</td>
            <td>{{ row.s_value }}</td>
          </tr>
          <!-- További sorok -->
        </table>
      </td>
      <td style="width: 34%;" align="right">
        <table v-if="sel_lay_layout === 'right'">
          <!-- Táblázat tartalma -->
          <tr v-for="row in rows">
            <td style="font-weight: bold">{{ row.s_title }}:</td>
            <td>{{ row.s_value }}</td>
          </tr>
          <!-- További sorok -->
        </table>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    sel_lay_layout: {
      type: String,
      default() {
        return "left";
      },
    },
    rows: {
      type: Array,
      default: () => [],
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
};
</script>

<style scoped>

</style>
