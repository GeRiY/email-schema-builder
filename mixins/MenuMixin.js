import Vue from 'vue'
import {getStorageUser, getToken} from "@/api/loginHelper";

Vue.mixin({
    computed: {
        showMenu() {
            return this.$store.state.menuStore.show;
        },
        menuList() {
            return this.$store.state.menuStore.menuList ?? [];
        },
        currentMenu() {
            return this.$store.state.menuStore.menuList.find(item => item.route === this.$route.path)
        }
    },
    methods: {
        toggleMenu(value = true) {
            // scroll to top
            window.scrollTo(0, 0);
            this.$store.commit('menuStore/toggleMenu', value);
        },
        isUserAccessMenu(menu) {
            return true // temporary
            const user = getStorageUser();
            if (!user) {
                return false;
            }
            for (const role of user.roles) {
                if (menu.access.includes(role)) {
                    return true;
                }
            }
        }
    }
})