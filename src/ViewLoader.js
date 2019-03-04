/**
 * 该实现仅用于运行时异步加载ViewModel的组件，使用缓存
 */

import Vue from 'vue'
import channel from './assets/js/channel.ajax'

export default function (viewModelID) {
    var name = viewModelID.replace('.', '')
    return Vue.component(name, function (resolve, reject) {
        // 开始Download代码及样式
        channel.get('/api/Route/Load?id=' + viewModelID).then(res => {
            const result = res.data
            if (!result.Code) {
                reject('ViewModel has not compiled.')
            }

            // 定义需要的样式控制
            var styleMixin = null
            if (result.Style) {
                styleMixin = {
                    created() {
                        // console.log('织入样式', this.$root.$children[0].$children[0])
                        this.$root.$children[0].$children[0].viewCreated(viewModelID, result.Style)
                    },
                    destroyed() {
                        // console.log('取消织入样式')
                        this.$root.$children[0].$children[0].viewDestroyed(viewModelID)
                    }
                }
            }

            try {
                var vueProfile = new Function(result.Code)() || {} // eslint-disable-line
                if (result.Style) {
                    // vueProfile.options.mixins.push(styleMixin) // 此种方式无效，注入样式控制
                    if (vueProfile.options.created) {
                        vueProfile.options.created = [styleMixin.created].concat(vueProfile.options.created)
                    } else {
                        vueProfile.options.created = [styleMixin.created]
                    }
                    if (vueProfile.options.destroyed) {
                        vueProfile.options.destroyed = [styleMixin.destroyed].concat(vueProfile.options.destroyed)
                    } else {
                        vueProfile.options.destroyed = [styleMixin.destroyed]
                    }
                }

                resolve(vueProfile)
            } catch (error) {
                reject(error)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
