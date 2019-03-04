import Vue from 'vue'
import Runtime from '@/assets/js/Runtime'
import ViewLoader from './ViewLoader'
import cookie from '@/assets/js/cookie'
import Channel from '@/assets/js/channel.ajax'
// import { Component, Inject, Model, Prop, Watch } from 'vue-property-decorator'
import { Component, Prop, Watch } from 'vue-property-decorator' // 用于运行时

export default function () {
    Runtime._isDevelopment = false
    Runtime.cookie = cookie
    Runtime.channel = Channel // 根据是否预览设置不同的channel
    Runtime.cookie = cookie
    // todo:判断是否移动端，启用fastclick插件
    window.$runtime = Runtime
    window.View = ViewLoader
    window.Vue = Vue
    window.Component = Component
    window.Prop = Prop
    window.Watch = Watch
}