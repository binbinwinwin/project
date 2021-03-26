<template>
    <div class="container mt-5">
    <form class="col-md-8 midtable" @submit.prevent="payOrder">
        <div class="container mt-5" >
        <div class="h1 text-center"><strong>訂單確認</strong></div>
        <div class="row mt-3">
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">1.輸入購買資料</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-success alert-rounded text-center" role="alert">2.訂單確認</div>
            </div>
            <div class="col-12 col-md">
                <div class="alert alert-light alert-rounded text-center" role="alert">3.訂單完成</div>
            </div>
        </div>
        </div>
        
    <table class="table">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th class="text-right">單價</th>
        </thead>
        <tbody>
        <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
            <td class="align-middle text-right">NT ${{ parseInt(item.final_total) }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">NT ${{ cft }}</td>
        </tr>
        </tfoot>
    </table>   
    <table class="table">
        <tbody>
        <tr>
            <th width="200">Email</th>
            <td>{{ order.user.email }}</td>
        </tr>
        <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
        </tr>
        <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
        </tr>
        <tr>
            <th>付款狀態</th>
            <td>
            <span v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="text-center mb-5" v-if="order.is_paid === false">
        <router-link to="/user/cartfinal"><button class="btn btn-danger">確認付款去</button></router-link>
        <!-- <button class="btn btn-danger">確認付款去</button> -->
    </div>
    </form>
</div>
</template>
<script>
export default {
    data(){
        return{
            order:{
                user:{},
            },
            form:{
        user:{
            card:'',
            firstname:'',
            secondname:'',
            date:'',
            cvc:'',
        },
        message:'',
    },
            orderId:'',
            cft:{},
        };
    },
    methods:{
    getOrder() {
        const vm = this;
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
        vm.isLoading = true;
        this.$http.get(url).then(response => {
        vm.order = response.data.order;
        vm.cft = parseInt(vm.order.total);
        console.log(response);
        vm.isLoading = false;
        });
    },
    payOrder(){
        const vm = this;
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
        vm.isLoading = true;
        this.$http.post(url).then(response => {
        console.log(response);
        if(response.data.success){
            vm.getOrder();
        }
        vm.isLoading = false;
        });
    }
    },
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
    created(){
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
        this.getOrder();
    }
}
</script>