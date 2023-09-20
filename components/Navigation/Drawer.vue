<template>
  <v-navigation-drawer :value="showMenu"
                       :color="colors.primary"
                       absolute
                       temporary
                       v-on:focusout="toggleMenu(false)"
  >
    <div style="display: flex;flex-direction:column;justify-content: center;align-items: center">
      <v-avatar
          size="150"
          class="pt-5"
      >
        <v-img
            class="mx-auto"
            height="200"
            width="200"
            src="missingProfile.png"
        />
      </v-avatar>
      <h3 style="color: white">{{ fullName }}</h3>
    </div>
    <v-divider class="my-2" />
    <v-list>
      <v-list-item v-for="(item, index) in menuList"
                   :key="`menu-item-${index+1}`"
                   :style="`color: ${$route.path === item.route ? colors.selectedTextColor : colors.textColor}`"
                   v-if="isUserAccessMenu(item)"
                   @click="changeRoute(item.route)"
      >
        <v-list-item-icon>
          <v-icon :style="`color: ${colors.textColor}`">mdi-{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :style="`color: ${colors.textColor}`"
                    @click="logout"
      >
        <v-list-item-icon>
          <v-icon :style="`color: ${colors.textColor}`">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Kijelentkezés</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  methods: {
    changeRoute: function (value) {
      this.$router.push(value)
    },
    async logout() {
      await this.$store.dispatch("appStore/logout");
      await this.$router.push("/login");
    }
  },
  data: () => ({
    colors: {
      primary: '#0077b6',
      textColor: '#FFFFFF',
      selectedTextColor: '#FFD166'
    },
  }),
}
</script>

<style scoped>

</style>