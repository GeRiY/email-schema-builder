<template>
  <v-btn icon @click="showChatWindow">
    <v-avatar size="50">
      <v-badge color="red" overlap v-if="notificationCount">
        <span slot="badge" class="white--text">{{ notificationCount }}</span>
        <v-icon color="white">mdi-bell</v-icon>
      </v-badge>
      <v-icon color="white" v-else >mdi-bell</v-icon>
    </v-avatar>
  </v-btn>
</template>

<script>
import moment from "moment";
export default {
  props: {
    socket: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  beforeMount() {
    //
  },
  computed: {
    notificationCount() {
      return this.$store.state.notificationStore.unWatchedMessages.length;
    }
  },
  data() {
    return {
      colors: {
        primary: '#f8bbd0',
        textColor: '#FFFFFF',
      }
    };
  },
  methods: {
    showChatWindow() {
      const messages = JSON.parse(JSON.stringify(this.$store.state.notificationStore.messages)) ?? [];
      const unWatchedMessages = JSON.parse(JSON.stringify(this.$store.state.notificationStore.unWatchedMessages)) ?? [];
      unWatchedMessages.forEach((message) => {
        messages.push(message);
      });
      this.$store.commit("notificationStore/changeMessages", messages);
      this.$store.commit("notificationStore/changeUnWatchedMessages", []);
      this.$emit("show-chat-window");
    }
  },
  watch: {
    //
  }
};
</script>
