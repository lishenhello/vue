import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      component: require('../components/view/index')
    },
    {
    	path: '/rank',
    	component: require('../components/view/rank')
    },
    {
    	path: '/plist',
    	component: require('../components/view/plist')
    },
    {
    	path: '/single',
    	component: require('../components/view/single')
    },
    {
    	path: '/ringtone',
    	component: require('../components/view/ringtone')
    },
    {
    	path: '/rank/info/:id',
    	component: require('../components/view/rank_info')
    },
    {
        path: '/plist/info/:id',
        component: require('../components/view/plist_info')
    },
    {
        path: '/single/list/:id',
        component: require('../components/view/single_list')
    },
     {
        path: '/single/info/:id',
        component: require('../components/view/single_info')
    },
    {
        path: '/search',
        component: require('../components/view/search')
    },
    {
    	 path: '*',
      	 redirect: '/index' //重定向
    }
  ]

})
export default router
