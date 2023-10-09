import Vue from 'vue'
import {getToken} from "@/api/loginHelper";

Vue.mixin({
    beforeMount() {
      /*const token = getToken();
      if (!token) {
       this.$router.push('/login');
      }*/
    },
    data() {
      return {
          appColors: {
              defaultCard: '#caf0f8',
          }
      }
    },
    computed: {
        currentPage() {
            return this.$store.state.tabStore.activeTab;
        },
        fullName() {
            return this.$store.state.appStore.lastName + ' ' + this.$store.state.appStore.firstName;
        },
        userDetails() {
            return {
                username: this.$store.state.appStore.username,
                firstName: this.$store.state.appStore.firstName,
                lastName: this.$store.state.appStore.lastName
            };
        }
    },
    methods: {
        changeTab(tab) {
            this.$store.commit('tabStore/changeActiveTab', tab);
        }
    }
})