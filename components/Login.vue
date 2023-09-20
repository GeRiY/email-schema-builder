<template>
  <div class="login-screen">
    <div class="login-card" :style="{
       backgroundColor: appColors.defaultCard,
       border: `border: 1px solid ${appColors.defaultCard};`
    }"
    >
      <h4>Bejelentkezés</h4>
      <v-text-field
          v-model="email"
          label="Email cím"
      />
      <v-text-field
          v-model="password"
          label="Jelszó"
          type="password"
      />
      <v-btn
          color="primary"
          class="mt-2"
          width="100%"
          @click="login"
          :disabled="!this.email || !this.password"
      >
        Bejelentkezés
      </v-btn>
    </div>
  </div>
</template>

<script>
import {APIPOST} from "@/api/apiHelper";
import {getLoginDumyData, saveStorageUser, setLoginDumyData, setToken, setUsername} from "@/api/loginHelper";

export default {
  name: "Login",
  beforeMount() {
    const loginDat = getLoginDumyData() ?? { username: null, password: null };
    if (loginDat.username && loginDat.password) {
      this.username = loginDat.username;
      this.password = loginDat.password;
    }
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      this.changeIsLoading(true);
      const response = await APIPOST('auth/login', {
        email: this.email,
        password: this.password,
      });
      if (response.status === 200) {
        setToken(response.data.token)
        setUsername(response.data.user)
        saveStorageUser({
          ...response.data,
          roles: response.data.roles.map((role) => {
            return role.replace('ROLE_', '')
          })
        })

        setLoginDumyData({
          email: this.email,
          password: this.password
          })
        await this.$router.push('/')
      } else {
        setLoginDumyData({username: null, password: null})
        alert('Hibás felhasználónév vagy jelszó!');
      }
      this.changeIsLoading(false);
    }
  }
}
</script>

<style scoped>
.login-screen {
  background: #03045e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  margin-top: -100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
}
</style>