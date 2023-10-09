<template>
  <table style="width: 100%" v-if="il_logo" :style="`margin-left: ${num_marginnLeft_0_500}px; margin-right: ${num_marginnRight_0_500}px;`">
    <tr>
      <td style="width: 33%;" :style="`text-align:${sel_lay_layout}`">
        <img
            v-if="sel_lay_layout === 'left'"
            :src="il_logo"
            alt="logo"
            :width="num_logoWidth_0_500"
            :height="num_logoHeight_0_500" />
      </td>
      <td style="width: 33%;" :style="`text-align:${sel_lay_layout}`">
        <img
            v-if="sel_lay_layout === 'center'"
            :src="il_logo"
            alt="logo"
            :width="num_logoWidth_0_500"
            :height="num_logoHeight_0_500" />
      </td>
      <td style="width: 33%;" :style="`text-align:${sel_lay_layout}`">
        <img
            v-if="sel_lay_layout === 'right'"
            :src="il_logo"
            alt="logo"
            :width="num_logoWidth_0_500"
            :height="num_logoHeight_0_500" />
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Image",
  props: {
    num_logoWidth_0_500: {
      type: Number,
      default() {
        return 32;
      },
    },
    num_logoHeight_0_500: {
      type: Number,
      default() {
        return 32;
      },
    },
    sel_lay_layout: {
      type: String,
      default() {
        return "left";
      },
    },
    il_logo: {
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
};
</script>

<style scoped>

</style>