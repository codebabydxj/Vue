<template>
    <el-container>
        <NavHeader/>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer height="300">
            <FooterFull/>
        </el-footer>
        <!-- 登录弹出框 -->
        <LoginDialog />
        <!-- 快速发布弹框 -->
        <RapidRelease />
        <div class="home-fex">
            <div class="weix-float-window">
                <el-tooltip class="item" effect="light" placement="left-start" popper-class="weix-slot-content">
                    <div slot="content" class="weix-slot-content">
                        <img src="static/image/qrcode.png" width="120" height="120"/>
                    </div>
                    <div @mouseover="isShowText.weix=true" @mouseout="isShowText.weix=false" class="slot-img-text">
                        <img v-if="!isShowText.weix" class="icon" src="static/image/home-weix.png" width="32" height="32"/>
                        <p v-if="isShowText.weix" class="hover-text">微信<br/>客服</p>
                    </div>
                </el-tooltip>
            </div>
            <div class="call-float-window">
                <el-tooltip class="item" effect="light" placement="left-start" popper-class="call-slot-content">
                    <div slot="content">
                        <p>0755-86959936</p>
                    </div>
                    <div @mouseover="isShowText.call=true" @mouseout="isShowText.call=false" class="slot-img-text mt10">
                        <img v-if="!isShowText.call" class="icon" src="static/image/home-call.png" width="32" height="32"/>
                        <p v-if="isShowText.call" class="hover-text">客服<br/>电话</p>
                    </div>
                    <img class="icon mt20" src="static/image/home-call.png" width="32" height="32"/>
                </el-tooltip>
            </div>
            <div class="top-float-window" v-if="isTop">
                <div @mouseover="isShowText.top=true" @mouseout="isShowText.top=false" class="slot-img-text mt10">
                    <img v-if="!isShowText.top" class="icon" src="static/image/home-top.png" width="32" height="32"/>
                    <p v-if="isShowText.top" class="hover-text" @click="backTop">置顶</p>
                </div>
            </div>
        </div>
    </el-container>
    
</template>

<script>
import Vue from 'vue'
import { Container, Main, Footer, Tooltip } from 'element-ui'
import NavHeader from './NavHeader'
import FooterFull from './FooterFull'
import LoginDialog from './LoginDialog'
import RapidRelease from './RapidRelease'
Vue.use(Container)
Vue.use(Main) 
Vue.use(Footer)
Vue.use(Tooltip);

export default {
    name: 'Layout',
    components: {
        NavHeader,
        FooterFull,
        LoginDialog,
        RapidRelease
    },
    data() {
        return {
            name: '首页内容',
            isShowText: {
                weix: false,
                call: false,
                top: false
            },
            scrollTop: 0,
            isTop: false
        }
    },
    created() {
        
    },
     mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    methods: {
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop () {
            let that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 16)
            this.isShowText.top = false
        },
        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
            let that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
                that.isTop = true
            } else {
                that.isTop = false
            }
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
    },
    watch: {
        
    },
    computed: {
        
    }
}
</script>

<style lang='scss'>
.el-container {
    height: 100%;
    .home-fex {
        width: 58px;
        border-radius: 29px;
        border: 1px solid rgba(216,216,216,1);
        padding: 5px;
        position: fixed;
        right: 10px;
        bottom: 35%;
        background-color: #fff;
        box-sizing: border-box;
        .slot-img-text {
            width: 46px;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .hover-text {
            height: 100%;
            background: rgba(255,137,95,1);
            border-radius: 50%;
            -webkit-border-radius: 50%;
            line-height: 15px;
            font-size: 12px;
            color: #fff;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        } 
    }
}
.el-main {
    // height: 100%;
    padding: 0 !important;
    background-color: #F8F8F8;
    color: #333;
    overflow: visible !important;
    flex-basis: 100% !important;
    .main-cont {
        margin: 0 auto;
    }
}

.el-footer {
    height: 300px;
    background-color: #41403E;
}

</style>
