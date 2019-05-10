<template>
  <div class="container">
    <form class="myForm" @submit="onSubmit">
      <div class="form-group">
        <label>Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="ชื่อผู้ใช้งาน"
        />
      </div>
      <small v-show="errUser" style="color:red;" class="alert-text thai"
        >* {{ errUser }} *</small
      >
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="รหัสผ่าน"
        />
      </div>
      <small v-show="errPass" style="color:red;" class="alert-text thai"
        >* {{ errPass }} *</small
      >
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="อีเมล"
        />
      </div>
      <small v-show="errEmail" style="color:red;" class="alert-text thai"
        >* {{ errEmail }} *</small
      >
      <div class="form-group">
        <label>First Name</label>
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          placeholder="ชื่อ"
        />
      </div>
      <small v-show="errFirst" style="color:red;" class="alert-text thai"
        >* {{ errFirst }} *</small
      >
      <div class="form-group">
        <label>Last Name</label>
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          placeholder="นามสกุล"
        />
      </div>
      <small v-show="errLast" style="color:red;" class="alert-text thai"
        >* {{ errLast }} *</small
      >
      <div class="form-group">
        <label>Role</label>
        <multiselect
          v-model="value"
          deselect-label="Can't remove this value"
          track-by="group"
          label="role"
          placeholder="Select Role"
          :options="options"
          :searchable="false"
          :allow-empty="false"
        >
        </multiselect>
      </div>
      <div class="myBtn">
        <button type="submit" class="btn">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      value: { group: 3, role: 'Customer' },
      options: [{ group: 1, role: 'Owner' }, { group: 3, role: 'Customer' }],
      username: null,
      password: null,
      email: null,
      firstname: null,
      lastname: null,
      groups: [],
      errUser: '',
      errPass: '',
      errEmail: '',
      errFirst: '',
      errLast: ''
    }
  },
  methods: {
    onSubmit: async function(evt) {
      evt.preventDefault()
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/v1/register/`,
          {
            username: this.username,
            password: this.password,
            email: this.email,
            first_name: this.firstname,
            last_name: this.lastname,
            groups: [this.value.group]
          }
        )
        this.$router.replace('login')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(JSON.parse(err.request.response))
        const errObj = JSON.parse(err.request.response)
        if ('username' in errObj) {
          this.errUser = 'โปรดกรอกชื่อผู้ใช้'
        } else {
          this.errUser = ''
        }
        if ('password' in errObj && errObj.password[0].includes('null')) {
          this.errPass = 'โปรดกรอกพาสเวิร์ด'
        } else if ('password' in errObj && errObj.password[0].includes('8')) {
          this.errPass = 'พาสเวิร์ดต้องมากกว่า 8 ตัวอักษร'
        } else {
          this.errPass = ''
        }
        if ('email' in errObj) {
          this.errEmail = 'โปรดกรอก email'
        } else {
          this.errEmail = ''
        }
        if ('first_name' in errObj) {
          this.errFirst = 'โปรดกรอกชื่อ'
        } else {
          this.errFirst = ''
        }
        if ('last_name' in errObj) {
          this.errLast = 'โปรดกรอกนามสกุล'
        } else {
          this.errLast = ''
        }
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
.myBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
