<template>
  <div>
    <div class="box2 content">
      <h1>ตะกร้าของฉัน♥</h1>
    </div>
    <div class="columns is-centered">
      <div class="column is-5 box2 content m-0">
        <div v-for="item in cart_items" class="card mb-4" :key="item.item_no">
          <div class="card-content p-10">
            <div class="media">
              <div class="media-left">
                <figure class="image">
                  <img :src="'http://localhost:5000/' + item.imageOfEbook" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content pt-2">
                <p class="is-5">{{ item.title }}</p>
                <p class="has-text-grey-light is-6">{{ item.synopsis }}</p>
                <div style="display: flex; justify-content: space-between">
                  <div>
                    <span class="is-6 has-text-danger">{{ item.price }} บาท</span>
                  </div>
                  <div class="icon is-size-4">
                    <i
                      @click="deleteCartEbook(item.item_no)"
                      class="fa fa-trash"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 v-if="cart_items.length == 0" style="position: relative; top: 50%; transform: translateY(-50%);">ยังไม่มี E-book เลย
        </h1>
      </div>
      <div class="column is-5 box3 content m-0 ml-4 p-4" style="height:fit-content">
        <h1>ชำระเงิน♥</h1>
        <div class="columns has-text-centered">
          <div class="column">
            <h4>หนังสือครบไหมนะ?</h4>
            <div v-for="item in cart_items" :key="item.item_no">
              ♥ {{ item.title }} 
            </div>
            <br>
            <h5>รวม {{ total_price }} บาท </h5>
            <router-link to="/">
              <button class="button is-info" style="background-color:#percent;" href="/">♥เลือก E-book เพิ่มเติม♥</button>
            </router-link>
            <button class="button ml-2 is-success" style="background-color:#percent;" @click="payForEbook()">ชำระเงินที่นี่♥</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content figure {
  margin-left: 2em;
  margin-right: 2em;
  text-align: center;
  height: auto;
  width: 150px;
}
</style>
<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  props: ["user"],
  data() {
    return {
      cart_items: [],
      total_price: 0,
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    async getCart() {
      await axios
        .get(`http://localhost:5000/cart/show/${this.user.customer_id}`)
        .then((res) => {
          this.cart_items = res.data;
          if (this.cart_items[0]) {
            this.total_price = this.cart_items[0].total_price
          }
          console.log(this.cart_items);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //ลบนส.จากตะกร้าตรงนี้นะเพื่อน
    deleteCartEbook(ebook) {
      const result = confirm(
        `Are you sure you want to delete`
      );
      if (result) {
        axios
          .delete(`http://localhost:5000/cart/del/${ebook}`)
          .then((response) => {
            this.cart_items = this.cart_items.filter((e) => e.item_no !== ebook);
            let totalPrice = 0
            this.cart_items.map(item => {
              totalPrice += item.unit_price
            })
            this.total_price = totalPrice
          })
          .catch((error) => {
            alert(error.response.data.message)
          });
      }
    },
    //อันนี้กุส่งมั่ว ไปนอนแระบาย
    payForEbook() {
      const result = confirm(
        `Are you sure you want to pay`
      );
      if (result) {
        axios
          .post(`http://localhost:5000/cart/pay`, {
            cart: this.cart_items[0].cart_id,
          })
          .then((res) => {
            this.cart_items = []
            this.total_price = 0
            alert("Add to your collection");
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }
    },
  },
};
</script>
