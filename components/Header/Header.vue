<template>
  <header class="main-header">
    <nav class="main-nav">
      <div class="banner">
        <h1 class="font-weight-normal">CAFE TELLER</h1>
        <p>GOOD CAFÉ DESERVES A SHOUTOUT</p>
      </div>
      <div class="row">
        <div class="col">
          <div class="nav-links">
            <nuxt-link style="padding:0;" to="/" tag="li" class="nav-link"
              ><a>Home</a></nuxt-link
            >
            <nuxt-link to="/reviews" tag="li" class="nav-link">
              <a>Review</a>
            </nuxt-link>
            <nuxt-link to="/store" tag="li" class="nav-link">
              <a>CafeStore</a>
            </nuxt-link>
            <nuxt-link to="/contact" tag="li" class="nav-link">
              <a>Contact us</a>
            </nuxt-link>
            <nuxt-link
              v-if="$store.state.role === '2' || $store.state.role === '1'"
              to="/chat"
              tag="li"
              class="nav-link"
            >
              <a>Let's Chat</a>
            </nuxt-link>
          </div>
        </div>
        <div class="col-4">
          <div v-if="!this.$store.state.token" class="nav-user">
            <nuxt-link to="/login" tag="li" class="login nav-link">
              <a>Login</a>
            </nuxt-link>
            <nuxt-link
              v-if="!this.$store.state.token"
              to="/register"
              tag="li"
              class="register nav-link"
              @click.native="toRegister"
            >
              <a>Register</a>
            </nuxt-link>
          </div>
          <div v-else class="nav-user">
            <div class="user-login">
              <p>Welcome,<br />{{ $store.state.username }}</p>
            </div>
            <nuxt-link
              to="/login"
              tag="li"
              class="register nav-link"
              @click.native="logout"
            >
              <a>Logout</a>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toRegister() {
      // console.log('okeyy')
      this.$router.push('register')
    },
    logout() {
      Pusher.logToConsole = true // eslint-disable-line no-undef
      let pusher = new Pusher('90b6e5d7cc2ac7bc480b', { // eslint-disable-line
        cluster: 'mt1',
        forceTLS: true
      })
      pusher.disconnect()
      // eslint-disable-next-line no-console
      localStorage.clear()
      this.$store.commit('ClearUser')
      this.$router.push('login')
      location.reload()
    }
    // async openChat() {
    //   try {
    //     const chat = await this.$axios.get(
    //       `${this.$axios.defaults.baseURL}api/v1/get/token/`
    //     )
    //     // eslint-disable-next-line no-console
    //     console.log(chat.data)
    //     return {
    //       chatData: chat.data,
    //       project: 'project'
    //     }
    //   } catch (err) {
    //     // eslint-disable-next-line no-console
    //     console.log(err.response)
    //   }
    // }
  }
}
</script>
<style scoped>
.user-login {
  width: 100px;
  font-size: 16px;
  text-align: center;
}
.row {
  margin: 0;
  flex-wrap: nowrap;
}

.main-header {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fcfbf7;
  height: 177px;
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fffaf0;
  height: 177px; */
}

.banner {
  letter-spacing: 2px;
  text-align: center;
}

.banner p {
  letter-spacing: 7px;
}

.main-nav {
  padding-top: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-user {
  justify-content: flex-end;
  display: flex;
}

.nav-link {
  height: 100%;
  margin: 0 2rem;
  padding: 0.3rem;
}

.login {
  border-right: 1px solid #e6e6e6;
  margin: 0;
}

.register {
  background: #f4a460;
  /* padding: 10px 40px 10px 40px; */
  border-radius: 20px;
  color: #fff;
  margin-left: 5px;
}

.nav-link a {
  /* display: block; */
  color: black;
  text-decoration: none;
  font-size: 1.1rem;
  font-style: oblique;
}

.nav-link a:hover,
.nav-link a:active,
.nav-link.nuxt-link-exact-active a {
  color: #06c4d1;
}
</style>
