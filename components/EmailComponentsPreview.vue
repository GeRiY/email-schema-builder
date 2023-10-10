<template>
  <div>
    <div v-for="(comp, index) in components" :key="index">
      <component
          :is="componentFolder+comp.component.name"
          v-bind="comp.props"
          :ref="`component-${comp.id}`"
      ></component>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "EmailComponentsPreview",
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
  mounted() {
    if (this.components){
      let html = '';
      this.components.forEach((comp, index) => {
        html += this.$refs[`component-${comp.id}`][0].$el.outerHTML
      })
      this.$emit('html', html)
    }
  },
}
</script>

<style scoped>

</style>