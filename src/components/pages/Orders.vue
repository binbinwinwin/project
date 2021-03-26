<template>
    <div>
        <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="100" class="text-left">購買時間</th>
                <th width="100" class="text-left">訂單編號</th>
                <th width="100" class="text-left">購買人姓名</th>
                <th width="100" class="text-left">Email</th>
                <th width="100" class="text-left">購買款項</th>
                <th width="100" class="text-left">應付金額</th>
                <th width="100" class="text-left">是否付款</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in order" :key="item.id">
                <td class="text-left">
                    <span v-if="item.is_paid">{{new Date(item.paid_date*1000).getFullYear()}} / {{new Date(item.paid_date*1000).getMonth()+1}} / {{new Date(item.paid_date*1000).getDate()}}</span>
                    <span v-else>尚未購買</span>
                </td>
                <td class="text-left">{{item.id}}</td>
                <td class="text-left">{{item.user.name}}</td>
                <td class="text-left">{{item.user.email}}</td>
                <td class="text-left">
                    <p v-for="productTitle in item.products" :key="productTitle.id">
                    {{productTitle.product.title}}{{productTitle.qty}}{{productTitle.product.unit}}</p>
                </td>     
                <td class="text-left">
                {{item.total|currency}}
                </td>
                <td class="text-left">
                    <span v-if="item.is_paid" class="text-success">已付款</span>
                    <span v-else class="text-danger">未付款</span>       
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
</template>

<script>
export default {
data(){
        return{
            order:{
                user:{},
            },
        page:{},
        };
    },
methods:{
    getOrder(page=1) {
        const vm = this;
        const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/orders?page=${page}`;
        vm.isLoading = true;
        this.$http.get(url).then(response => {
        vm.order = response.data.orders;
        vm.page = response.data.pagination;
        console.log(response);
        vm.isLoading = false;
        });
    },
},
created(){
        this.getOrder();
    },
    // components:{
    //     page,
    // }
}
</script>