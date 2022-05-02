<template>
  <div class="box2">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Upload</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">ลบรูป</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ชื่อเรื่อง</label>
        <div class="control">
          <input v-model="title" class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div class="field">
        <label class="label">เรื่องย่อ</label>
        <div class="control">
          <textarea v-model="synopsis" class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>
      <label class="label"> ประเภทหนังสือ</label>
      <div class="field">
        <div class="control">
          <label class="radio">
            <input name="type" v-model="type" type="radio" value="1" />
            มังงะ
          </label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="radio">
            <input name="type" v-model="type" type="radio" value="2"/>
            นิยาย
          </label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="radio">
            <input name="type" v-model="type" type="radio" value="3"/>
            นิยายแปล
          </label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="radio">
            <input name="type" v-model="type" type="radio" value="4"/>
            หนังสือเด็ก
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitBlog" class="button is-link">เพิ่มหนังสือ</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">ยกเลิก</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [], // array of image
      title: "",
      synopsis: "",
      pinnedBlog: false,
      statusBlog: "01",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBlog() {
      let formData = new FormData();
      formData.append("title", this.titleBlog);
      formData.append("content", this.contentBlog);
      formData.append("pinned", this.pinnedBlog ? 1 : 0);
      formData.append("status", "01");
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      // Note ***************
      // ตอนเรายิง Postmant จะใช้ fromData
      // ตอนยิงหลาย ๆ รูปพร้อมกันใน Postman จะเป็นแบบนี้

      // title   | "This is a title of blog"
      // comment | "comment in blog"
      // ...
      // myImage | [select file 1]
      // myImage | [select file 2]
      // myImage | [select file 3]

      // จะสังเกตุว่าใช้ myImage เป็น key เดียวกัน เลยต้องเอามา loop forEach
      // พอไปฝั่ง backend มันจะจัด file ให้เป็น Array เพื่อเอาไปใช้งานต่อได้

      axios
        .post("http://localhost:3000/blogs", formData)
        .then((res) => this.$router.push({name: 'home'}))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>