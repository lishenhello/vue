<template>
	<div class="detail_box" v-show='showDetailPlayer'>
		<div class="detail_bgOne" :style="{'background-image':'url('+audio.imgUrl+')','filter':'blur(1px)','-webkit-filter':'blur(1px)'}"></div>
		<div class="detail_bgTwo"></div>
		<div class="detail_content">
			<div class="detail_nav">
				<span @click='routerBack'></span>
				{{audio.title}}
			</div>
			<div class="detail_img">
				<img :src="imgUrl" alt="">
			</div>
			<div class="detail_lyric">
				<div class="detail_lyric_box" :style='{"margin-top":lrcOffset+"px"}'>
					<p v-for='(item,index) in songLrc' :class="{'isCurrentLrc':item.seconds>=audio.currentLength,'disCurrentLrc':item.seconds<audio.currentLength}">{{item.lrcContent}}</p>
				</div>
			</div>

			<div class="detail_time">
				<span class="detail_playTime">{{audio.currentLength | time}}</span>
				<mt-range v-model="audio.currentLength"
				 :min='0'  :max='audio.songLength'
				 @click.native='changRange($event)'
				 :bar-height='3' diabled id='detail_pro'>
				</mt-range>
				<span class="detail_totalTime">{{audio.songLength | time}}</span>
			</div>
			<div class="detail_ctrl">
				<span class="detail_prev" @click='prev'></span>
				<span class="detail_btn" @click='toggleStates' :class='{"toggleIcon":isPlay}'></span>
				<span class="detail_next" @click='next'></span>
			</div>
		</div>
	</div>
</template>
<script type='es6'>
	import {mapGetters} from 'vuex'
	export default {
		name: 'detailPlayer',
		data() {
			return {
			}
		},
		computed: {
			...mapGetters(['audio','showDetailPlayer','isPlay','songSrc']),
			imgUrl() {
				//console.log(11)
				//console.log(this.audio.imgUrl)
				let temp = this.audio.imgUrl.split('/100');
				return temp[0]+'/200'+temp[1]
				//console.log(this.audio.lrc)
			},
			songLrc() {
				console.log(this.songSrc)
				if(this.songSrc) {
					//将得到的字符串从换行回车的地方分割成数组
					let flag = this.songSrc.split('\r\n')
					//console.log(flag)
					//去掉最后的空字符串
					flag = flag.splice(0,flag.length-1)
					//遍历处理过后的数组，取出其中每一项的时长，内容。
					flag = flag.map( (value) => {
						//console.log(value)
						let time = value.substr(1,5)
						let seconds = parseInt(time.split(':')[0])*60+parseInt(time.split(':')[1])
						let lrcContent = value.substr(10)
						return { seconds,lrcContent}
					})
					return flag  
				}
				
			},
			lrcOffset() {
			if(this.songLrc) {
				//相对位置（已经播放的长度） = 获取歌词字符串的总长度（一行代表一个length长度）-未播放的字符串长度（这里通过当前时间长度和获取的时间长度对比得到是否已经播放）
				let offset = (this.songLrc.length-document.querySelectorAll('.isCurrentLrc').length-2)*(-20)
				//console.log(this.songLrc.length)
				//console.log(document.querySelectorAll('.isCurrentLrc').length)
				//这里是相对位置故不能之间简写为offset
				return this.audio.currentLength + offset - this.audio.currentLength;
				}
			}
		},
		filters: {
			time(value) {
				let length = Math.floor(parseInt(value))
				let minute = Math.floor(value/60)
				if(minute<10) {
					minute = '0' + minute
				}
				let second = length % 60 
				if(second<10) {
					second = '0' + second
				}
				return minute+':'+second
			}
		},
		methods: {
			routerBack() {
				this.$store.commit('showDetailPlayer',false)
			},
			changRange(e){
				//console.log(this.songLrc.length)
				//对于Vue中动态的点击事件要加上后缀名才能使点击事件执行。。
				//console.log(e.offsetX)
				let offsetX = e.offsetX
				//console.log(e)
				let rangeWidth = (document.documentElement.clientWidth-100)
				//console.log(rangeWidth)
				let clickWidth = Math.floor(offsetX)
				let clickLength = Math.floor(this.audio.songLength*offsetX/rangeWidth)
				console.log(clickLength)
				if(offsetX<rangeWidth) {
					this.$store.commit('setCurrent',true)
					this.$store.commit('setAudioTime',clickLength)
				}
				
				
			},
			prev(){
				this.$store.dispatch('prev')
			},
			toggleStates() {
				if(this.isPlay) {
					document.getElementById('audioPlay').pause()
				}else{
					document.getElementById('audioPlay').play()
				}
				this.$store.commit('isPlay',!this.isPlay)
			},
			next() {
				this.$store.dispatch('next')
			},

		}
	}
