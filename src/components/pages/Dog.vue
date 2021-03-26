<template>
    <div>
		<!-- <header>
			<div class="container-fulid fixed-top">
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
							<li class="ml-2"><router-link to="/user/cart" class="nav-link"><i class="fas fa-cart-plus mr-2"></i><span class="badge" id="lblCartCount">{{cash}}</span>購物車</router-link></li>
							<li class="ml-2"><router-link to="/user/about" class="nav-link"><i class="far fa-file-alt mr-2"></i>關於我們</router-link></li>
							<li class="ml-2"><router-link to="/login" class="nav-link"><i class="far fa-user mr-2"></i>登入</router-link></li>
							<button @click="add">點我</button>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header> -->
		<div class="banner_w3lspvt">
			<div class="csslider infinity">
				<input type="radio" name="slides" checked="checked" id="slides_1" />
				<input type="radio" name="slides" id="slides_2" />
				<input type="radio" name="slides" id="slides_3" />
				<input type="radio" name="slides" id="slides_4" />				
				<ul class="banner_slide_bg">
					<li>
						<div class="container">
							<div class="w3ls_banner_txt text-center ml-auto pr-xl-0 pr-sm-4 pr-5">
								<p v-anime="{ scale: [1,1],opacity: [5,1],translateZ: 0,color:black,duration: 5000, loop: false }" class="bannertext w3ls_pvt-title mb-2">DogeKat 全台第一狗貓動物用品店</p>
							</div>
						</div>
					</li>
					<li>
						<div class="container">
							<div class="w3ls_banner_txt text-center ml-auto pr-xl-0 pr-sm-4 pr-5">
								<p v-anime="{ scale: [1,1],opacity: [5,1],translateZ: 0,color:black,duration: 5000, loop: false }" class="bannertext2 w3ls_pvt-title mb-2">DogeKat 榮獲全球呵護動物獎</p>
							</div>
						</div>
					</li>
					<li>
						<div class="container">
							<div class="w3ls_banner_txt text-center ml-auto pr-xl-0 pr-sm-4 pr-5">
								<p v-anime="{ scale: [1,1],opacity: [5,1],translateZ: 0,color:black,duration: 5000, loop: false }" class="bannertext3 w3ls_pvt-title mb-2">DogeKat 提供寵物們最佳的用品</p>								
							</div>
						</div>
					</li>
				</ul>
				<div class="arrows">
					<label for="slides_1"></label>
					<label for="slides_2"></label>
					<label for="slides_3"></label>
				</div>
				<div class="navigation">
					<div>
						<label for="slides_1"></label>
						<label for="slides_2"></label>
						<label for="slides_3"></label>
					</div>
				</div>
			</div>
		</div>
     
     <div class="mid">
	 <div class="site-section first-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-12 text-center" data-aos="fade"> 
            <h2 class="site-section-heading text-uppercase text-center font-secondary">四大保證</h2>
          </div>
        </div>
        <div class="row border-responsive">
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0 border-right" data-aos="fade-up" data-aos-delay="">
            <div class="text-center">
              <span class="flaticon-money-bag-with-dollar-symbol display-4 d-block mb-3 text-primary"></span>
			  <h1><i class="fas fa-clinic-medical"></i></h1>
              <h3 class="text-uppercase h4 mb-3">完善的照顧</h3>
              <p class="pclass">DogeKat對於每位到這裡的寶貝們都將給予100%的用心照顧</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0 border-right" data-aos="fade-up" data-aos-delay="100">
            <div class="text-center">
              <span class="flaticon-bar-chart display-4 d-block mb-3 text-primary"></span>
			  <h1><i class="fas fa-cash-register"></i></h1>
              <h3 class="text-uppercase h4 mb-3">親民的價格</h3>
              <p class="pclass">DogeKat不希望寶貝的爸媽們花太多不必要的花費   所以價格永遠都是最親民的</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0 border-right" data-aos="fade-up" data-aos-delay="200">
            <div class="text-center">
              <span class="flaticon-medal display-4 d-block mb-3 text-primary"></span>
			  <h1><i class="fas fa-globe-americas"></i></h1>
              <h3 class="text-uppercase h4 mb-3">全球的資訊</h3>
              <p class="pclass">DogeKat在全球各地都有相當多最新的資訊   目的是希望所有的寵物們都有最好的生活</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div class="text-center">
              <span class="flaticon-box display-4 d-block mb-3 text-primary"></span>
			  <h1><i class="far fa-handshake"></i></h1>
              <h3 class="text-uppercase h4 mb-3">密切的夥伴</h3>
              <p class="pclass">DogeKat擁有相當多的合作夥伴   盡可能地讓毛小孩們的利益最大化</p>
            </div>
          </div>
        </div>
      </div>
    </div>

	<div class="site1">
    <div class="container">
      <div class="row no-gutters align-items-stretch">
		  <img class="mid1" src="./images/g1.jpg">
        <div class="col-lg-5 ml-lg-auto py-5">
          <p class="site-section-heading text-uppercase font-secondary mb-5">養狗有益身心好處多</p>
          <p class="pclass">降低壓力：和狗狗相處幾分鐘，就能達到降低血壓及焦慮的效果，人們在從事有壓力的工作時，若有狗在一旁陪伴，表現會比較好。
