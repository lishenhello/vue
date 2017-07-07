<template>
	<div class="search">
		<div class="search_box">
			<span class="search_glass"></span>
			<input type="text" v-model='keyword' placeholder="歌手/歌名/拼音">
			<button @click='search'>搜索</button>
		</div>
		<div class="search_list" v-show='showList'>
			<div class="search_new">最新热门</div>
			<mt-cell :title="item" v-for="(item,index) in hotList" @click.native='replaceInput(index)'></mt-cell>
		</div>
		<div class="search_list" v-show='!showList'>
			<div class="search_result">共有{{songList.length}}条搜索结果</div>
			<mt-cell :title="item.filename" v-for="(item,index) in songList" @click.native="playAudio(index)"></mt-cell>
		</div>
		<div class="search_detail"></div>
	</div>
</template>
<script type='es6'>
import {Cell,Indicator} from 'mint-ui'
import {PLAY_AUDIO} from '../mixins/mixin.js'
	export default {
		mixins: [PLAY_AUDIO],
		beforeRouteEnter(to,from,next) {
			next( (vm) => {
				vm.getList()
			})
		},
		data() {
			return {
				hotList: '',
				songList: '',
				keyword: '',
				showList:true,
			}
		},
		components: {Cell,Indicator},
		methods: {
			getList() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				})
				this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/hot?plat=0&count=30&url2=').then((res) => {
					Indicator.close()
					console.log(res.data.data.info)
					//可把对象中的关键字抽取出来,用...list.map方法,单独放在一个数组中，便于我们操作。					
					let list = res.data.data.info
					console.log(list)
					this.hotList = [...list.map(({keyword}) => keyword)]
					console.log(this.hotList)
				
										
				})
			},
			replaceInput(index) {
				//console.log( this.hotList[index].keyword)
				this.keyword = this.hotList[index]
				this.search()
			},
			search() {
				//首先，通过showList来切换列表的显示与隐藏
				this.showList = false
				//在这里直接可通过this.keyword拿到输入框中的value值
				console.log(this.keyword)
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				})
				this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/song?keyword='+ this.keyword + '&page=1&pagesize=30&url2=').then( (res) => {
					Indicator.close();
					console.log(res.data.data.info)
					let newList = res.data.data.info
					this.songList = [...newList.map( ({filename,hash}) => ({filename,hash}))]
					console.log(this.songList)
					console.log(this.songList.length)
				})
			},
			// playAudio(index) {
			// 	console.log(11)
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
	.search .search_box {
		width: 100%;
		padding: 10px;
		position: relative;
		background-color: #fbfbfb;
		overflow: hidden;
	}
	.search input {
		float: left;
		width: 80%;
		height: 35px;
		border: 1px solid #e5e5e5;
		border-radius: 7px;
		padding: 0 10px 0 30px;
	}
	.search .search_glass {
		display: block;
		width: 30px;
		height: 33px;
		position: absolute;
		left: 10px;
		top: 11px;
		background: url('http://m.kugou.com/v3/static/images/index/search_icon.png') center no-repeat;
		-webkit-background-size: auto 100%;
		background-size: auto 100%;
	}
	.search button {
		float: right;
		width: 18%;
		height: 35px;
		border: none;
		background: #2ba2fa;
		border-radius: 7px;
		color: #fff;
		font-size: 16px;

	}
	.search .search_list {
		width: 100%;

	}
	.search .search_new {
		width: 100%;
		padding: 10px;
		color: deepskyblue;
	}
	.search .search_result {
		padding: 5px 10px;
		background-color: #e1e1e1;
		color: #000;
	}
</style>