<template>
	<mt-navbar v-model="setNav">
  	<mt-tab-item id="nav1" @click.native="goRouter(1)">新歌</mt-tab-item>
  	<mt-tab-item id="nav2" @click.native="goRouter(2)">排行</mt-tab-item>
  	<mt-tab-item id="nav3" @click.native="goRouter(3)">歌单</mt-tab-item>
  	<mt-tab-item id="nav4" @click.native="goRouter(4)">歌手</mt-tab-item>
  	<mt-tab-item id="nav5" @click.native="goRouter(5)">彩铃</mt-tab-item>
	</mt-navbar>
</template>
<script>
	import { Navbar, TabItem } from 'mint-ui';
	import { mapState } from 'vuex'
	export default {
		name: 'v-nav',
		components:{
			Navbar, TabItem
		},
		computed: {
			...mapState(['setNav'])
		},
		methods:{
			goRouter(index) {
				this.$store.commit('nomain',index)
				console.log(this.$store.state)
				switch (index) {
					case 1 :
						this.$router.push({path:'index'})
						break
					case 2 :
						this.$router.push({path:'rank'})
						break
					case 3 :
						this.$router.push({path:'plist'})
						break
					case 4 :
						this.$router.push({path:'single'})
						break
					case 5 :
						this.$router.push({path:'ringtone'})
						break
				}
			}
		}
	}
</script>
<style>
	.mint-navbar {
		height: 43px;
		padding: 0 10px;
		border-bottom:3px solid #f4f4f4;
		position: fixed;
		top: 50px;
		width: 100%;
		z-index: 2;
	}
	.mint-tab-item {
		padding: 0 !important;
		text-decoration: none !important;
	}
	.mint-tab-item-label {
		height: 100%;
		font-size: 16px !important;
		line-height: 43px !important;
	}
	.mint-navbar .mint-tab-item.is-selected {
			margin-bottom: 0 !important;
	}
</style>