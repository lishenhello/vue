<template>
	<div class="ringtone">
		<mt-cell v-for="(item,index) in songList" :title='item.title' :label="item.desp" @click.native='playAudio(index)'>
			<a :href="item.orderUrl">
				<img src="../../assets/images/order-ring.png" alt="">
				<p>订阅</p>
			</a>
		</mt-cell>
	</div>
</template>
<script>
import {Cell,Indicator} from 'mint-ui'
import list_rings from '../../jsons/list_rings.js'
export default {
	beforeRouteEnter(to,from,next) {
		next((vm => {
			vm.$store.commit('showPlayer',false)
		}))
	},
	beforeRouteLeave(to,from,next) {
		this.$store.commit('showPlayer',true)
		next()
	},
	data() {
		return {
			songList: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			Indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			})
			this.parseList(list_rings)
		},
		parseList(data) {
			setTimeout(()=> {
	          Indicator.close();
	          this.songList = data;
	        }, 1000);
		},
		playAudio(index) {
			this.$store.commit('toggleAudioLoading',true)
			let info ={
				songList:this.songList,
				songIndex: index
			}
			this.$store.commit('setListInfo',info)
			let songUrl = this.songList[index].songUrl,
				imgUrl = 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
				single = this.songList[index].desp.split('|')[0],
				title = this.songList[index].title
			let audio = {songUrl,imgUrl,single,title}
			this.$store.commit('toggleAudioLoading',false)
			this.$store.commit('setAudio',audio)
		}
	}
}
</script>
<style>
.ringtone .mint-cell-title {
	padding: 15px 5px !important;
}
.ringtone .mint-cell-value {
	text-align: center;
}
.ringtone img {
	width: 35px;
	height: 35px;
}
.ringtone p {
	font-size: 12px;
	color: #2ba2fa;
	margin-top: 3px;
}
</style>
