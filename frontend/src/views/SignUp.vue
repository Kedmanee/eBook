
<template>
  <container>
    <main class="box content">
      <div class="container-signUp">
        <h1>สมัครสมาชิก</h1>
        <div class="field">
          <label class="label">ชื่อ - นามสกุล </label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="ตัวอย่าง สมชาย มะนาวดอง"
              v-model="name"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">ชื่อผู้ใช้</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="ตัวอย่าง somchai3310"
              v-model="username"
              id="name"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">รหัสผ่าน</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="password"
              placeholder="*******"
              v-model="password"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">เบอร์โทรศัพท์</label>
          <div class="control">
            <input
              class="input"
              type="varchar"
              placeholder="ตัวอย่าง 098xxxxxxx"
              id="phone"
              v-model="phone"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">อีเมล</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="ตัวอย่าง somchai1234@gmail.com"
              v-model="email"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">เพศ</label>
          <div class="control">
            <div class="select">
              <select v-model="sex">
                <option>ชาย</option>
                <option>หญิง</option>
                <option>ไม่ระบุ</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">วัน/เดือน/ปีเกิด</label>
          <form>
            <input type="date" id="birthday" name="birthday" v-model="date" />
          </form>
        </div>

        <div class="field">
          <div class="control"></div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button"
              style="background-color: #e9efc0"
              @click="submit()"
            >
              สมัคร
            </button>
          </div>
          <div class="control">
            <button
              class="button is-light"
              style="background-color: #e9efc0"
              @click="cancel()"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </main>
  </container>
</template>
<script>
import axios from '@/plugins/axios'
import useVuelidate from "../../node_modules/@vuelidate/core";
import { required, email } from "../../node_modules/@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      username: "",
      password: "",
      email: "",
      sex: "",
      phone: "",
      date: "",
    };
  },
  methods: {
    submit() {
      this.v$.$validate()

      if(this.v$.$error) {
        return alert("กรุณาใส่ข้อมูลให้ครบด้วยน้า")
      }

      let data = {
        name: this.name,
        username: this.username,
        password: this.password,
        email: this.email,
        sex: this.sex,
        phone: this.phone,
        date: this.date,
      };
      axios
        .post("http://localhost:5000/user/signup", data)
        .then((res) => {
          alert("Sign up Success !!");
          this.$router.push("/login");
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
    cancel() {
      this.$router.push("/");
    },
  },
  validations() {
    return {
      // name: {required},
      // password: {required},
      // email: { required, email }, // Matches this.contact.email
    };
  },
};
</script>