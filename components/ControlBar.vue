<template>
  <v-app-bar app class="px-4 control-bar" color="#f8bbd0">
    <v-btn icon @click="changeTab(false)">
      <div>
        <v-icon color="white">mdi-chevron-left</v-icon>
        <div class="subTabTitle">{{ previousTabTitle }}</div>
      </div>
    </v-btn>
    <v-spacer></v-spacer>
    <div>
      {{ tabTitle }}
    </div>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeTab(true)">
      <div>
        <v-icon color="white">mdi-chevron-right</v-icon>
        <div class="subTabTitle">{{ nextTabTitle }}</div>
      </div>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'ControlBar',
  props: {
    //
  },
  data() {
    return {
      //
    }
  },
  computed: {
    activeTab() {
      return this.$store.state.tabStore.activeTab;
    },
    tabs() {
      return this.$store.state.tabStore.tabs;
    },
    tabTitle() {
      return this.$store.state.tabStore.tabs[this.activeTab]?.title;
    },
    nextTabTitle() {
      // check is there a next tab
      let title = null;
      if (this.activeTab < this.tabs.length - 1) {
        title = this.tabs[this.activeTab + 1].title;
      }
      return title;
    },
    previousTabTitle() {
      // check is there a previous tab
      let title = null;
      if (this.activeTab > 0) {
        title = this.tabs[this.activeTab - 1].title;
      }
      return title;
    }
  },
  methods: {
    changeTab(towardsRight) {
      if (towardsRight) {
        if (this.activeTab < this.tabs.length - 1) {
          this.$store.commit('tabStore/changeActiveTab', this.activeTab + 1);
        }
      } else {
        if (this.activeTab > 0) {
          this.$store.commit('tabStore/changeActiveTab', this.activeTab - 1);
        }
      }
    }
  }
}
</script>

<style scoped>
.control-bar div {
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: white;
}

.subTabTitle {
  font-size: 11px!important;
}

</style>