<template>
    <div>
        <body>
<div>
	<p class="luck"><img class="lucky" src="./images/luck.svg">幸運大轉盤</p>
</div>
<div class="lottery-box" id="app">
	<h1 class="title"></h1>
	<div class="lottery">
		<div class="lottery-item">
			<div class="lottery-start">
				<div class="box gray" v-if="isStart===0">
					<p>活動未開始</p>
				</div>
				<div class="box" @click.once="startLottery" v-if="isStart===1">
					<p><b>抽獎</b></p>
				</div>
				<div class="box gray" v-if="isStart===2">
					<p>活動已過期</p>
				</div>
			</div>
			<ul>
				<li v-for="(item,i) in list" :class="i==index?'on':''" :key="item">
					<div class="box">
							<p>{{item.title}}</p>
							<p><img src="./images/j1.png" alt=""></p>
					</div>
				</li>
			</ul>
		</div>
	</div>  
	<!-- 中奖弹窗 -->
	<div class="mask" v-if="showToast"></div>
	<div class="lottery-alert" v-if="showToast">
		<h1>恭喜您</h1>
		<p><img src="./images/j2.png" alt=""></p>
		<h2>獲得 {{list[index].title}}</h2>
		<div class="btnsave" @click="showToast=false">確定</div> 
	</div>  
</div>
<div class="bottomtext">
<div v-if ="coupon1" class="container box2 h4"><p class="midtext"><b class="midtext2">快樂狗優惠券</b><br>輸入下面的優惠代碼<br><b class="midtext3">- HappyDog -</b> <br><span class="bottext">可享商品9折優惠</span></p></div>
<div v-if ="coupon2" class="container box2 h4"><p class="midtext"><b class="midtext2">優雅貓優惠券</b><br>輸入下面的優惠代碼<br><b class="midtext3">- ElegantCat -</b> <br><span class="bottext">可享商品75折優惠</span></p></div>
<div v-if ="coupon3" class="container box2 h4"><p class="midtext"><b class="midtext2">幸運兔優惠券</b><br>輸入下面的優惠代碼<br><b class="midtext3">- LuckyRabbit -</b> <br><span class="bottext">可享商品5折優惠</span></p></div>
<div v-if ="coupon4" class="container box2 h4"><p class="midtext"><b class="midtext2">睡覺鼠優惠券</b><br>輸入下面的優惠代碼<br><b class="midtext3">- SleepingMouse -</b><br><span class="bottext">可享商品3折優惠</span></p></div>
<div v-if ="coupon5" class="container box2 h4"><p class="midtext4">真的很可惜<br>下次再加油喔</p></div>
</div>

</body>
        <!-- <loading :active.sync="isLoading"></loading>
    <div class="mt-5" v-if="showToast">
        <div class="text-center" >
            <div class="h3">最新優惠</div>
            <hr>
            <div class="container box h4 box"><p class="midtext">快樂狗優惠券<br>輸入下面的聖誕優惠代碼<br>- HappyDog - <br><span class="bottext">可享商品5折優惠</span></p></div>           
            <div class="container box h4 box"><p class="midtext">幸運貓優惠券<br>輸入下面的聖誕優惠代碼<br>- LuckyCat - <br><span class="bottext">可享商品9折優惠</span></p></div>
        </div>
    </div> -->


</div>
</template>
<script>
export default {
    data(){
        return{
	  isStart:1,	
	  score:10, //消耗积分
      list:[
	  	{img:'./images/j2.png',title:'快樂狗優惠券',number:1},
		{img:'img/j2.png',title:'銘謝惠顧',number:2},
		{img:'img/j1.png',title:'優雅貓優惠券',number:3},
		{img:'img/j2.png',title:'銘謝惠顧',number:4},
		{img:'img/j1.png',title:'幸運兔優惠券',number:5},
		{img:'img/j2.png',title:'銘謝惠顧',number:6},
		{img:'img/j1.png',title:'睡覺鼠優惠券',number:7},
		{img:'img/j2.png',title:'銘謝惠顧',number:8},
	  ],   //奖品1-9     
      index: -1,  // 当前转动到哪个位置，起点位置
      count: 8,  // 总共有多少个位置
      timer: 0,  // 每次转动定时器
      speed: 200,  // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
	  showToast: false, //显示中奖弹窗
	  coupon1:false, 
	  coupon2:false,
	  coupon3:false,
	  coupon4:false,       
    };
    },
    mounted(){},
	
	methods:{
		startLottery(){
			if (!this.click) { return }
			this.startRoll();
			this.couponcode(); 
		},		
		// 开始转动
		startRoll () {
			this.times += 1 // 转动次数
			this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化 
			// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
			if (this.times > this.cycle + 10 && this.prize === this.index) {
			  clearTimeout(this.timer)  // 清除转动定时器，停止转动
			  this.prize = -1
			  this.times = 0
			  this.speed = 200
			  this.click = true; 
			  var that = this;
			  setTimeout(res=>{
				this.showToast = true;
			  },500)			                  
			} else {
			  if (this.times < this.cycle) {
				this.speed -= 10  // 加快转动速度
			  } else if (this.times === this.cycle) { 
				const index = parseInt(Math.random() * 10, 0) || 0;  // 随机获得一个中奖位置
				  this.prize = index; //中奖位置,可由后台返回
			if(this.list[index].number == 1){//優惠券
                setTimeout(res=>{
				this.coupon1 = true;
			},4000)
			}
			else if(this.list[index].number == 3){
				setTimeout(res=>{
				this.coupon2 = true;
			},4000)
			}
			else if(this.list[index].number == 5){
				setTimeout(res=>{
				this.coupon3 = true;
			},4000)
			}
            else if(this.list[index].number == 7){
				setTimeout(res=>{
				this.coupon4 = true;
			},4000)
			}
			else if(this.list[index].number == 2 | this.list[index].number == 4 | this.list[index].number == 6 | this.list[index].number == 8){
				setTimeout(res=>{
				this.coupon5 = true;
			},4000)
			}
				if (this.prize > 8) { this.prize = 8 }
			  } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 8) || this.prize === this.index + 1)) {
				this.speed += 110
			  } else {
				this.speed += 20
			  }      
			  if (this.speed < 40) {this.speed = 40}
			  this.timer = setTimeout(this.startRoll, this.speed)
			}
		},

		// 每一次转动
		oneRoll () {
		  let index = this.index // 当前转动到哪个位置
		  const count = this.count // 总共有多少个位置
		  index += 1
		  if (index > count - 1) { index = 0 }
		  this.index = index
		},
		couponcode(){
			if(this.list[index].number = 1){
                this.coupon = true;
			}
		},
	}	
}
</script>
<style lang="css" scoped>
@import "../../assets/lottery";
</style>
