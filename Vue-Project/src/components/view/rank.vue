<template>
	<div>
		<mt-cell :title="item.title" v-for='(item,index) in songList' :to='item.location' is-link >
  			<img slot="icon" :src="item.imgUrl" width="60" height="60">
		</mt-cell>
	</div>
</template>
<script>
	import {Cell,Indicator} from 'mint-ui'
	import {INIT} from '../mixins/mixin.js'
	export default {
		mixins: [INIT],
		// data() {
		// 	return {
		// 		songList: []
		// 	}
		// },
		// created() {
		// 	this.get()
		// },
		components: {
			Cell,Indicator
		},
		methods: {
			get() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				this.$http.get('http://cs003.m2828.com/apis/getPage.php?path=/rank/list').then(res =>{
					Indicator.close()
					this.parseList(res.data)
				})
			},
			parseList(data) {
				var div = document.createElement('div')
				div.innerHTML = data 
				//console.log(data)
				var list = div.querySelectorAll('.panel-img-list li')
				console.log(list)
				for(let i = 0; i<list.length; i++){
					var rank = {}
					rank.title = list[i].querySelector('.panel-img-content p').innerText
					rank.imgUrl = list[i].querySelector('.panel-img-left img').getAttribute('_src')
					rank.location = '/rank/info/'+list[i].querySelector('a').href.substr(29)
					this.songList.push(rank)
					console.log(this.songList)
				}
			}
		}
	}
</script>
<style>
.mint-cell-title {
	padding: 10px 5px !important;
}
</style>