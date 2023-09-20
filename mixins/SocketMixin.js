import Vue from 'vue'

Vue.mixin({
    computed: {
        socketEmits() {
            return this.$store.state.socketStore.socketEmits;
        },
        socketEvents() {
            return this.$store.state.socketStore.socketEvents;
        }
    }
})