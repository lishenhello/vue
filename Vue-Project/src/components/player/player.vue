<template>
	<div class="player-box" :class='{"audio_panner_hide":!toggleHide}'>
		<audio :src='audio.songUrl' autoplay="autoplay" @timeupdate='change' @ended='next()' @error='next()' id="audioPlay"></audio>
		<div class="audio-btn" >
			<span @click='togglePannel' v-show='toggleHide'>
				<mt-spinner type="snake" :size="27" v-show='audioLoadding' class='audio_animate'></mt-spinner>
			</span>
			<span @click='togglePannel' v-show='!toggleHide'>
				<mt-spinner type="snake" :size="27" v-show='audioLoadding' class='audio_animate'></mt-spinner>
			</span>
			
		</div>
		<div class="audio_pannel">
			<img :src="audio.imgUrl" @click='showDetailPlayer()' alt="">
			<div @click='showDetailPlayer'>
				<p>{{audio.title}}</p>
				<p>{{audio.single}}</p>
			</div>
			<div>
				<span class="player-play" @click='toggleStates' :class='{"play-pause":isPlay}'></span>
				<span class="player-next" @click='next'></span>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Spinner } from 'mint-ui'
	export default {
		name: 'player',
		data() {
			return {
				toggleHide: true,
			}
		},
		computed: {
			...mapGetters(['audio','isPlay','showPlayer','audioLoadding'])
		},
		methods: {
			togglePannel() {
				this.toggleHide = ! this. toggleHide
			},
			showDetailPlayer() {
				//判断是否选中歌曲，若未选中歌曲时则不显示播放详情页。
				if(this.showPlayer) {
					this.$store.commit('showDetailPlayer',true)
				}
			},
			toggleStates() {
				if(this.isPlay) {
					document.getElementById('audioPlay').pause()
				}else {
					document.getElementById('audioPlay').play()
				}
				console.log(this.isPlay)
				this.$store.commit('isPlay',!this.isPlay)
			},
			change() {//点击跳转播放
				//获取当前的时间
				let time = document.getElementById('audioPlay').currentTime
				//判断跳播的标记是否存在
				if(this.audio.currentFlag) {
					//若存在，则跳转到相对应的时间
					console.log(this.audio.currentLength)
					//注意这里改变当前时间不能直接用变量time。。因为time只是一个赋值操作，并不是代表的当前时间。。故要用currentTime。
					document.getElementById('audioPlay').currentTime = this.audio.currentLength
					//跳转完成后将跳播标记设为false。。以便于下次跳转。
					this.$store.commit('setCurrent',false)
				}else {
					//跳播标记不存在则让视频的播放时间等于当前时间
					this.$store.commit('setAudioTime',time)
				}
			},
			next() {
				this.$store.dispatch('next ')
			}
		}

	}
</script>
<style>
	 .player-box {
	 	width: 100%;
	 	position: fixed;
	 	bottom: 0;
	 	left: 0;
	 	transition: all .5s;
	 	-webkit-transition:all .5s;
	 }
	 .audio_panner_hide {
	 	bottom: -64px;
	 	transition: all .5s;
	 	-webkit-transition:all .5s;
	 }
	 .audio-btn {
	 	width: 100%;
	 	height: 45px;
	 }
	 .audio-btn>span {
	 	display: block;
	 	width: 35px;
	 	height: 35px;
	 	border-radius: 50%;
	 	background:rgba(0,0,0,.8) url('../../assets/images/close_icon.png') center no-repeat;
	 	background-size: 25px;
		margin: 10px;
	 }
	 .audio-btn>span:nth-child(2) {
	 	background:rgba(0,0,0,.8) url('../../assets/images/open_icon.png') center no-repeat;
	 	background-size: 25px;
	 }
	 .audio-btn .audio_animate {
	 	position: absolute;
	 	left: 14px;
	 	top: 14px;
	 	background: rgba(0,0,0,.9);
	 	border-radius:13px;
	 }
	 .audio_pannel {
	 	width: 100%;
	 	height: 64px;
	 	padding: 7px;
	 	background: rgba(0,0,0,.8);
	 	position: relative;
	 }
	 .audio_pannel img {
	 	float: left;
	 	width: 50px;
	 	height: 50px;
	 }
	 .audio_pannel>div:nth-child(2) {
	 	width: 100%;
	 	height: 100%;
	 	padding: 0 110px 0 60px;
	 }
	 .audio_pannel>div:nth-child(3) {
		position: absolute;
		right: 7px;
		top: 7px;
		width: 100px;
		height: 50px;
		overflow: hidden;

	 }
	 .audio_pannel p {
	 	margin-top: 5px;
	 	color: white;
	 	font-size: 16px;
	 	overflow: hidden;
	 	white-space:nowrap;  
	 	text-overflow:ellipsis;
	 }
	 .audio_pannel p:nth-child(2) {
	 	margin-top:3px;
	 	font-size: 14px;
	 	color: rgb(196,196,196);


	 }
	 .player-play,.player-next{
	 	float: left;
	 	display: inline-block;
	 	width: 50%;
	 	height: 100%;
	 	background: url('../../assets/images/play_icon.png')no-repeat center;
	 	-webkit-background-size: auto 70%;
	 	background-size: auto 70%;
	 	
	 }
	 .play-pause {
	 	background: url('../../assets/images/pause_icon.png')no-repeat center;
	 	-webkit-background-size: auto 70%;
	 	background-size: auto 70%;
	 }
	 .player-next {
	 	background: url('../../assets/images/next_icon.png')no-repeat center;
	 	-webkit-background-size: auto 70%;
	 	background-size: auto 70%;
	 }
		
	 </style>
