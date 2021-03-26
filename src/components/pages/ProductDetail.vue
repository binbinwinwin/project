<template>
<div>
    <loading :active.sync="isLoading"></loading>
    
<div id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-5">
            <!--Carousel Wrapper-->
            <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails"
              data-ride="carousel">
              <!--Slides-->
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <img class="d-block w-100"
                    :src="product.imageUrl"
                    alt="First slide">
                </div>
              </div>
            </div>
            <!--/.Carousel Wrapper-->
          </div>
          <div class="col-lg-7">
            <h2 class="h2-responsive product-name">
              <strong>{{product.title}}</strong>
            </h2>
            <hr>
            <p class="text-dark">【產品說明】</p>
            <p class="text-dark">{{product.description}}</p>
            <h4 class="h4-responsive mt-3">
              <span class="text-success">
                <strong>NT${{product.price}}</strong>
              </span>
              <span class="text-secondary">
                <small>
                  <s>NT${{product.origin_price}}</s>
                </small>
              </span>
            </h4>
            <!-- Add to Cart -->
            <div>
              <div class="row">
                <div class="col-md-12">
                <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
              </div>
              <div class="h5 mt-3 text-danger text-right">
                    <strong>總計 : NT$ {{ product.num * product.price }}</strong> 元
                    </div>
                    <hr>
                    <button class="btn btn-dark">
                    <router-link to="/user/allproducts">               
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    查看其他商品
                    </router-link>
                    </button>
                    <button class="btn btn-dark float-right" 
                    @click="addtoCart(product, product.num)">                    
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                    </button>
            </div>
            <!-- /.Add to Cart -->
          </div>
          <div>
            <p class="productcontenttitle">商品介紹</p>
            <hr>
            <p class="productcontent pre-line">{{product.content}}</p>
          </div>
          <div class="producticon">
            <img src="./images/dog.png">DogeKat
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
<style lang="scss">
@import "../../assets/css_slider";
@import "../../assets/style";
@import "../../assets/dog";
</style>
<script>
import $ from 'jquery';

export default {
data() {
    return {
    products: [],    
    product:{},
    visibility:'all',
    status:{
        loadingItem:'',
    },
    form:{
        user:{
            name:'',
            email:'',
            tel:'',
            address:'',
        },
        message:'',
    },
    cart:{},
    isLoading: false,
    coupon_code:'',
    };
},
methods: {
    getProducts() {
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
    vm.isLoading = true;
    this.$http.get(url).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
    });
    },
    getProduct(id){
    const vm = this;
    id = this.$route.params.id;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
    vm.status.loadingItem = id;
    this.$http.get(url).then(response => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = '';
    });
    },
    addtoCart(item,qty=1){
    this.$swal('已加入購物車');
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
    vm.status.loadingItem = item.id;
    const cart = {
        product_id: item.id,
        qty,
    };
    this.$http.post(url,{data:cart}).then(response => {
        console.log(response);
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
    });
    this.$emit('increment');
    },
    getCart(){
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
    vm.isLoading = true;
    this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        vm.isLoading = false;
        console.log(response);
        // vm.products = response.data.products;
    });
    },
    removeCartItem(id){
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
    vm.isLoading = true;
    this.$http.delete(url).then(response => {
        vm.getCart();
        vm.isLoading = false;
    });
    },
    addCouponCode(){
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
    const coupon = {
        code: vm.coupon_code,
    };
    vm.isLoading = true;
    this.$http.post(url,{ data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
    });
    },
    // createCouponCode(){
    // const vm = this;
    // const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
    // const coupon = {
    //     title: 0,
    //     is_enabled: 1,
    //     percent: 80,
    //     due_date: 1555459200,
    //     code: 0,
    // };
    // vm.isLoading = true;
    // this.$http.post(url,{ data: coupon }).then(response => {
    //     console.log(response);
    //     vm.getCart();
    //     vm.isLoading = false;
    // });
    // },
    createOrder(){
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
    const order = vm.form;
    // vm.isLoading = true;
    this.$validator.validate().then((valid) => {
        if (valid) {
        this.$http.post(url,{data:order}).then(response => {
        console.log('訂單已建立',response);
        if(response.data.success){
            vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        // vm.getCart();
        vm.isLoading = false;
    });
        }else{
            console.log('欄位不完整');
        }
    });
    },
},
computed: {
    filteredTodos: function(){
    if (this.visibility == 'all'){
    return this.products;
    }else if(this.visibility == 'products'){
        var newProducts = [];
        this.products.forEach(function(item){
            if(item.category == '寵物用品'){
                newProducts.push(item);
            }
        })
        return newProducts;
    }
    else if(this.visibility == 'toys'){
        var newProducts = [];
        this.products.forEach(function(item){
            if(item.category == '寵物玩具'){
                newProducts.push(item);
            }
        })
        return newProducts;
    }
    else if(this.visibility == 'feeds'){
        var newProducts = [];
        this.products.forEach(function(item){
            if(item.category == '寵物飼料'){
                newProducts.push(item);
            }
        })
        return newProducts;
    }
    return [];
    }
},
created() {
    this.getProducts();
    this.getCart();
    this.getProduct();
    }
};
</script>