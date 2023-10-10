<template>
  <draggable
      :value="value"
      class="mt-5 emailComponents"
      :group="{ name: 'emailComponents', pull: false, put: true }"
      @input="$emit('input', $event)"
  >
    <v-card class="pa-2 mt-2"
            width="100%%"
            v-for="(comp, index) in value"
            :key="comp.id"
            :id="comp.id"
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" disabled @click="/*editComponentToEmailContent(comp,index)*/" text>Modify</v-btn>
        <v-btn color="blue darken-1" @click="removeComponent(index)" text>Remove</v-btn>
      </v-card-actions>
      <component
          :is="componentFolder+comp.component.name"
          v-bind="comp.props"
      ></component>
    </v-card>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "EmailComponents",
  components: {draggable},
  props: {
    value: {
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
  methods: {
    removeComponent(index) {
      const value = JSON.parse(JSON.stringify(this.value))
      value.splice(index, 1)
      this.$emit('input', value)
    },
  }
}
</script>

<style scoped>

</style>