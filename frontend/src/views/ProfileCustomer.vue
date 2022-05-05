<template>
  <div>
    <div class="box3 content">
      <div class="columns is-centered box3 content">
        <figure class="image is-128x128">
          <img
            class="is-rounded"
            style="border: 10px solid #c5d8a4"
            src="http://localhost:5000/static/uploads/avo.jpg"
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
      <div class="columns is-centered">
          <h5 style="color:#FFD700">Rank: GOLD</h5>
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
      userInfo: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:5000/user/show")
        .then((response) => {
          this.userInfo = response.data;
          console.log(this.e_books);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
