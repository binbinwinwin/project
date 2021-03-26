<template>
    <div class="checkout">
        <loading :active.sync="isLoading"></loading>
        <!-- <div class="container">
        <div class="row">
        <div class="col-md-6 mb-5">
        <div class="h3 m-3 text-center">訂單確認</div>
	<table id="cart" class="table">
    <thead>
	　　<tr>
            <th>商品圖片</th>
			<th>商品名稱</th>
            <th>數量</th>
			<th class="text-right">總計</th>
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
            <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{cart.total}}</td>
                </tr>
            <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
        </tfoot>
	</table>
    </div>
    </div>
</div> -->

<div class="container mt-5">
        <div class="h1 text-center"><strong>輸入購買資料</strong></div>
        <div class="row mt-3 col-md-8 midtable">
            <div class="col-12 col-md">
                <div class="alert alert-success alert-rounded text-center" role="alert">1.輸入購買資料</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">2.訂單確認</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">3.訂單完成</div>
            </div>
        </div>
        </div>

<div class="container mt-5 mb-5">
    <div class="h4 m-3 text-center">購買人資訊</div>
        <form class="col-md-8 midtable" @submit.prevent="createOrder">
        <div class="form-group row">
            <div class="col-md-6">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>
            <div class="col-md-6">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="name2"
            :class="{'is-invalid': errors.has('name2')}"
            v-model="form.user.tel" v-validate="'required'" placeholder="請輸入電話">
            <span class="text-danger" v-if="errors.has('name2')">電話必須輸入</span>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-md-6">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required'"
            v-model="form.user.email" placeholder="請輸入 Email">
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="col-md-6">
            <label for="useraddress">收件人地址</label>
            <input type="address" class="form-control" name="name3"
            :class="{'is-invalid': errors.has('name3')}"
            id="useraddress" v-validate="'required'" v-model="form.user.address" placeholder="請輸入地址">
            <span class="text-danger" v-if="errors.has('name3')">地址必須輸入</span>
            </div>
        </div>

        <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" cols="1" rows="5"
            v-model="form.message"></textarea>
        </div>  
        </form>
        <div class="credit">
                        <div class="h4 m-3 text-center">付款細節</div>
                        <img class="img-responsive cc-img col-md-8 midtable"  src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png">              
                        <!-- <div class="creditcard">
                        <img class="img-responsive cc-img" src="./images/visa.svg">
                        <img class="img-responsive cc-img" src="./images/paypal.svg">
                        <img class="img-responsive cc-img" src="./images/mastercard.svg">
                        <img class="img-responsive cc-img" src="./images/jcb.svg">
                        </div> -->
                    <form class="col-md-8 midtable" role="form" @submit.prevent="createOrder">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="usercard">信用卡卡號</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="card" id="usercard" v-cardformat:formatCardNumber
                                        :class="{'is-invalid': errors.has('card')}" v-model="form.user.card" 
                                        v-validate="'required'" placeholder="1234-5678-1234-5678">
                                        <span class="text-danger" v-if="errors.has('card')">請輸入正確卡號</span>
                                        <span class="input-group-addon"><span class="fa fa-credit-card"></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="firstname">持卡人姓氏</label>
                                    <input type="text" class="form-control" name="name1" id="firstname"
                                    :class="{'is-invalid': errors.has('name1')}" v-model="form.user.firstname"
                                    v-validate="'required'"  placeholder="請輸入持卡人姓氏" />
                                    <span class="text-danger" v-if="errors.has('name1')">請輸入正確姓氏</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="secondname">持卡人名字</label>
                                    <input type="text" class="form-control" name="name2" id="secondname" 
                                    :class="{'is-invalid': errors.has('name2')}" v-model="form.user.secondname"
                                    v-validate="'required'"  placeholder="請輸入持卡人名字" />
                                    <span class="text-danger" v-if="errors.has('name2')">請輸入正確名字</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="date">到期日期</label>
                                    <input type="date" class="form-control" name="date" id="date" 
                                    :class="{'is-invalid': errors.has('date')}" v-model="form.user.date" min="2020-10-30" max="2022-12-31"
                                    v-validate="'required'" placeholder="MM / YY" />
                                    <span class="text-danger" v-if="errors.has('date')">請輸入有效年月日</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="cvc">卡號後三碼</label>
                                    <input type="text" class="form-control" name="cvc" id="cvc" v-cardformat:formatCardCVC
                                    :class="{'is-invalid': errors.has('cvc')}" v-model="form.user.cvc"
                                    v-validate="'required'" placeholder="CVC" />
                                    <span class="text-danger" v-if="errors.has('cvc')">請輸入卡片背面末三碼</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                                <button class="btn btn-danger">送出訂單</button>
                        </div>
                    </form>                    
        </div>        
    </div>
</div>
</template>

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
            vm.$router.push(`/user/customer_checkout/${response.data.orderId}`);
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