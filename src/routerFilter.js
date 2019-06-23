
import NProgress from 'nprogress'
import router from './router'
import store from './store'
import { accessUrl } from '@/serverApi/common';

import 'nprogress/nprogress.css'
import { getSessionStore } from './utils/auth'

// 判断在什么设备下查看
const BrowserRedirect = () => {
    let sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  // 您使用的设备是：phone
        return true
    } else { // 您使用的设备是：pc
        return false
    }
}

// 根据路由名称判断跳转（跳转到微信页面）
const GoBackPage = (route) => {
    let routeName =  route.name;
    if(routeName == 'rojectMarket') {
        window.location.href = accessUrl + '?source=history&page=7'
    }else if(routeName =='consultantMarket'){
        window.location.href = accessUrl + '?source=history&page=2&homeType=checkfinanceAll'
    }else {
        window.location.href = accessUrl
    }
}

NProgress.configure({showSpinner: false}) //加载图标是否显示

router.beforeEach((to, from, next) => {
    NProgress.start()
    if(BrowserRedirect()) {  // 判断是否为移动设备访问
        GoBackPage(to)
    }
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.getters.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            store.dispatch('showLoginDialog');
            next();
            router.push({ path: '/home',query: { redirect: to.fullPath }})
        }
    }
    else {
        next();
    }
    /* 存在说明已经登录，否则到登录页面 */
    // if (getSessionStore('username')) {
    //     console.log(to,'&&&%%')
    //     next()
    //     if(to.path === '/login'){
    //         router.push({ path: '/home'})
    //     }
    //     NProgress.done()
    // } else {
    //     next()
    //     if(to.path !== '/login'){
    //         router.push({ path: '/login',query: { redirect: to.fullPath }})
    //     }
    //     NProgress.done()
    // }
    // console.log(to, from, '==============')
})

router.afterEach(() => {
    window.scrollTo(0,0)
    NProgress.done()
})
