<template>
  <div class="container">
    <form class="myForm">
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
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="รหัสผ่าน"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="อีเมล"
        />
      </div>
      <div class="form-group">
        <label>First Name</label>
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          placeholder="ชื่อ"
        />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          placeholder="นามสกุล"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click="signIn">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      groups: []
    }
  },
  methods: {
    signIn() {}
  }
}
</script>

<style scoped>
.myForm {
  width: 350px;
  margin: auto;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
}
</style>
