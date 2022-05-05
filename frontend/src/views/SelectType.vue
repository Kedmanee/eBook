<template>
  <div>
      <div class="box2 content">
      <h1 v-if="this.$route.params.type_id == 2">นิยาย</h1>
      <h1 v-if="this.$route.params.type_id == 3">นิยายแปล</h1>
      <h1 v-if="this.$route.params.type_id == 4">หนังสือเด็ก</h1>
      <h1 v-if="this.$route.params.type_id == 1">มังงะ</h1>
    </div>
    <div>
      <div class="box3 is-max-desktop">
        <div class="is-multiline columns is-variable is-2">
          <!-- Card element start here------------------------------------------>
          <div
            id="card_product"
            class="column is-one-quarter"
            v-for="ebook in e_books"
            :key="ebook.eid"
          >
            <div class="card">
              <div class="card-image">
                <router-link :to="{ path: `/ebookInfo/${ebook.eid}` }">
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
                    /></figure
                ></router-link>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{ ebook.title }}</p>
                    <p class="subtitle is-6" style="color: gray">
                      แต่งโดย {{ ebook.author_name }}
                    </p>
                    <p class="subtitle is-6">
                      ประเภทหนังสือ
                      {{ ebook.type_name }}
                    </p>
                    <p class="subtitle is-6; color: gray">
                      ราคา {{ ebook.price }} บาท
                    </p>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <div class="icon is-size-4">
                      <i
                        class="fas fa-shopping-cart"
                        style="color: #534340"
                        @click="addToCart(ebook.eid)"
                        v-if="user && user.type == 'customer'"
                      ></i>
                    </div>

                    <div style="display: flex; justify-content: space-between">
                      <div class="icon is-size-4">
                        <i
                          @click="deleteEbook(ebook.eid)"
                          class="fa fa-trash"
                          v-if="user && user.type == 'admin'"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  props: ["user"],
  data() {
    return {
      search: "",
      e_books: [],
    };
  },
  mounted() {
    this.getBook();
    console.log(this.$route.params)
  },
  methods: {
      async getBook() {
    await axios
      .get(`http://localhost:5000/type/${this.$route.params.type_id}`)
      .then((response) => {
          this.e_books = response.data;
          console.log(this.e_books);
        })
      .catch((err) => {
        alert(err.response.data.message);
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
        id: this.user.customer_id,
      })
      .then((res) => {
        alert("Add to cart success");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  },
  deleteEbook(eBook) {
    const result = confirm(`Are you sure you want to delete`);
    if (result) {
      axios
        .delete(`http://localhost:5000/ebook/${eBook}`)
        .then((response) => {
          this.e_books = this.e_books.filter((e) => e.eid !== eBook);
          alert("Delete success");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  },
  showThisEbook(ebook) {
    axios
      .get(`http://localhost:5000/selectBook/${ebook}`)
      .then((res) => {
        this.$router.push("/ebookInfo");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  },
  }
};
</script>
 