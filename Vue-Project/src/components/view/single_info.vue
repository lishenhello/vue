<template>
	<div class="single_info">
		<div :style="{'background-image':'url('+imgSrc+')','background-size':'100%','background-repeat':'no-repeat','background-position':'center'}" class="single_info_img"></div>
		<div class="single_info_content">
			<p :class="{'single_info_txt':descripition}">{{content}}</p>
			<img src="../../assets/images/close_icon.png" alt="" @click="toggleDesc" v-if="descripition">
			<img src='../../assets/images/open_icon.png' alt="" @click="toggleDesc" v-else>
		</div>
	</div>
</template>
<script type='es6'>
	import { Indicator } from 'mint-ui'
	export default {
		beforeRouteEnter(to,from,next) {
			next( (vm) => {
				vm.$store.commit('setHeadNav',true)
				vm.getInfo()
				window.onscroll = () =>{
					vm.opacity = window.pageYOffset/250
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
				opacity: '',
				title: '',
				imgSrc: '',
				content: '',
				descripition: true,
			}
		},
		components: {Indicator},
		methods: {
			getInfo() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				let infoID = this.$route.params.id
				this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/singer/info/${infoID}`).then( (res) => {
					Indicator.close()
					console.log(res.data)
					this.parseList(res.data)
				})
			},
			parseList(data) {
				let div = document.createElement('div')
				div.innerHTML = data
				this.title = div.querySelector('.intro strong').innerText
				this.$store.commit('setTitle',this.title)
				this.imgSrc = div.querySelector('.top img').getAttribute('_src')
				//console.log(this.imgSrc)
				this.content = div.querySelector('#singer_content p').innerText
			},
			toggleDesc() {
				this.descripition = !this.descripition
			}
		}
	}
</script>
<style>
	.single_info_img {
		width: 100%;
		height: 250px;
	}
	.single_info_txt {
		height: 1.35em;
		overflow: hidden;
		white-space: no-repeat;
	}
	.single_info_content {
		padding: 10px 10px;
		position: relative;
	}
	.single_info_content p {
		padding-right: 40px;
		text-indent: 2em;
		font-size: 16px;
	}
	.single_info_content img {
		position: absolute;
		right: 12px;
		top: 12px;
		width: 24px;
		height: 24px;
	}
</style>