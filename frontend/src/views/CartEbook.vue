<template>
  <div>
    <div v-for="(item, index) in cart_items" class="card mb-4" :key="item.item_no">
      <div class="card-content p-10">
        <div class="media">
          <div class="media-left">
            <figure class="image is-1                          by3">
              <img :src="'http://localhost:5000/' + item.imageOfEbook" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content pt-2">
            <p class="is-5">{{ item.title }}</p>
            <p class="has-text-grey-light is-6">{{ item.synopsis }}</p>
            <div style="display: flex; justify-content: space-between">
              <div>
                <!-- ราคาสินค้า------------------------------------------------ -->
                <span class="is-6 has-text-danger">{{ item.price }}</span>
              </div>
              <div>
                <!-- icon รูปถังขยะ------------------------------------------- -->
                <span
                  class="icon mr-2"
                  key="false"
                  @click="removeFromCart(index)"
                >
                  <i class="far fa-trash-alt"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="display: flex; justify-content: space-between; font-size: 1.25rem"
    >
      <span class="has-text-weight-bold">Total</span>
      <span id="totalPrice">{{ totalPrice }}</span>
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
      cart_items: [],
    };
  },
  mounted() {
    this.getBook();
 
  },
  methods: {
    async getBook(){
      await axios
        .get("http://localhost:5000/cart/show")
        .then((res) => {
          this.cart_items = res.data
          console.log(this.cart_items)
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
};
</script>
