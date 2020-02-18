import Vue from 'vue'
import Router from 'vue-router'
import ViewLoader from './ViewLoader'
import polyfill from './polyfill'
import initRuntime from './InitRuntime'
import Channel from '@/assets/js/channel.ajax'
import registerComponents from './ComponentRegister'
import App from './App.vue'
// import VueMoment from 'vue-moment'
import Meta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Meta, { keyName: 'meta' })
// Vue.use(VueMoment)

polyfill()
initRuntime() // 初始化运行时
registerComponents() // 注册全局组件

// 设置系统路由
var routes = [{ path: '/', component: ViewLoader('sys.Home') }]
var router = new Router({
    base: process.env.BASE_URL,
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
});

// 延迟加载静态路由表
(<any>Channel).get('/api/Route').then(res => {
    var routes = []
    for (let i = 0; i < res.data.length; i++) {
        const e = res.data[i]
        let r = { path: e.p ? '/' + e.p : '/' + e.v.replace('.', '/'), component: ViewLoader(e.v) }
        if (e.s) { //有子级
            let children = []
            for (let j = 0; j < e.s.length; j++) {
                const element = e.s[j]
                children.push({ path: '/' + element.p, component: ViewLoader(element.v) })
            }
            (<any>r).children = children
        }
        routes.push(r)
    }
    router.addRoutes(routes)
})

/* eslint-disable no-new */
new Vue({ el: '#app', router, render: h => h(App) })
