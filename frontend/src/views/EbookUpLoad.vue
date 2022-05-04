<template>
  <div class="box2 content">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">เพิ่มหนังสือ</p>
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
              <figure class="image is-63x63">
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
          <input v-model="title" class="input" type="text"/>
        </div>
      </div>

      <div class="field">
        <label class="label">เรื่องย่อ</label>
        <div class="control">
          <textarea v-model="synopsis" class="textarea"></textarea>
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">ผู้แต่ง</label>
        <div class="control">
          <input v-model="author" class="input" type="text"/>
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">ราคา</label>
        <div class="control">
          <input v-model="price" class="input" type="text"/>
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
          <button @click="submit" class="button is-link">เพิ่มหนังสือ</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">ยกเลิก</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      images: [], // array of image
      title: "",
      synopsis: "",
      type: "1",
      author: "",
      price:0,
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submit() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("author", this.author);
      formData.append("synopsis", this.synopsis);
      formData.append("type", this.type);
      formData.append("price", this.price);
      console.log(this.images[0])
      formData.append("myImage", this.images[0]);
      axios
        .post("http://localhost:5000/ebook/upload", formData)
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log('err')
          alert(err.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>