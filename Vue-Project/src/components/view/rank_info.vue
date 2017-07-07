<template>
	<div class="rank_info">
		<div class="rank_info_wrap" :style="{'background-image':'url('+ imgSrc +')','background-size':'100%','background-repeat':'no-repeat','background-position':'center'}" >
			<p>{{updateTime}}</p>
		</div>
		<div class="rank_info_list">
			<mt-cell v-for="(item,index) in songList" :title='item.title' :label="item.desp" @click.native='playAudio(index)'>
				<a :href="item.orderUrl">
					<s>{{index+1}}</s>
					<img src="../../assets/images/download_icon.png" alt="" width="20px" height="20px">
				</a>
			</mt-cell>
		</div>
	</div>
</template>
<script>
import { Indicator,Cell } from 'mint-ui'
import {PLAY_AUDIO} from '../mixins/mixin.js'
export default {
	mixins:[PLAY_AUDIO],
	beforeRouteEnter(to,from,next) {
		next( vm => {
			vm.$store.commit('setHeadNav',true)
			vm.getList()//在钩子函数中获取数据并渲染页面
			//根据滚动高度设置透明度
			window.onscroll = () => {
				vm.opacity = window.pageYOffset/250;
				vm.$store.commit('setNavStyle',{background:`rgba(43,162,251,${vm.opacity})`});
			}
		})
	},
	beforeRouteLeave(to,from,next) {
		this.$store.commit('setHeadNav',false)
		window.onscroll=null
		next()
	},
	data() {
		return {
			songList:[],
			imgSrc: '',
			updateTime:'',
		}
	},
	components: {
			Cell,Indicator
	},
	methods: {
		getList() {
			Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
			let infoID = this.$route.params.id //拿到当前页面的锚点值
			console.log(infoID)
			// console.log(33);
			this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/rank/info/${infoID}`).then(res =>{
					Indicator.close()
					// console.log(res.data)
					this.parseList(res.data) //调用这个方法
				})
		},
		parseList(data) {
			 var div=document.createElement('div');
        		div.innerHTML=data;
        		// console.log(data);
        		// console.log(this);
        		this.imgSrc=div.querySelector('#imgBoxInfo img').src;
        		// console.log(this.imgSrc);
        		this.updateTime = div.querySelector('.rank-info-time span').innerText;
        		this.title = div.querySelector('.page-title').innerText;
        		this.$store.commit('setTitle',this.title)
        		let list = div.querySelectorAll('.panel-songslist-item');
        		// console.log(list);
        		this.songList = [] ; //再次重置整个列表。。防止重复渲染。
        		for(let i=0; i<list.length; i++) {
        			let song = {}
        			song.title = list[i].querySelector('.panel-songs-item-name span').innerText
        			song.hash = list[i].id.substr(6)
        			this.songList.push(song);
        		}
        		console.log(this.songList);
        	
        },
   //      playAudio(index) {
			// 	let hash = this.songList[index].hash
			// 	console.log(hash)
			// 	this.$store.dispatch('getSong',hash)
			// 	this.$store.dispatch('getLrc',hash)
			// 	let info = {
			// 		songList: this.songList,
			// 		songIndex: index
			// 	}
			// 	this.$store.commit('setListInfo',info)
			// },
		}
	}

</script>
<style>
	.rank_info {
		width: 100%;
	}
	.rank_info_wrap {
		width: 100%;
		height: 200px;
		overflow: hidden;
		margin-top: -43px;
	}
	.rank_info_wrap p {
		width: 100%;
		height: 43px;
		line-height: 43px;
		color: #fff;
		padding: 0 10px;
		margin-top: 157px;
		background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,0));
		font-family: '微软雅黑';

	}
	.rank_info_list {

	} 
	.rank_info_list .mint-cell-title {
		padding-left: 45px !important;
	}
	.rank_info_list s {
		text-decoration: none;
		padding: 2px 8px;
		position: absolute;
		top: 50%;
		margin-top: -8px;
		left: 10px;
		font-size: 12px;
		border-radius: 8px;

	}
	.rank_info_list .mint-cell:nth-child(1) s {
		background-color: #e80000;
		color: #fff;
	}
	.rank_info_list .mint-cell:nth-child(2) s {
		background-color: #FF7200;
		color: #fff;
	}
	.rank_info_list .mint-cell:nth-child(3) s {
		background-color: #F8B300;
		color: #fff;
	}
</style>