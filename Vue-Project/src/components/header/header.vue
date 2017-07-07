<template>
	<header>
		<div class="header_content">
			<a class="header_logo">
				<img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
			</a>
			<a class="header_download" href='http://pan.baidu.com/s/1eSMb7e6'>下载酷狗</a>
			<div class="header_search" @click='searchRoute'>
				<img src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
			</div>
		</div>
	</header>
</template>
<script>
	export default {
		name: 'v-header',
		methods: {
			searchRoute() {
				this.$store.commit('showDetailPlayer',false)
				this.$router.push({path:'/search'})
			}
		}
	}
</script>
<style>
	a {
		text-decoration: none;
	}
	header {
		width: 100%;
		height: 50px;
		background-color: #2CA2F9;
		position: fixed;
		z-index: 100;
	}
	.header_content {
		width: 100%;
		height: 100%;
		padding: 10px;
	}
	.header_logo {
		height: 100%;
		float: left;
		display: block;
	}
	.header_logo img {
		height: 100%;
	}
	.header_download {
		height: 100%;
		line-height: 30px;
		border: 1px solid #fff;
		display: block;
		width: 25%;
		float: left;
		color: #fff;
		margin-left: 10px;
		text-align: center;
		border-radius: 4px;
	}
	.header_search {
		height: 100%;
		float: right;
		display: block;
	}
	.header_search img {
		margin-top: 2.5px;
		height: 25px;
	}
	
</style>