<template>
	<div class="plist_info">
		<div class="plist_info_wrap" :style="{'background-image':'url('+ imgSrc +')','background-size':'100%','background-repeat':'no-repeat','background-position':'center'}" >
		</div>
		<div class="plist_info_content">
			<p :class="{'plist_info_txt':descripition}">{{content}}</p>
			<img src="../../assets/images/close_icon.png" alt="" @click="toggleDesc" v-if="descripition">
			<img src='../../assets/images/open_icon.png' alt="" @click="toggleDesc" v-else>
		</div>
		<div class="plist_info_list">
			<mt-cell v-for="(item,index) in songList" :title='item.title' :label="item.desp" @click.native='playAudio(index)'>
				<a :href="item.orderUrl">
					<img src="../../assets/images/download_icon.png" alt="" width="20px" height="20px">
				</a>
			</mt-cell>
		</div>
	</div>
</template>
<script>
import {Indicator,Cell} from 'mint-ui'
import {PLAY_AUDIO} from '../mixins/mixin.js'
export default {
	mixins: [PLAY_AUDIO],
	beforeRouteEnter(to,from,next) {
		next( vm => { //这里的vm就相当于this对象，由于在进入页面之前还未创建挂载对象，故我们不能用this拿到dom对象，只能通过vm拿到
			vm.$store.commit('setHeadNav',true) //切换头部
			vm.getList(); //调用数据渲染页面
			//根据页面的滚动高度改变导航条的颜色
			window.onscroll = () => {
				vm.opacity = window.pageYOffset/300
				vm.$store.commit('setNavStyle',{background:`rgba(43,162,251,${vm.opacity})`})
			}
		})
	},
	beforeRouteLeave(to,from,next) {
		this.$store.commit('setHeadNav',false)
		window.onscroll = null 
		next()
	},
	data() {
		return {
			imgSrc: '',
			descripition: true,
		}
	},
	methods: {
		getList() {
			//在获取到数据之前加过渡动画
			Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
			//拿到当前页面的锚点值
			let ID = this.$route.params.id
			//获取数据
			this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/plist/list/${ID}`).then(res =>{
				Indicator.close() //关闭加载的动画
				// console.log(res.data)
				//由于获取到的数据时html文件，故我们要将其转化为json对象
				this.parseList(res.data)

			})
			
		},
		parseList(data) {
			//首先创建一个标签将其放进标签内，便于我们获取
			let div = document.createElement('div')
			div.innerHTML = data
			//获取头部的title
			this.title = div.querySelector('#topGoback p').innerText
			this.$store.commit('setTitle',this.title)
			//获取背景图片
			this.imgSrc = div.querySelector('#imgBoxInfo img').src
			console.log(this.imgSrc)
			//获取说明文字
			this.content = div.querySelector('#introBox p').innerText
			//创建一个对象用来存放获取到的数据
			this.songList = []
			//获取所有的li标签
			let list = div.querySelectorAll('.panel-songslist-item')
			console.log(list)
			for(let i=0;i<list.length;i++){
				let song = {} //创建一个对象用来存放属性
				song.title = list[i].querySelector('.panel-songs-item-name span').innerText
				song.hash = list[i].id.substr(6)
				this.songList.push(song)
			}
			
		},
		toggleDesc() {
			this.descripition = ! this.descripition
		},
		// playAudio(index) {
		// 		let hash = this.songList[index].hash
		// 		console.log(hash)
		// 		this.$store.dispatch('getSong',hash)
		// 		this.$store.dispatch('getLrc',hash)
		// 		let info = {
		// 			songList: this.songList,
		// 			songIndex: index
		// 		}
		// 		this.$store.commit('setListInfo',info)
		// 	},
	}
}
</script>
<style>
	.plist_info .plist_info_wrap {
		height: 250px;
		margin-top: -43px;
	}
	.plist_info_content {
		padding: 12px;
		position: relative;
	}
	.plist_info_content p {
		font-size: 16px;
		padding-right: 40px;
	}
	.plist_info_txt {
			height: 1.35em;
			overflow: hidden;
		white-space: no-repeat;
	}
	.plist_info_content img {
		position: absolute;
		right: 12px;
		top: 12px;
		width: 24px;
		height: 24px;
	}
	.plist_info_list .mint-cell-title {
		padding: 10px !important;
	}
</style>
