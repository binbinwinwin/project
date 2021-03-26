<template>
<div>
    <loading :active.sync="isLoading"></loading>
<div class="container mt-5">
    <div class="row">
        <div class="col-12 col-sm-3" >
            <div class="card bg-light mb-3">
                <div class="card-header bg-info text-white"><i class="fa fa-list"></i> 產品列表</div>
                <ul class="list-group">
                    <li class="list-group-item" :class="{'active': visibility == 'all'}" @click="visibility = 'all'"><a class="font-weight-bold text-dark"  href="#"><i class="fas fa-dog"></i> 全部商品</a></li>
                    <li class="list-group-item" :class="{'active': visibility == 'products'}" @click="visibility = 'products'"><a class="font-weight-bold text-dark" href="#"><i class="fas fa-cat"></i> 寵物用品</a></li>
                    <li class="list-group-item" :class="{'active': visibility == 'toys'}"  @click="visibility = 'toys'"><a class="font-weight-bold text-dark" href="#"><i class="fas fa-dog"></i> 寵物玩具</a></li>
                    <li class="list-group-item" :class="{'active': visibility == 'feeds'}"  @click="visibility = 'feeds'"><a class="font-weight-bold text-dark" href="#"><i class="fas fa-cat"></i> 寵物飼料</a></li>
                    <li class="list-group-item" :class="{'active': visibility == 'bed'}"  @click="visibility = 'bed'"><a class="font-weight-bold text-dark" href="#"><i class="fas fa-cat"></i> 寵物床鋪</a></li>
                </ul>
            </div>
        </div>
        
        <div class="col">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredTodos" :key="item.id">
                    <div class="card mb-3 product">
                        <div style="height:250px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}" @click="getProduct(item)"></div>
                        <br>
                        <div class="card-body">
                            <span class="card-title font-weight-bold h4">{{item.title}}</span>
                            <span class="ml-3 productscategory" href="#">{{item.category}}</span>
                            <div class="row">
                                <div class="col">
                                    <p class="productsprice1">限時優惠$ <span class="productsprice2">{{item.price}}元</span></p>
                                </div>
                                <!-- <p><router-link to="/user/productdetail" class="nav-link">商品細節</router-link></p> -->
                                <!-- <div class="card-footer">
                                    <button type="button" class="btn btn-outline-secondary " @click="getProduct(item)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>查看更多</button>
                                    <button type="button" class="btn btn-outline-danger " @click="addtoCart(item)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>加到購物車</button>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addtoCart(product, product.num)">                    
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                    </button>
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
    getProduct(item){
    const vm = this;
    const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${item.id}`;
    vm.status.loadingItem = item.id;
    this.$http.get(url).then(response => {
        vm.product = response.data.product;
        // $('#productModal').modal('show');
        vm.$router.push(`/user/productdetail/${item.id}`);
        console.log(response);
        vm.status.loadingItem = '';
    });
    },
    addtoCart(item,qty=1){
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
    else if(this.visibility == 'bed'){
        var newProducts = [];
        this.products.forEach(function(item){
            if(item.category == '寵物床鋪'){
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
    }
};
</script>