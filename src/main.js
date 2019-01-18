import Vue from 'vue'
import Router from 'vue-router'
import Channel from '@/assets/js/channel.ajax'
import cookie from '@/assets/js/cookie'
import ViewLoader from './ViewLoader'
import registerComponents from './ComponentRegister'
import Runtime from '@/assets/js/Runtime'
import App from './App'
import VueMoment from 'vue-moment'
// import { Component, Inject, Model, Prop, Watch } from 'vue-property-decorator'
import { Component, Prop, Watch } from 'vue-property-decorator' // 用于运行时
import Meta from 'vue-meta'

// promise polyfill
if (!window.Promise) {
    var Promise = require('promise-polyfill').default
    var setAsap = require('setasap')
    Promise._immediateFn = setAsap
    window.Promise = Promise
}
// Array.find polyfill https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    /* eslint-disable no-extend-native */
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined')
            }
            var o = Object(this)
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function')
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1]
            // 5. Let k be 0.
            var k = 0
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k]
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue
                }
                // e. Increase k by 1.
                k++
            }

            // 7. Return undefined.
            return undefined
        }
    })
}

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Meta, { keyName: 'head' })
Vue.use(VueMoment)

// 注册全局组件
registerComponents()

// 注册Vue相关插件
Vue.prototype.$channel = Channel
Vue.prototype.$cookie = cookie // todo: 待移除
Runtime.cookie = cookie
Vue.prototype.$runtime = Runtime
// todo:判断是否移动端，启用fastclick插件

// 以下用于运行时
window.View = ViewLoader
window.Vue = Vue
window.Component = Component
window.Prop = Prop
window.Watch = Watch

// 设置系统路由
var routes = [{ path: '/', component: ViewLoader('sys.Home') }]
var router = new Router({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

// 延迟加载路由表
Channel.get('/api/Route').then(res => {
    var routes = []
    for (var i = 0; i < res.data.length; i++) {
        var e = res.data[i]
        routes.push({ path: e.p ? '/' + e.p : '/' + e.v.replace('.', '/'), component: ViewLoader(e.v) })
    }
    router.addRoutes(routes)
})

/* eslint-disable no-new */
new Vue({ el: '#app', router, render: h => h(App) })
