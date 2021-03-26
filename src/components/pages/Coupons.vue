<template>
    <div>
        <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
        <button class="btn btn-danger" @click="openModal(true)">建立新的優惠券</button>
        <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">名稱</th>
                <th width="120">折扣百分比</th>
                <th width="120">到期日</th>
                <th width="120">優惠券編碼</th>
                <th width="120">是否啟用</th>
                <th width="120">編輯</th>
                <th width="10">刪除</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
            <td>{{item.title}}</td>
            <td>{{item.percent}}</td>
            <td>{{item.due_date}}</td>
            <td>{{item.code}}</td>
            <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else  class="text-danger">未啟用</span>
            </td>
            <td>
            <button class="btn btn-outline-info btn-sm" @click="openModal(false,item)">編輯</button>
            </td>
            <td>
            <button class="btn btn-outline-warning btn-sm" @click="openDelProductModal(item)">刪除</button>
            </td>
            </tr>
        </tbody>
    </table>

<!-- pagination -->
        <!-- <Pagination :pagination="pagination" v-on:getPageProducts="getProducts"/> -->
<!-- modal -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
    <div class="modal-header bg-light text-black">
        <h5 class="modal-title" id="exampleModalLabel">
        <span>新增優惠券</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body text-left">
        <div class="row">
        <div class="col-sm-12">
            <div class="form-group">
            <label for="title">優惠標題</label>
            <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                placeholder="請輸入優惠標題">
            </div>
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="percent">折扣(%)</label>
                <input type="text" class="form-control" id="percent"
                placeholder="填寫80即為打8折" v-model="tempProduct.percent"> 
            </div>
            <div class="form-group col-md-6">
                <label for="date">截止日期</label>
                <input type="date" class="form-control" id="due_date"
                placeholder="" v-model="tempProduct.due_date">
            </div>
            </div>
            <div class="form-group">
            <label for="code">優惠券編碼</label>
            <input type="text" class="form-control" id="code"
                placeholder="優惠券編碼" v-model="tempProduct.code"> 
            </div>
            <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                id="is_enabled" v-model="tempProduct.is_enabled"
                :ture-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">
                啟用/關閉
                </label>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="createCouponCode">確認</button>
    </div>
    </div>
</div>
</div>
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click="delProduct">確認刪除</button>
        </div>
        </div>
    </div>
    </div>
</div>
    </div>
</template>
<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
    data() {
    return{
        products: [],
        coupons:[],
        pagination:{},
        tempProduct:{},
        isNew: false,
        isLoading:false,
        status:{
        fileUploading:false,
    },
    };
},
// components:{
//         Pagination,
//     },

methods: {
    getCoupons(page = 1){
    const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
    const vm = this;
    console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    vm.isLoading = true;
    this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
    });
    },

    openModal(isNew,item){
    if(isNew){
        this.tempProduct = {};
        this.isNew = true;
    }else{
        this.tempProduct = Object.assign({},item);
        this.isNew = false;
    }
    $('#productModal').modal('show');
    },
    openDelProductModal(item) {
    const vm = this;
    $('#delProductModal').modal('show');
    vm.tempProduct = Object.assign({}, item);
    },

    createCouponCode(){
    const vm = this;
    let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
    let httpMethod = 'post';
    if(!vm.isNew){
    api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
    httpMethod = 'put';
    }
    console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    vm.isLoading = true;
    this.$http[httpMethod](api,{ data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success){
        $('#productModal').modal('hide');
        vm.getCoupons();
        }else{
        $('#productModal').modal('hide');
        vm.getCoupons();
        console.log("新增失敗");
        vm.isLoading = false;
        // vm.products = response.data.products;
    }
    });
},
    delProduct() {
        let vm = this;
        let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
        this.$http.delete(api).then(response => {
        console.log(response, vm.tempProduct);
        $('#delProductModal').modal('hide');
        this.getCoupons();
        });
    },
},
created(){
    this.getCoupons();
}
}

</script>