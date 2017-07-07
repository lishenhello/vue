<template>
	<div>
		<mt-cell :title="item.author" v-for='(item,index) in songList' :to='item.location' is-link >
  			<img slot="icon" :src="item.imgUrl" width="60" height="60">
		</mt-cell>
	</div>
</template>
<script type='es6'>
	import { Indicator, Cell} from 'mint-ui'
	export default {
		beforeRouteEnter(to,from,next) {
			next( vm => {
				vm.$store.commit('setHeadNav',true)
				vm.$store.commit('setNavStyle',{'background':'rgba(43,162,251,1)'})
				vm.getList()
			})
		},
		beforeRouteLeave(to,from,next) {
			this.$store.commit('setHeadNav',false)
			next()
		},
		data() {
			return {
				songList: '',

			}
		},
		components: {
			Cell, Indicator
		},
		methods: {
			getList() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				let listID = this.$route.params.id
				//console.log(listID)
				this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/singer/list/${listID}`).then( (res) => {
					Indicator.close()
					console.log(res.data)
					this.parseList(res.data)
				})
			},
			parseList(data) {
				let div = document.createElement('div')
				div.innerHTML = data
				this.title = div.querySelector('.page-title').innerText
				this.$store.commit('setTitle',this.title)
				this.songList = []
				let list = div.querySelectorAll('#panelList li')
				for( let i=0; i<list.length; i++){
					let song = {}
					song.author = list[i].querySelector('.panel-img-content-first').innerText
					song.imgUrl = list[i].querySelector('.panel-img-left img').getAttribute('_src')
					song.location = '/single/info/'+list[i].querySelector('li>a').href.substr(31)
					this.songList.push(song)
				}
			},
		}

	}
</script>
<style>
	
</style>