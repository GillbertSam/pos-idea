import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/pages/HelloWorld'
import Pos from '@/components/pages/Pos'

Vue.use(Router)

export default new Router({
  // base:'/dist',
  // mode:'history',
  routes: [
    {
      path: '/pos',
      name: 'Pos',
      component: Pos
    },{
      path: '/',
      name: 'home',
      redirect:'/pos'
    }
  ]
})
