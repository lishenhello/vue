<template>
	<div class="rankNav_box" :style="style">
		<div class="rankNav" >
			<b @click='routerBack'></b>
			<div>{{title}}</div>
		</div>
	</div>
</template>
<script type='es6'>
	export default {
		name: 'v-rankNav',
		props: ['title','style'], //父子组件传值
		methods: {
			routerBack() {
				console.log(this);
				this.$router.go(-1);
			}
		}
	}
</script>
<style>
.main {
	/*padding-top: 50px;*/
}
.rankNav_box {
	width: 100%;
	position: fixed;
	top: 50px;
	z-index: 2;
}
.rankNav {
	height: 43px;
	padding: 0 10px;
}
.rankNav b {
	display: block;
	width: 24px;
	height: 43px;
	background:url('../../assets/images/goback_icon.png') center no-repeat;
	-webkit-background-size: 60%;
	background-size: 60%;
	float: left;
}
.rankNav div {
	line-height: 43px;
	text-align: center;
	font-size: 18px;
	color: white;
}
</style>