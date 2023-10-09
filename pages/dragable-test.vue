<template>
  <v-card class="pa-5">
    <v-card-title>Dragable Test</v-card-title>
    <draggable v-model="items"
               group="group"
               @start="dragging = true"
               @end="dragging = false"
    >
      <template v-for="item in items">
        <v-card class="pa-2 mt-2" width="10%">
          <div>{{item.title}}</div>
        </v-card>
      </template>
    </draggable>

    <draggable v-model="items2"
               class="mt-5"
               group="group"
               @start="dragging = true"
               @end="dragging = false"
    >
      <template v-for="item in items2">
        <v-card class="pa-2 mt-2" width="10%">
          <div>{{item.title}}</div>
        </v-card>
      </template>
    </draggable>
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";
import draggable from 'vuedraggable'

export default {
  name: "dragable-test",
  components: {
    draggable
  },
  async beforeMount() {
    //
  },
  data() {
    return {
      dragging: false,
      items: [
        { title: 'Item 1' },
        { title: 'Item 2' },
        { title: 'Item 3' },

      ],
      items2: [
        { title: 'Item 4' }
      ]
    };
  },
  methods: {
    //
  },
  watch: {
    //
  }
}
</script>

<style scoped>

</style>
