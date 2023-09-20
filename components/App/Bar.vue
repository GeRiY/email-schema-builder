<template>
  <v-app-bar app :color="colors.primary" :style="`color: ${colors.textColor}`">
    <v-app-bar-nav-icon :style="`color: ${colors.textColor}`" @click="toggleMenu"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ currentMenu.title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <Notification v-if="socket" :socket="socket" v-on:show-chat-window="showChatWindow" />
  </v-app-bar>
</template>

<script>
export default {
  name: "Bar",
  props: {
    socket: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data: () => ({
    colors: {
      primary: '#0077b6',
      textColor: '#FFFFFF',
    }
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("appStore/logout");
      await this.$router.push("/login");
    },
    showChatWindow() {
      window.scrollTo(0, 0);
      this.$emit("show-chat-window");
    }
  }
}
</script>

<style scoped>
.appBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appBarWidth {
  width: 55%;
}
</style>