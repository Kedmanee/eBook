<template>
  <div>
    <div>
      <div class="columns is-centered" style="padding:50px">
        <div class="column is-5 box2 content m-0">
          <div class="image">
            <img :src="'http://localhost:5000/' + ebook.imageOfEbook" />
          </div>
        </div>
        <div
          class="column is-5 box3 content m-3 ml-4 "
          style="height: fit-content">
          <h1>{{ ebook.title }}</h1>
          <div class="columns">
            <div class="column is-6 has-text-centered">
              <h6>ผู้แต่ง: {{ ebook.author_name }}</h6>
            </div>
            <div class="column is-6 has-text-centered">
              <h6>หนังสือประเภท: {{ ebook.type_name }}</h6>
            </div>
          </div>
          <div class="column has-text-centered">
              <h3>♥เนื้อเรื่องย่อ♥</h3>
            </div>
            <div class="has-text-centered">
              <h6>{{ ebook.synopsis }}</h6>
              <br>
            </div><div class="columns is-centered">
            <a class="button" style="background-color: #534340; color: white"
                          @click="addToCart(ebook.eid)"
                          v-if="user && user.type == 'customer'">ใส่ตะกร้า {{ebook.price}} บาท</a></div>
                          <br>
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  props: ["user"],
  data() {
    return {
      ebook: [],
      total_price: 0,
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    async getBook() {
      await axios
        .get(`http://localhost:5000/selectBook/${this.$route.params.ebook_id}`)
        .then((res) => {
          this.ebook = res.data[0];
          console.log(this.ebook);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
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
  },
};
</script>
