<template>
  <div>
    <div class="box2 content">
      <h1>ตะกร้าของฉัน♥</h1>
    </div>
    <div class="columns">
      <div class="column is-5 box2 content">
        <div v-for="item in cart_items" class="card mb-4" :key="item.item_no">
          <div class="card-content p-10">
            <div class="media">
              <div class="media-left">
                <figure class="image">
                  <img
                    :src="'http://localhost:5000/' + item.imageOfEbook"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content pt-2">
                <p class="is-5">{{ item.title }}</p>
                <p class="has-text-grey-light is-6">{{ item.synopsis }}</p>
                <div style="display: flex; justify-content: space-between">
                  <div>
                    <span class="is-6 has-text-danger"
                      >{{ item.price }} บาท</span
                    >
                  </div>
                  <div class="icon is-size-4">
                    <i @click="deleteCartEbook(item.item_no)" class="fa fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6 box3 content">
        <h1>ชำระเงิน♥</h1>
        <div class="columns">
          <div class="column is-6">
            <h4>หนังสือครบไหมนะ?</h4>
            <div v-for="item in cart_items" :key="item.item_no">
              {{ item.title }} ♥
            </div>
            <br>
            <h5>รวม  {{total_price}} บาท </h5>
            <button class="button" style="background-color:#percent;" @click="payForEbook()">ชำระเงินที่นี่♥</button>
          </div>
          <div class="column is-6 box2">
             <a class="button" style="background-color:#percent;" href="/">♥เลือก E-book เพิ่มเติม♥</a>
              <br>
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
  name: "home",
  props: ["user"],
  data() {
    return {
      cart_items: [],
      total_price: 0,
};
  },
  mounted() {
    this.getBook();
  },
  methods: {
    async getBook() {
      await axios
        .get("http://localhost:5000/cart/show"), {
          id: this.user.customer_id,
        }
        .then((res) => {
          this.cart_items = res.data;
          if(this.cart_items[0]){
            this.total_price = this.cart_items[0].total_price
          }
          console.log(this.cart_items);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //ลบนส.จากตะกร้าตรงนี้นะเพื่อน
    deleteCartEbook(ebook) {
      const result = confirm(
        `Are you sure you want to delete`
      );
      if (result){
        axios
        .delete(`http://localhost:5000/cart/del/${eBook}`)
        .then((response) => {
          this.cart_items = this.cart_items.filter((e) => e.item_no !== eBook);
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
      }
    },
    //อันนี้กุส่งมั่ว ไปนอนแระบาย
    payForEbook(){
      const result = confirm(
        `Are you sure you want to pay`
      );
      if (result){
        axios
        .post(`http://localhost:5000/cart/pay`, {
          cart: this.cart_items[0].cart_id,
        })
        .then((res) => {
          alert("Add to your collection");
        })
        .catch((err) => {
          alert(err.response.data);
        });
      }
    }
  },
};
</script>
