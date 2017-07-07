import Vue from 'vue' //导入vue文件
import Vuex from 'vuex' //导入vuex文件
Vue.use(Vuex) //注册组件

//实例一个store仓库
const store = new Vuex.Store({
	state: {//初始状态
		audio: { //audio的播放参数
			songUrl:'',//歌曲链接
			imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png', //图片地址
			title:'',//歌名
			single: '', //歌手
			currentFlag: false, //跳转播放的标记
			currentLength: 0, //播放歌曲的当前时长(当前进度)
			songLength: 0, //歌曲的总时长
		},
		header: {//详情页头部导航条
			toggle: false, //显示切换
			title: '', 	//导航条标题
			style: {'background':'rgba(43,162,251,0)'} //导航条背景色
		},
		listInfo: { //获取当前页面的歌曲列表和当前点击的歌曲索引号
			songList: [], //播放的歌曲列表
			songIndex: 0,	//索引号
		},
		setNav:'nav1',//路由分页转换
		isPlay: false, //是否播放
		listenCount: 0, //判断是不是首次进入的标记
		showDetailPlayer: false, //显示播放详情页
		showPlayer: false,  //判断是否选中歌曲
		songSrc: '', // 歌曲歌词
		audioLoadding: false, //切换音乐时的过渡动画。

	},
	getters: {//从初始化state中提取数据
		audio: state => state.audio,
		isPlay: state => state.isPlay,
		showDetailPlayer: state => state.showDetailPlayer,
		songSrc: state => state.songSrc,
		audioLoadding: state => state.audioLoadding,
		showPlayer: state => state.showPlayer,
	},
	mutations: {//处理事件函数,
		nomain: (state,index) => { //切换路由分页的状态
			state.setNav = 'nav'+index
		},
		toggleAudioLoadding: (state,toggle) => { //加载过渡动画的切换
			state.audioLoadding = toggle 
		},
		setAudio: (state,audio) => { //音乐播放器信息的切换
			if(!state.listenCount) {
				state.showPlayer = true //首次进入应用时不可打开播放详情
			}
			state.listenCount++
			state.audio = {...(state.audio),...audio}

		},
		setHeadNav: (state,toggle) => { //主页面头部导航切换
			state.header.toggle = toggle
		},
		setTitle: (state,current) => { //设置头部标题
			state.header.title = current
		},
		setNavStyle: (state,current) => {  //设置头部背景颜色样式
			state.header.style = current
		},
		isPlay: (state,toggleIsplay) => {//是否播放切换
			state.isPlay = toggleIsplay
		},
		showDetailPlayer: (state,flag) => { //详情页切换
			state.showDetailPlayer = flag 
		},
		setCurrent: (state,flag) => {//设置跳播后的时长
			state.audio.currentFlag = flag 
		},
		setAudioTime: (state,flag) => { //切换跳转的播放时长
			state.audio.currentLength = flag
		},
		setLrc: (state,current) => { //切换歌曲歌词
			state.songSrc = current
		},
		setListInfo: (state,{songList,songIndex}) => { //切换歌曲列表信息
			state.listInfo.songList = songList
			state.listInfo.songIndex = songIndex
		},
		showPlayer: (state,flag) => {  //选中歌曲切换
			state.showPlayer = flag
		}

	},
	actions: {//与mutations函数基本一致,唯一不同点可进行异步操作。。
		getSong( {commit,state},hash) { //获取歌曲信息
			commit('toggleAudioLoadding',true)//加载过渡动画
			Vue.http.get(`http://cs003.m2828.com/apis/getKugouSong.php?hash=${hash}`).then( (res) => {
				commit('toggleAudioLoadding',false)
				console.log(res.data)
				//console.log(res.data.imgUrl)
				let songUrl = res.data.url,
					imgUrl = res.data.imgUrl.split('{size}').join('100'),
					title = res.data.songName,
					single = res.data.singerName,
					songLength = res.data.timeLength,
					currentLength = 0,
					audio = {songUrl,imgUrl,title,single,currentLength,songLength}
				commit('setAudio',audio)
				//console.log(imgUrl)
				//console.log(songUrl)
			})
		},
		getLrc( {commit,state},hash) { //获取歌词
			Vue.http.get(`http://cs003.m2828.com/apis/getLrc.php?hash=${hash}`).then( (res) => {
				//console.log(res.data);
				commit('setLrc',res.data)
			})
		},
		next( {dispatch,state}) { //播放下一首
			let list = state.listInfo.songList
			let index = state.listInfo.songIndex
			//console.log(list)
			console.log(index)
			if(index<list.length){
				index++
				console.log(index)

			}else {
				index = 0
			}
			state.listInfo.songIndex = index
			let hash = list[index].hash
			dispatch('getSong',hash)
			dispatch('getLrc',hash)
		},
		prev( {dispatch,state}) { //播放上一首
			let list = state.listInfo.songList
			console.log(list)
			if(state.listInfo.songIndex>0) {
				state.listInfo.songIndex--
			}else{
				state.listInfo.songIndex = list.length-1
			}
			let hash = list[state.listInfo.songIndex].hash
			dispatch('getSong',hash)
			dispatch('getLrc',hash)
		}
	}
})

//导出实例对象
export default store
