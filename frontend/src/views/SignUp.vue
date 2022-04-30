
<template>
  <container>
    <main class="box content">
      <div class="container-signUp">
        <h1>สมัครสมาชิก</h1>
        <div class="field">
          <label class="label">ชื่อ - นามสกุล </label>
          <div class="control">
            <input class="input" type="text" placeholder="ตัวอย่าง สมชาย มะนาวดอง" v-model="name" />
          </div>
        </div>

        <div class="field">
          <label class="label">ชื่อผู้ใช้</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="ตัวอย่าง somchai3310" v-model="username"
              id="name" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <p class="help is-success">ชื่อผู้ใช้สามารถใช้ได้</p>
        </div>
        <div class="field">
          <label class="label">รหัสผ่าน</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password" placeholder="Text input" v-model="password" />
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
            <input class="input" type="varchar" placeholder="ตัวอย่าง 098xxxxxxx" id="phone" v-model="phone" />
          </div>
        </div>
        <div class="field">
          <label class="label">อีเมล</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="ตัวอย่าง somchai1234@gmail.com" v-model="email" />
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
            <button class="button is-link" @click="submit()">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  </container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      email: "",
      sex: "",
      phone: "",
      date: ""
    }
  },
  methods: {
    submit() {
      // Validate all fields

      // เช็คว่าในฟอร์มไม่มี error
      let data = {
        name: this.name,
        username: this.username,
        password: this.password,
        email: this.email,
        sex: this.sex,
        phone: this.phone,
        date: this.date
      };
      axios
        .post("http://localhost:5000/user/signup", data)
        .then((res) => {
          alert("Sign up Success");
          this.$router.push("/")
        })
        .catch((err) => {
          alert(err)
        });
    },
  },
};
</script>