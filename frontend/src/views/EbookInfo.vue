<template>
  <div>
      <div class="box2 content">
    <h1>This is an about page</h1>
  </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "home",
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
        .get("http://localhost:5000/ebook")
        .then((res) => {
          this.ebook = res.data;
          console.log(".............................................")
          console.log(this.ebook)
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