<br>減少憂鬱更快樂：養狗的人通常比較不會憂鬱，主人和狗之間的互動，以及從狗身上得到的愛，有助於讓飼主的思想更正面，即便只是稍微看狗狗一下，大腦便會產生讓人感覺親密的化學物質，像是催產素(Oxytocin)。</p>
        </div>
      </div>
    </div>
  </div>

  <div class="site-half block">
    <div class="container">
      <div class="row no-gutters align-items-stretch">
        <div class="col-lg-5 mr-lg-auto py-5">
          <p class="site-section-heading text-uppercase font-secondary mb-5">訓練狗狗有撇步</p>
          <p class="pclass">強化心智及社交圈：研究顯示，養狗和遛狗能增加社交互動，狗能助人漸漸不再害羞、脫離孤立，許多人遛狗時遇到其他遛狗的飼主時，會開口與其交談，因此增加互動。
<br>讓身體更健康：研究指出，養狗的人比較有動力完成他們的健康計畫，因為當主人在遛狗時，對他們自己來說也是在運動，而且運動的品質更好。當一個家庭有養狗時，小孩子也比較願意出門運動，和狗玩在一起。</p> 
        </div>
		<img class="mid2" src="./images/g5.jpg">
      </div>
    </div>
  </div>

  <div class="site-section2">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-12" data-aos="fade">
            <h2 class="site-section-heading text-center text-uppercase hot">熱門商品</h2>
          </div>
        </div>
        <div class="row">
		<div class="card col-md-6 col-lg-4 mb-5">
			<router-link to="/user/productdetail/-MDyKkU-3ywf6AEO81o0"  class="nav-link">
            <img class="card-img-top" src="./images/cattoy2.jpg" alt="Card image cap">
            <div class="card-body">
            <h4 class="card-title both4">夏日睡窩</h4>
            <ul class="botp">
					<li>100%手工製造</li>
					<li>內有水冷包持涼爽</li>
					<li>方便好收納</li>
					<li>NT650</li>
				</ul>
        </div>
		</router-link>
        </div>
		<div class="card col-md-6 col-lg-4 mb-5">
			<router-link to="/user/productdetail/-MDxtVbOo7vBcBa5Iipn"  class="nav-link">
            <img class="card-img-top" src="./images/cattoy3.jpg" alt="Card image cap">
            <div class="card-body">
            <h4 class="card-title both4">犬用小切片</h4>
            <ul class="botp">
					<li>100%日本製造</li>
					<li>低糖含鈉</li>
					<li>一次用</li>
					<li>NT89</li>
				</ul>
        </div>
		</router-link>
        </div>
        <div class="card col-md-6 col-lg-4 mb-5">
			<router-link to="/user/productdetail/-MGO54nDWaPR26JO1DQZ"  class="nav-link">
            <img class="card-img-top" src="./images/cattoy.jpg" alt="Card image cap">
            <div class="card-body">
            <h4 class="card-title both4">電動逗貓器</h4>
            <ul class="botp">
					<li>歐洲進口逗貓器</li>
					<li>360度全方位旋轉</li>
					<li>方便好攜帶</li>
					<li>NT550</li>
				</ul>
        </div>
		</router-link>
        </div>
        </div>
      </div>
    </div>
