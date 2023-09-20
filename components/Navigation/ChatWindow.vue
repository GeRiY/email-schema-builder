<template>
  <v-navigation-drawer v-model="showDrawer"
                       :color="colors.primary"
                       absolute
                       width="80%"
                       height="100%"
                       right
                       temporary
  >
    <v-card>
      <div>
        <v-card-title>
          <div class="d-flex justify-space-between">
            <div class="d-flex">
              <v-avatar size="25">
                <v-img src="missingProfile.png" />
              </v-avatar>
              <div>
                <span class="ml-2">Admin</span><br />
                <span class="ml-2" style="color: grey;font-style: italic;font-size: 12px">2021-01-01 12:00:00</span>
              </div>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <p>Üdvözlünk az értesítésekben!</p>
        </v-card-text>
        <v-divider></v-divider>
      </div>
      <div v-if="messages.length" v-for="(message, messageIndex) in messages" :key="messageIndex">
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div class="d-flex">
              <v-avatar size="25">
                <v-img src="missingProfile.png" />
              </v-avatar>
              <div>
                <span class="ml-2 font-weight-bold">{{ message.user }}</span><br />
                <span class="ml-2" style="color: grey;font-style: italic;font-size: 12px">{{ message.createdAt }}</span>
              </div>
            </div>
          </div>
          <p>{{ message.message }}</p>
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import moment from "moment/moment";
import { onMessage } from "@/plugins/socketClient";

export default {
  name: "ChatWindow",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    this.showDrawer = this.value;
    onMessage((message) => {
      message.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      this.$store.commit('notificationStore/addUnWatchedMessage', message);
    });
  },
  data(){
    return {
      showDrawer: false,
      colors: {
        primary: '#0077b6',
        textColor: '#FFFFFF',
      },
    }
  },
  computed: {
    messages() {
      return (JSON.parse(JSON.stringify(this.$store.state.notificationStore.messages)) ?? []).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
  },
  watch: {
    value: function (val) {
      this.showDrawer = val;
    },
    showDrawer: function (val) {
      this.$emit("input", val);
    }
  }
}
</script>

<style scoped>

</style>