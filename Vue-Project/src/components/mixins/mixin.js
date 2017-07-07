module.exports = {
	'PLAY_AUDIO': {
		methods: {			
				playAudio(index) {
				let hash = this.songList[index].hash
				this.$store.dispatch('getSong',hash)
				this.$store.dispatch('getLrc',hash)
				let info = {
					songList: this.songList,
					songIndex: index
				}
				this.$store.commit('setListInfo',info)
			}
		}
	},
	'INIT': {
		data() {
			return {
				songList: []
			}
		},
		created() {
			this.get()
		}
	}
}