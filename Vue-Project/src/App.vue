<template>
  <div id="app">
    <v-header></v-header>
    <v-rankNav v-if='header.toggle' :title='header.title' :style='header.style'></v-rankNav>
    <v-nav v-else></v-nav>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <player></player>
    <detailPlayer></detailPlayer>
  </div>
</template>

<script>
//keep-alive 长连接，，为了避免页面的重复加载，优化性能。vue2.0支持
import vHeader from './components/header/header'
import vNav from './components/nav/nav'
import player from './components/player/player'
import vRankNav from './components/rankNav/rankNav'
import detailPlayer from './components/detailPlayer/detailPlayer'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
      vHeader,vNav,player,vRankNav,detailPlayer
  },
  computed: {
    ...mapState(['header'])
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  padding-top: 93px;
}
</style>
