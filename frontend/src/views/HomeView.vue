<template>
  <main>
    <div class="box2 content">
    <h1>หนังสือใหม่</h1>
    </div>
    <div class="columns is-multiline">
          <div class="column is-3" v-for="ebook in e_books" :key="ebook.eid">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img style="height: 120px" :src="imagePath(ebook.imageOfEbook)" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ ebook.title }}</div>
                <div class="content" style="height: 200px;">{{ shortContent(ebook.synopsis) }}</div>
              </div>
            </div>
          </div>
        </div>
  </main>
</template>
<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      search: '',
      e_books: [],
    };
  },
  mounted () {
    this.getBlogs()
  },
  methods: {
    getBlogs() {
      axios

        .get("http://localhost:5000/eBook")
        .then((response) => { 
          this.e_books = response.data;
          console.log(this.e_books)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(imageOfEbook) {
      if (imageOfEbook){
        return 'http://localhost:3000/' + imageOfEbook
      } 
      else {
        return 'https://bulma.io/images/placeholders/640x360.png'
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + '...'
      }
      return content
    },
  },
};
</script>
