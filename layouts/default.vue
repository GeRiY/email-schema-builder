<template>
  <v-app>
    <AppBar :socket="socket" v-on:show-chat-window="show = true" />
<!--    <ControlBar v-if="$store.state.tabStore.activeTab !== 3" />-->
    <NavigationDrawer />
    <NavigationChatWindow v-model="show" v-if="socket"/>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import {APIGET} from "@/api/apiHelper";
import io from 'socket.io-client';
import {getToken} from "~/api/loginHelper";
import {createConnection, emitMessage, onLeave, onMessage, onUpdateUserList} from "@/plugins/socketClient";
export default {
  name: 'DefaultLayout',
  data: () => ({
    socket: null,
    show: false,
  }),
  beforeCreate() {
    /*window.addEventListener('error', function (e) {
      this.$sentry.captureException(new Error(e.message))
    })*/
  },
  async beforeMount() {
    try {
      /*const userDetails = await this.getUserDetails();
      this.$store.commit("appStore/setUserDetails", userDetails)*/
      if (process.env.socketUrl) {
        this.socket = createConnection();
        onMessage(async (data) => {
          console.log('onMessage',data);
        });
        onLeave(async (data) => {
          console.log('disconnect');
          await this.$store.dispatch("appStore/logout");
          await this.$router.push("/login");
        });
        onUpdateUserList(async (data) => {
          console.log('onUpdateUserList',data);
          await this.$store.commit("usersStore/setSocketUserList", data)
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async getUserDetails() {
      this.changeIsLoading(true)
      const response = await APIGET("secured/user");
      if (response.status === 200) {
        this.username = response.data.username;
      }
      this.changeIsLoading(false)
      return response.data ?? '';
    },
  }
}
</script>
