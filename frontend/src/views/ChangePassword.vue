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
                    type="password"
                    v-model="password"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">รหัสผ่านใหม่</label>
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
                <label for="" class="label">ยืนยันรหัสผ่านใหม่</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    v-model="con_new_password"
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
import useVuelidate from "../../node_modules/@vuelidate/core";
import { required } from "../../node_modules/@vuelidate/validators";
export default {
  props: ['user'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      password: "",
      new_password: "",
      con_new_password:"",
      error: "",
    };
  },
  validations() {
    return {
      new_password: { required },
      con_new_password: { required },
      password: { required },
    };
  },
  methods: {
    submit() {
      if (this.v$.$invalid) {
        return alert("กรุณาตรวจสอบข้อมูลให้ดีด้วยน้า");
      }
      // console.log("test");
       const data = {
         password: this.password,
         new_password: this.new_password,
         customer_id:this.user.customer_id,
         con_new_password:this.con_new_password
       }

       axios
        .put('http://localhost:5000/change_password', data)
         .then((res) => {
             alert(res.data.message)
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