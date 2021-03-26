<template>
    <div>
        <header>
			<div class="container-fulid">
				<div class="header d-md-flex justify-content-between align-items-center py-3 px-xl-5 px-lg-3 px-2">
					<div id="logo">
						<router-link to="/#" class="nav-link"><img src="./images/dog.png">DogeKat</router-link>
					</div>
					<div class="nav_w3ls">
						<nav>
							<label for="drop" class="toggle">Menu</label>
							<input type="checkbox" id="drop" />
							<ul class="menu">
								<li class="ml-2"><router-link to="/#" class="nav-link"><i class="fas fa-home mr-2"></i>首頁</router-link></li>
								<li class="ml-2"><router-link to="/user/allproducts" class="nav-link"><i class="fas fa-list-ul mr-2"></i>產品列表</router-link></li>
								<li class="ml-2"><router-link to="/user/promotions" class="nav-link"><i class="fas fa-bullhorn mr-2"></i>轉盤抽獎</router-link></li>
								<li class="ml-2"><router-link to="/user/cart" class="nav-link"><i class="fas fa-cart-plus mr-2"></i>購物車</router-link></li>
								<li class="ml-2"><router-link to="/user/about" class="nav-link"><i class="far fa-file-alt mr-2"></i>關於我們</router-link></li>
								<li class="ml-2"><router-link to="/login" class="nav-link"><i class="far fa-user mr-2"></i>登入</router-link></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
    </div>
</template>
<script>
export default {
	data(){
		return{
		};
	},
}
	addEventListener("load", function () {
		setTimeout(hideURLbar, 0);
	}, false);

	function hideURLbar() {
		window.scrollTo(0, 1);
	}
	
</script>