<template>
  <div>
    <div class="box3 content">
      <div class="columns is-centered box3 content">
        <figure class="image is-128x128" v-if="user.grade == 'Bronze'">
          <img
            class="is-rounded"
            style="border: 10px solid #c5d8a4"
            src="http://localhost:5000/static/uploads/b.jpg"
          />
        </figure>
        <figure class="image is-128x128" v-if="user.grade == 'Silver'">
          <img
            class="is-rounded"
            style="border: 10px solid #c5d8a4"
            src="http://localhost:5000/static/uploads/s.jpg"
          />
        </figure>
        <figure class="image is-128x128" v-if="user.grade == 'Gold'">
          <img
            class="is-rounded"
            style="border: 10px solid #c5d8a4"
            src="http://localhost:5000/static/uploads/g.jpg"
          />
        </figure>
      </div>
      <br />
      <div class="columns is-centered">
        <h3>{{ user.fname }} {{ user.lname }}</h3>
      </div>
      <br />
      <div class="columns is-centered">
        <h5>Email: {{ user.email }}</h5>
      </div>
      <br />
      <div class="columns is-centered">
        <h5>RANK: {{ user.grade }}</h5>
      </div>
    </div>
    <div class="box2 content">
      <h1>e-book ของเรา♥</h1>
    </div>
    <div>
      <div class="box3 is-max-desktop">
        <div class="is-multiline columns is-variable is-2">
            <div
              id="card_product"
              class="column is-one-quarter"
              v-for="userBook in e_books"
              :key="userBook.eid"
            >
                <div class="card">
                <div class="card-image">
                 <figure class="image">
                    <img
                      style="
                        width: 100%;
                        aspect-ratio: 1/1;
                        object-fit: cover;
                        object-position: top;
                      "
                      :src="imagePath(userBook.imageOfEbook)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ userBook.title }}</p>
                      <p class="subtitle is-6" style="color: gray">
                        แต่งโดย {{ userBook.author_name }}
                      </p>
                      <p class="subtitle is-6">
                        ประเภทหนังสือ
                        {{ userBook.type_name }}
                      </p>
                      <p class="subtitle is-6; color: gray">
                        ราคา {{ userBook.price }} บาท
                      </p>
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
<script>
import axios from "@/plugins/axios";
export default {
  props: ["user"],
  data() {
    return {
      search: "",
      userBook: [],
    };
  },
  mounted() {
    this.getUserBook();
  },
  methods: {
      getUserBook() {
      axios
        .get("http://localhost:5000/mybook")
        .then((response) => {
          this.userBook = response.data;
          console.log(this.userBook);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
