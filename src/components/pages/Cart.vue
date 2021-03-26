<template>
<div>
    <!-- <div class="container mt-5" >
        <div class="h1 text-center"><strong>六角血拚 訂單確認</strong></div>
        <div class="row mt-3">
            <div class="col-12 col-md">
                <div class="alert alert-success alert-rounded text-center" role="alert">1.輸入訂單資料</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">2.金流付款</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">3.訂單完成</div>
            </div>
        </div>
        </div> -->
    <loading :active.sync="isLoading"></loading>
    <div class="container">
        <div class="h3 carttitle m-3 text-center">我的購物車</div>
	<table id="cart" class="table table-hover">
    <thead>
	　　<tr>
            <th scope="col">商品圖片</th>
			<th scope="col">商品名稱</th>
            <th scope="col">數量</th>
            <th scope="col">刪除</th>
			<th scope="col" class="text-right">小計</th>
		</tr>
	</thead>
	　　<tbody v-if="cart.carts">
		<tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
                <div class="row">
				<div class="col-sm-2 hidden-xs"><img style="height:100px" v-bind:src="item.product.imageUrl" v-bind:class="className"></div>
				</div>
            </td>
            <td class="align-middle">{{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
			<td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"><i class="fas fa-trash"></i></button>
            </td>
            <td class="align-middle text-right">
                <div v-if="cart.final_total == cart.total">NT ${{ item.total }}</div>
                <div v-if="cart.final_total !== cart.total" style="text-decoration:line-through">NT${{item.total}}</div>
                <div class="text-success" v-if="cart.final_total !== cart.total">NT ${{ parseInt(item.final_total) }}</div>
            </td>
            <!-- <td v-if="cart.final_total !== cart.total" class="align-middle text-right">NT ${{ item.final_total }}</td> -->
            </tr>
            </tbody>
            <!-- <tfoot>
                <tr>
                    <td colspan="4" class="text-right">總計</td>
                    <td class="text-right">{{cart.total}}</td>
                </tr>
            <tr v-if="cart.final_total !== cart.total">
                <td colspan="4" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
        </tfoot> -->
	</table>
    <div class="h3 carttitle2 m-3 text-center">訂單小計</div>
    <div class="inputcoupon">
            <p class="inputtitle">優惠券</p>
            <p class="inputtitle2">如果您有抽到專屬優惠券，請在下方輸入優惠券代碼</p>
        </div>
    <div class="input-group mb-3">
        <input type="text"  class="form-control" v-model="coupon_code" placeholder="請輸入優惠券代碼">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
            </button>
        </div>
        </div>

        <div class="total1">
        <span>原總價</span>
        <span v-if="cart.final_total == cart.total">NT${{cart.total}}</span>
        <span v-if="cart.final_total !== cart.total" style="text-decoration:line-through">NT${{cart.total}}</span>
    </div>
    <div v-if="cart.final_total !== cart.total" class="total2">
        <span>折扣價</span>
        <!-- <span v-if="cart.final_total !== cart.total">NT${{cart.final_total}}</span> -->
        <span v-if="cart.final_total !== cart.total">NT ${{ parseInt(cart.final_total) }}</span>
    </div>
        <div class="botcart">
            <router-link to="/user/checkout"><button class="btn btn-danger" type="button">前往結帳</button></router-link>
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
    // className:'img-fluid',
    products: [],    
    product:{},
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
        $('#productModal').modal('show');
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
    this.$swal('已刪除商品');
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
created() {
    this.getProducts();
    this.getCart();
}
};
</script>