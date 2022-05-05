<template>
  <section
    class="hero is-primary is-fullheight"
    style="background-color: #bb9981"
  >
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div>
            <form class="box content">
              <h1>เปลี่ยนรหัสผ่าน♥</h1>

              <p
                v-if="error"
                class="
                  px-3
                  py-2
                  mb-3
                  has-text-danger-dark has-background-danger-light
                "
              >
                {{ error }}
              </p>

              <div class="field">
                <label for="" class="label">รหัสผ่านเดิม</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    v-model="password"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">รหัสผ่าน</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    v-model="new_password"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button
                  class="button is-success"
                  style="background-color: #e9efc0; color: #534340"
                  type="button"
                  @click="submit"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      password: "",
      new_password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      console.log("test");
       const data = {
         username: this.username,
         password: this.password
       }

       axios
        .post('http://localhost:5000/change_password', {
            data:this.user.customer_id
        })
         .then(res => {
             alert('เปลี่ยนรหัสผ่านสำเร็จ')
           this.$router.push({path: '/'})
         })
         .catch(error => {
           this.error = error.response.data
           console.log(error.response.data)
         })
    },
  },
};
</script>

<style scoped>
#login {
  width: 500px;
  background-color: #f4fcd9;
  border: 100px solid #c5d8a4;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>