<template>
	<div class="index_main">
		<mt-swipe :auto="5000">
 			<mt-swipe-item><img src="../../assets/banner1.jpg" alt=""></mt-swipe-item>
 			<mt-swipe-item><img src="../../assets/banner2.jpg" alt=""></mt-swipe-item>
 			<mt-swipe-item><img src="../../assets/banner3.jpg" alt=""></mt-swipe-item>
 			<mt-swipe-item><img src="../../assets/banner4.jpg" alt=""></mt-swipe-item>
		</mt-swipe>
		<mt-cell :title="item.title" v-for='(item,index) in songList' @click.native='playAudio(index)'>
  			<img src="../../assets/images/download_icon.png" width="20" height="20">
		</mt-cell>
	</div>
</template>
<script>
	import { Swipe, SwipeItem ,Indicator,Cell } from 'mint-ui'
	import list_index from '../../jsons/list_index.js'
	import {INIT,PLAY_AUDIO} from '../mixins/mixin.js'
	export default {
		mixins:[INIT,PLAY_AUDIO],
		// data() {
		// 	return {
		// 		songList:[]
		// 	}
		// },
		// created() {
		// 	this.get();
		// },
		components: {
			Swipe,SwipeItem,Indicator,Cell
		},
		methods:{
			get() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				this.parseData(list_index)
			},
			parseData(data) {
				setTimeout(() => {
					Indicator.close();
					this.songList = data

				},1000)
			},
			// playAudio(index) {
			// 	let hash = this.songList[index].hash
			// 	console.log(hash)
			// 	this.$store.dispatch('getSong',hash)
			// 	this.$store.dispatch('getLrc',hash)
			// 	let info = {
			// 		songList: this.songList,
			// 		songIndex: index
			// 	}
			// 	this.$store.commit('setListInfo',info)
			// }
		}

	}
</script>
<style>
	.mint-swipe-items-wrap {
		width: 100%;
		height: 146px !important
	}
	.mint-cell-title {
		padding: 0  20px 0 10px !important
	}
</style>