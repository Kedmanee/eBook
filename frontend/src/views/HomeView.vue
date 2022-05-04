<template>
  <main>
    <div class="box2 content">
      <h1>หนังสือใหม่</h1>
    </div>
    <div class="columns is-multiline p-5">
      <div class="column is-3" v-for="ebook in e_books" :key="ebook.eid">
        <div class="card" style="width: 100%" @click="getEbook">
          <div class="card-image">
            <figure class="image">
              <img
                style="
                  width: 100%;
                  aspect-ratio: 1/1;
                  object-fit: cover;
                  object-position: top;
                "
                :src="imagePath(ebook.imageOfEbook)"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="card-content" style="height: 300px">
            <div class="title">{{ ebook.title }}</div>
            <div class="content" style="word-break: break-all">
              {{ ebook.author_name }}
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
            <a @click="addToCart(ebook.eid )" class="card-footer-item">add to cart</a>
            <a href="#" class="card-footer-item" 
              >Delete</a
            >
          </footer>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "home",
  props: ['user'],
  data() {
    return {
      search: "",
      e_books: [],
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    getBook() {
      axios
        .get("http://localhost:5000/eBook")
        .then((response) => {
          this.e_books = response.data;
          console.log(this.e_books);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(imageOfEbook) {
      if (imageOfEbook) {
        return "http://localhost:5000/" + imageOfEbook;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    addToCart(eBook) {
        axios
        .post(`http://localhost:5000/cart/add/${eBook}`, {
          id:this.user.customer_id
        })
        .then(res => {
           alert("Add to cart success")
         })
        .catch((err) => {
          alert(err.response.data)
        });


      
    },
    // shortContent(content) {
    //   if (content.length > 200) {
    //     return content.substring(0, 197) + "...";
    //   }
    //   return content;
    // },
  },
};
</script>