</div>
	<!-- <footer class="py-5">
		<div class="container py-xl-4">
			<div class="row footer-top">
				<div class="col-md-5 footer-grid_section_1its">
					<div class="row">
						<div class="col-lg-6 col-md-12 col-sm-6">
							<h2 class="footer-title text-uppercase text-wh mb-lg-4 mb-3">關於我們</h2>
							<p>Sed ut perspiciatis unde omnis iste natus error sit.Error sit antium dolorts remq hymue laud.</p>
						</div>
						<div class="col-lg-6 col-md-12 col-sm-6 mt-lg-0 mt-md-4 mt-sm-0 mt-4">
							<h3 class="footer-title text-uppercase text-wh mb-lg-4 mb-3">品質保證</h3>
							<p>Error sit antium dolorts remq hymue laud.Sed ut perspiciatis unde omnis iste natus error sit.</p>
						</div>
					</div>
					
				</div>
				<div class="col-md-3 footer-grid_section_1its my-md-0 my-5">
					<h3 class="footer-title text-uppercase text-wh mb-lg-4 mb-3">聯絡我們</h3>
					<div class="contact-info">
						<div class="footer-style-w3ls">
							<h4 class="text-li mb-2">Phone</h4>
							<p>0912-345-678</p>
						</div>
						<div class="footer-style-w3ls my-4">
							<h4 class="text-li mb-2">Email </h4>
							<p><a href="mailto:info@example.com">info@example.com</a></p>
						</div>
						<div class="footer-style-w3ls">
							<h4 class="text-li mb-2">Location</h4>
							<p>台灣</p>
						</div>
					</div>
				</div>
				<div class="col-md-4 footer-grid_section_1its">
					<h3 class="footer-title text-uppercase text-wh mb-lg-4 mb-3">更多資訊</h3>
					<p> 僅個人練習使用，不做任何商業用途</p>
					<form action="#" method="post" class="subscribe_form mt-4">
						<input class="form-control" type="email" name="email" placeholder="請輸入你的信箱..." required="">
						<button type="submits" class="btn btn-primary">確認</button>
					</form>
					<div class="agileinfo_social_icons mt-4">
						<ul class="agileits_social_list list-unstyled">
							<li>
								<a href="#" class="w3_agile_facebook">
									<i class="fab fa-facebook-f"></i>
								</a>
							</li>
							<li class="mx-2">
								<a href="#" class="agile_line">
									<i class="fab fa-line"></i>
								</a>
							</li>
							<li>
								<a href="#" class="w3_agile_instagram">
									<i class="fab fa-instagram"></i>
								</a>
							</li>
							<li class="ml-2">
								<a href="#" class="w3_agile_google">
									<i class="fab fa-google-plus-g"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>				
			</div>
		</div>
		
	</footer> -->
	<a href="#home" class="move-top text-center"></a>
    </div>
</template>
<style lang="scss">
@import "../../assets/css_slider";
@import "../../assets/style";
@import "../../assets/dog";
</style>
<script>
export default {
	data(){
		return{
			count:0,
			cash:0,
		};
	},
	methods:{
		add(){
			this.cash ++;
			vm.$bus.$on('increment');
		},
	}
}
	addEventListener("load", function () {
		setTimeout(hideURLbar, 0);
	}, false);

	function hideURLbar() {
		window.scrollTo(0, 1);
	}
	
</script>
<!-- //Meta tag Keywords -->