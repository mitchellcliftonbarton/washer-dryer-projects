import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Exhibitions from '@/components/Exhibitions'
import Info from '@/components/Info'
import Catalog from '@/components/Catalog'
import Show from '@/components/Show'
import Artists from '@/components/Artists'
import News from '@/components/News'
import NewsStory from '@/components/NewsStory'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/exhibitions',
      name: 'Exhibitions',
      component: Exhibitions
    },
    {
      path: '/exhibitions/:show',
      name: 'Show',
      component: Show
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/contributors',
      name: 'Contributors',
      component: Artists
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/news/:story',
      name: 'NewsStory',
      component: NewsStory
    }
  ]
})
