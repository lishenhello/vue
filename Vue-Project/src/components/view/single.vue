<template>
	<div class="single">
		<div class="single-box">
			<div to='/single/list/88' @click='goRouter($event)'>热门歌手</div>
		</div>
		<div class="single-box">
			<div to='/single/list/1' @click='goRouter($event)'>华语男歌手</div>
			<div to='/single/list/2' @click='goRouter($event)'>华语女歌手</div>
			<div to='/single/list/3' @click='goRouter($event)'>华语组合</div>
		</div>
		<div class="single-box">
			<div to='/single/list/4' @click='goRouter($event)'>日韩男歌手</div>
			<div to='/single/list/5' @click='goRouter($event)'>日韩女歌手</div>
			<div to='/single/list/6' @click='goRouter($event)'>日韩组合</div>
		</div>
		<div class="single-box">
			<div to='/single/list/7' @click='goRouter($event)'>欧美男歌手</div>
			<div to='/single/list/8' @click='goRouter($event)'>欧美女歌手</div>
			<div to='/single/list/9' @click='goRouter($event)'>欧美组合</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			goRouter(e) {
				console.log(e);
				let router = e.target.attributes.to.value
				console.log(router)
				this.$router.push(router)
			}
		}
	}
</script>
<style>
.single {
	padding: 0 10px;
}
.single .single-box {
	margin-top: 15px;
	background-color: #fbfbfb;
}
.single .single-box div {
	height: 42px;
	padding: 12px 15px;
	border: 1px solid #e4e4e4;
	border-radius: 4px;
	position: relative;
}
.single .single-box div:nth-child(2),.single .single-box div:nth-child(3){
	border-top: none;
}
.single .single-box div::before {
	content: '>';
	display:inline-block;
	position: absolute;
	top: 9px;
	right: 10px;
	font-family: '黑体';
	font-size: 20px;
	color: #ccc;
}
</style>