import Vue from 'vue'

Vue.mixin({
    computed: {
        isLoadingNow() {
            return this.$store.state.appStore.isLoadingNow;
        }
    },
    methods: {
        changeIsLoading(isLoading) {
            this.$store.commit('appStore/changeIsLoading',isLoading);
        }
    }
})