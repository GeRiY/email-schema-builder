<template>
  <v-card width="100%">
    <v-card-title>
      Komponensek
    </v-card-title>
    <draggable
        v-model="components"
        class="mt-5 components"
        :sort="false"
        :group="{ name: 'emailComponents', pull: 'clone', put: false }"
        :clone="cloneItem"
    >
      <v-card class="pa-2 mt-2"
              width="100%%"
              v-for="comp in components"
              :key="comp.id"
              :id="comp.id"
              style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;"
      >
        <div>{{ comp.name }}</div>
        <v-btn icon @click="selectedComponent = comp;showDialog = true">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-card>
    </draggable>
    <v-dialog v-model="showDialog" v-if="selectedComponent">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <component
              :is="componentFolder+selectedComponent.component.name"
              v-bind="selectedComponent.props"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "ComponentList",
  components: {draggable},
  props: {
    components: {
      type: Array,
      default: () => []
    },
    componentFolder: {
      type: String,
      default() {
        return 'Template'
      }
    }
  },
  data() {
    return {
      showDialog: false,
      selectedComponent: null
    }
  },
  methods: {
    cloneItem(item) {
      const clonedItem = JSON.parse(JSON.stringify(item))
      const time = new Date().getTime();
      clonedItem.id += '_'+time;
      return clonedItem;
    },
  },
  watch: {
    showDialog(val) {
      if (!val) {
        this.selectedComponent = null
      }
    }
  }
}
</script>

<style scoped>

</style>