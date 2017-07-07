<template>
	<div class="plist">
		<mt-cell :title="item.title" v-for='(item,index) in songList' :to='item.location' :label='item.countPlay' is-link>
  			<img slot="icon" :src="item.imgUrl" width="60" height="60">
		</mt-cell>
	</div>
</template>
<script>
	import {Cell,Indicator} from 'mint-ui'
	import list_plist from '../../jsons/list_plist.js'
	import {INIT} from '../mixins/mixin.js'
	export default {
		mixins: [INIT],
		// data() {
		// 	return {
		// 		songList:[]
		// 	}
		// },
		// created() {
		// 	this.get();
		// },
		components: {
			Indicator,Cell
		},
		methods: {
			get() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				this.parseData(list_plist)
			},
			parseData(data) {
				setTimeout(() => {
					Indicator.close();
					this.songList = data
				},1000)
			}
		}
	}
</script>
<style scope>
.plist .mint-cell-text {
	position: absolute;
	top: 23px;
	left: 80px;
}
.plist .mint-cell-label {
	position: absolute;
	left: 80px;
	top: 38px;
}
.plist .mint-cell-label::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('../../assets/images/icon_music.png') no-repeat center;
    background-size: 100%;
}
</style>