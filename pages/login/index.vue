<template>
  <div class="container">
    <form class="myForm" @submit="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Username"
        />
      </div>
      <small v-show="errUser" style="color:red;" class="alert-text thai"
        >* {{ errUser }} *</small
      >
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <small v-show="errPass" style="color:red;" class="alert-text thai"
        >* {{ errPass }} *</small
      >
      <small v-show="errLog" style="color:red;" class="alert-text thai"
        >* {{ errLog }} *</small
      >
      <div class="row">
        <div class="col">
          <button type="submit" class="btn">
            Login
          </button>
        </div>
        <div class="col">
          Not Account?
          <nuxt-link to="/register" tag="li" class="nav-link">
            <a>Register</a>
          </nuxt-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      errUser: '',
      errPass: '',
      errLog: ''
    }
  },
  methods: {
    onSubmit: async function(evt) {
      evt.preventDefault()
      try {
        const user = await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/v1/authentication/`,
          {
            username: this.username,
            password: this.password
          }
        )
        localStorage.setItem('token', ' ' + user.data.token)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response.data)
        const errObj = err.response.data
        if ('username' in errObj) {
          this.errUser = 'โปรดใส่ชื่อผู้ใช้'
        } else {
          this.errUser = ''
        }
        if ('password' in errObj) {
          this.errPass = 'โปรดใส่พาสเวิร์ด'
        } else {
          this.errPass = ''
        }
        if ('non_field_errors' in errObj) {
          this.errLog = 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง'
        } else {
          this.errLog = ''
        }
      }
      try {
        const userrole = await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/v1/myuser/`,
          {
            headers: {
              Authorization: 'token' + localStorage.getItem('token')
            }
          }
        )
        localStorage.setItem('user', userrole.data[0].username)
        localStorage.setItem('role', userrole.data[0].groups[0])
        localStorage.setItem('uid', userrole.data[0].id)
        console.log(userrole.data)
        this.$store.commit('SetUser', {
          id: userrole.data[0].id,
          username: userrole.data[0].username,
          token: localStorage.getItem('token'),
          role: localStorage.getItem('role')
        })
        this.$router.push(this.$store.state.redirectUrl)
        // eslint-disable-next-line no-unreachable
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.request.response)
      }
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
}
.col {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.myForm {
  width: 380px;
  margin: auto;
  border-radius: 8px;
  background: #fcfbf7;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
}
.nav-link {
  padding: 0;
}
.nav-link a {
  text-decoration: none;
}
.btn {
  background-color: bisque;
}
</style>
