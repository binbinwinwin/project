import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Dashboard2 from '@/components/Dashboard2';
// import HelloWorld from '@/components/HelloWorld';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import Dog from '@/components/pages/Dog';
import Dog2 from '@/components/pages/Dog2';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Home from '@/components/pages/Home';
import AllProducts from '@/components/pages/AllProducts';
import Cart from '@/components/pages/Cart';
import Promotions from '@/components/pages/Promotions';
import CheckOut from '@/components/pages/CheckOut';
import About from '@/components/pages/About';
import ProductDetail from '@/components/pages/ProductDetail';
import Turntable from'@/components/pages/Turntable';
import CartFinal from'@/components/pages/CartFinal';
import Header from'@/components/pages/Header';
import Footer from'@/components/pages/Footer';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Dog2',
            component: Dog2,
            children:[
                {
                    path: '',
                    name: 'Dog',
                    component: Dog, 
                },
            ],
        },
        {
            path: '/user',
            name: 'Dog2',
            component: Dog2,
            children:[
                {
                    path: 'home',
                    name: 'Home',
                    component: Home, 
                },
                {
                    path: 'allproducts',
                    name: 'AllProducts',
                    component: AllProducts, 
                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: Cart, 
                },
                {
                    path: 'promotions',
                    name: 'Promotions',
                    component: Promotions, 
                },
                {
                    path: 'checkout',
                    name: 'CheckOut',
                    component: CheckOut, 
                },
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
                {
                    path: 'cartfinal',
                    name: 'CartFinal',
                    component: CartFinal,
                },
                {
                    path: 'about',
                    name: 'About',
                    component: About,
                },
                {
                    path: 'turntable',
                    name: 'Turntable',
                    component: Turntable,
                },
                {
                    path: 'productdetail/:id',
                    name: 'ProductDetail',
                    component: ProductDetail,
                },
            ],
        },
        {
            path: '*',
            redirect:'login',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            // meta: { requiresAuth: true },
        },
        {
            path: '/admin',
            name: 'Dashboard2',
            component: Dashboard2,
            // meta: { requiresAuth: true },
            children:[
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                },
                // {
                //     path: 'allproducts',
                //     name: 'AllProducts',
                //     component: AllProducts,
                //     meta: { requiresAuth: true },
                // },
            ],
        },
        {
            path: '/',
            name: 'Dashboard2',
            component: Dashboard2,
            children:[
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
            ],
        },
        // {
        //     path: '/dashboard2',
        //     name: 'Dashboard2',
        //     component: Dashboard2,
        //     // meta: { requiresAuth: true },
        //     children:[
        //         {
        //             path: 'products',
        //             name: 'Products',
        //             component: Products,
        //             meta: { requiresAuth: true },
        //         },
        //     ],
        // },
    ],
})