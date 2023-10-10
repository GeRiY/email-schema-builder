import Vue from 'vue'
import {getToken} from "@/api/loginHelper";

Vue.mixin({
    beforeMount() {
        this.checkScreenIsMobile();  // Inicializáláskor ellenőrizzük a képernyő méretet
        window.addEventListener('resize', this.checkScreenIsMobile);
        /* const token = getToken();
        if (!token) {
        this.$router.push('/login');
        } */
    },
    data() {
      return {
          screenIsMobile: false,
          appColors: {
              defaultCard: '#caf0f8',
          }
      }
    },
    computed: {
        gColors() {
            return {
                primary: '#0077b6',
            };
        },
        gFontColors() {
            return {
                primary: '#fff',
            };
        },
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
        },
        checkScreenIsMobile() {
            this.screenIsMobile = window.outerWidth <= 768;  // 768px alatt tekintjük mobil méretnek
        },
    }
})