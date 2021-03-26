<template>
    <div>
        <div class="sidebar" data-image="">
            <div class="sidebar-wrapper">
                <div class="logo">
                    <router-link to="/#">DogeKat</router-link>
                    <!-- <router-link to="/dog">Doge Home</router-link> -->
                </div>
        <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 ml-3 mb-1">
            <span class="text-warning">管理員</span>
        </h5>
            <ul class="nav flex-column mb-2">             
            <li class="nav-item">                           
            <router-link to="/admin/products" class="nav-link">
            <i class="fas fa-box-open"></i>
                    產品列表
            </router-link>
            </li>
            <li class="nav-item">          
            <router-link to="/admin/orders" class="nav-link">
            <i class="fas fa-list-ul"></i>
                    訂單列表
            </router-link>
            </li>
            <li class="nav-item">          
            <router-link to="/admin/coupons" class="nav-link">
            <i class="fas fa-link"></i>
                    優惠券
            </router-link>
            </li>
            </ul>
        <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 ml-3 mb-1">
            <span class="text-success">模擬功能</span>
        </h5>
        <ul class="nav flex-column mb-2">
            <li class="nav-item">
            <router-link to="/customer_order" class="nav-link">
                <i class="fas fa-outdent"></i>
                模擬訂單
                </router-link>
            </li>          
        </ul>
        </div>
            
    </div>
    </div>
</template>
<style lang="scss" scoped>
@import "../assets/demo";
@import "../assets/light-bootstrap-dashboard";
</style>