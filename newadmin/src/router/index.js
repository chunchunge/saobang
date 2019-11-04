import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login.vue'
import PostList from '@/pages/PostList.vue'
import EditPost from '@/pages/EditPost.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: Home,
      meta: "首页",
      // 嵌套子路由
      children:[
         // 嵌套子路由不能有以斜杠开头
          // 因为那代表根路径
        {
          path: 'postlist',
          name: 'postlistPage',
          component: PostList,
          meta: "文章列表"
        },
        {
          path: 'editpost',
          name: 'editPostPage',
          component: EditPost,
          meta: "编辑文章"
        }
      ]

    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login
    },
    
  ]
})