</script>
<style>
	.detail_box {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		content: 0;
		z-index: 99;
	}
	.detail_bgOne {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-position: center;
		-webkit-background-size: cover;
		background-size: cover;
		z-index: -1;
	}
	.detail_content {
		width: 100%;
		height: 100%;
		padding-top: 50px;
		background-color: rgba(0,0,0,.5);

	}
	.detail_nav {
		width: 100%;
		height: 43px;
		text-align: center;
		line-height: 43px;
		padding: 0 10px;
		position: relative;
		color: #fff;
		font-size: 18px;
	}
	.detail_nav span {
		display: block;
		width: 24px;
		height: 43px;
		background:url('../../assets/images/goback_icon.png') center no-repeat;
		-webkit-background-size: 60%;
		background-size: 60%;
		position: absolute;
		left: 10px;
		top: 0;

	}
	.detail_img {
		text-align: center;
		width: 100%;
	}
	.detail_img img {
		width: 50%;
		margin: 30px auto;
	}
	.detail_lyric {
		width: 100%;
		height: 60px;
		overflow: hidden;
		margin-bottom: 20px;
		color: #fff;
		line-height: 20px;
		text-align: center;
	}
	.detail_lyric_box {
		transition:all 1s;
		transform:translateZ(0);
	}
	.detail_time {
		color: #fff;
		width: 100%;
		height: 30px;
		padding: 0 50px;
		position: relative;

	}
	.detail_box .detail_playTime {
		font-size: 12px;
		position: absolute;
		top: 8px;
		left: 10px;
	}
	.detail_box .detail_totalTime {
		font-size: 12px;
		position: absolute;
		right: 30px;
		top: 7px;
	}
	.detail_box .mt-range {
		
	}
	.detail_box .mt-range-runway {
		
		border-top-color: #fff;
		right: -10px;
	}
	.detail_box .mt-range-thumb {
		width: 16px;
		height: 16px;
		top: 8px;
	}
	.detail_box .detail_ctrl {
		margin-top: 10px;
		width: 100%;
		padding: 0 50px;
	}
	.detail_box .detail_prev {
		display: block;
    	width: 33.3%;
    	float: left;
    	height: 100px;
    	background:  url('../../assets/images/play_prev.png') 0 0 no-repeat;
    	-webkit-background-size: 60% auto;
    	background-size: 60% auto;
    	background-position: center;

	}
	.detail_box .detail_btn {
		display: block;
    	width: 33.3%;
    	height: 100px;
    	float: left;
    	background:  url('../../assets/images/play_play.png') 0 0 no-repeat;
    	-webkit-background-size: 80% auto;
    	background-size: 80% auto;
    	background-position: center;
	}
	.detail_box .toggleIcon {
		background:  url('../../assets/images/play_pause.png') 0 0 no-repeat;
    	-webkit-background-size: 80% auto;
    	background-size: 80% auto;
    	background-position: center;
	}
	.detail_box .detail_next {
		display: block;
    	width: 33.3%;
    	float: left;
    	height: 100px;
    	background:  url('../../assets/images/play_next.png') 0 0 no-repeat;
    	-webkit-background-size: 60% auto;
    	background-size: 60% auto;
    	background-position: center;
	}
	@media screen and (max-width: 320px){
		.detail_box .detail_prev,.detail_box .detail_btn,.detail_box .detail_next {
			height: 60px;
		}
	}
</style>