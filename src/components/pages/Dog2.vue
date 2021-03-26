<template>
    <div>
	<Header/>
	<router-view></router-view>
	<Footer/>
	<a href="#home" class="move-top text-center"></a>
    </div>
</template>
<style lang="scss">
@import "../../assets/css_slider";
@import "../../assets/style";
</style>
<script>
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
export default {
	data(){
		return{
		};
	},
	components:{
	Header,
	Footer,
	},
}
	addEventListener("load", function () {
		setTimeout(hideURLbar, 0);
	}, false);

	function hideURLbar() {
		window.scrollTo(0, 1);
	}
	
</script>
<!-- //Meta tag Keywords -->