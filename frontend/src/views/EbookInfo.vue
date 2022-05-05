<template>
  <div>
      <div>
    <div class="columns">
      <div class="column is-5 box3 content m-3 ml-4 p-4" style="height:fit-content">
        <figure class="image">
                  <img :src="'http://localhost:5000/' + ebook.imageOfEbook"/>
                </figure>
      </div>
      <div class="column is-5 box3 content m-3 ml-4" style="height:fit-content"></div>
        <h1>{{ ebook.title }}</h1>
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
  },
};
</script>
