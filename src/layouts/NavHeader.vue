<template>
    <div :class="{ 'home-header': routerName == 'home-content' }">
        <div class="header-bg"  v-if="routerName == 'home-content'"></div>
        <el-header height="80" :class="{ 'headerSroll-bg':isColor }">
            <div :class="[{ 'headerScroll-cont':isColor },'header-cont']" >
                <div class="header-left">
                    <div class="header-home">
                        <router-link to="/home">
                            <img src="static/image/Logo.svg"/>
                            <h3>麦盟咨询</h3>
                        </router-link>
                    </div>
                    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo header-left-menu" mode="horizontal" active-text-color="#FF6536"> -->
                    <el-menu class="el-menu-demo header-left-menu" mode="horizontal" active-text-color="#FF6536" router :default-active="$route.path">
                        <el-menu-item :index="'/advantage/index'" :class="{active: routerName == 'advantage'}">
                            <span>平台优势</span>
                            <!-- <router-link :to="{ path: '/advantage' }">
                                <span>平台优势</span>
                            </router-link> -->
                        </el-menu-item>
                        <el-menu-item :index="'/rojectMarket/index'" :class="{active: (routerName == 'rojectMarket' || routerName == 'rojectMarketDetail')}">
                            <!-- <router-link :to="{ path: '/rojectMarket' }">
                                <span>项目市场</span>
                            </router-link> -->
                            <span>项目市场</span>
                        </el-menu-item>
                        <el-menu-item :index="'/resources/index'" :class="{active: routerName == 'resources'}">
                            <!-- <router-link :to="{ path: '/resources' }">
                                <span>平台资源</span>
                            </router-link> -->
                            <span>平台资源</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="header-right">
                    <!-- 未登录时显示 -->
                    <!-- <div class="login-regist" v-if="!userInfo.token"> -->
                    <div class="login-regist" v-if="!token">
                        <el-button type="primary" size="small" @click="onLogin">登录</el-button>
                        <router-link :to="{ path: '/register' }">
                            <el-button plain size="small" class="regist">
                                注册
                            </el-button>
                        </router-link>
                    </div>
                    <!-- 已登录时显示 -->
                    <div class="user-info" v-else>
                        <!-- <div class="release-project" v-if="routerName !== 'publishProject'"> -->
                        <div class="release-project" v-if="userObj && userObj.type === 0">
                            <el-button type="primary" size="small" @click.stop="showSeedDlog">发布项目</el-button>
                            <!-- <router-link :to="{path: '/publishProject'}">
                                
                            </router-link> -->
                        </div>
                        <div class="set-information">
                            <!-- <router-link :to="{path: (userObj && userObj.type === 0 ? '/personalCenter/clientUser' : '/personalCenter/userInfo') }"> -->
                            <router-link :to="{path: '/personalCenter/message'}">
                                <img :src="userObj && userObj.avatar || 'static/image/defaultAvter.png'" width="34" height="34"/>
                                <span>{{userObj && userObj.nickName}}</span>
                            </router-link>
                        </div>
                        <div class="logout" @click="onLogout"><a>退出</a></div>
                    </div>
                </div>
            </div>
        </el-header>
        <div class="banner-cont" v-if="routerName == 'home-content'">
            <img src="static/image/banner-text.png"/>
            <el-button type="primary" class="banner-btn" @click.stop="showSeedDlog" v-if="!userObj || userObj.type === 0">发布项目</el-button>
            <router-link :to="{path: '/rojectMarket'}">
                <el-button type="primary" class="banner-btn"  v-if="userObj && userObj.type === 1">查看项目</el-button>
            </router-link> 
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'  
import { Header, Menu, MenuItem, Button, Radio, RadioGroup, RadioButton, 
MessageBox, Tabs, TabPane, Form, FormItem, Dialog, Input, Pagination,Checkbox } from 'element-ui'
import { mapGetters, mapState } from 'vuex'
import { setSessionStore, getSessionStore } from '@/utils/auth'
import { logout } from '@/serverApi/registLogin'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.prototype.$confirm = MessageBox;
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton);
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Checkbox)

export default {
    name: 'nav-header',
    data() {
        return {
            name: '顶部导航',
            activeIndex: 'header-1',
            routerName: this.$route.name,
            isColor:false,
            isBgColor:false,
            scrollTop: 0,
        }
    },
    created() {
    },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    components: {
    },
    methods: {
        // 弹出登录框
        onLogin() {
            this.$store.dispatch('showLoginDialog');
        },
        // 退出登录请求
        onLogout() {
            logout().then(response => {
                if(response.code == 200){
                    this.$store.dispatch('setUserObj', null);
                    this.$router.push({path: '/home'})
                }
            })
        },
        // 显示快速发布弹框
        showSeedDlog() {
            if(!this.userObj) {
                this.$store.dispatch('showLoginDialog');
            }else {
                 this.$store.dispatch('showReleaseDialog')
            }
        },
        // 前往完整发布
        goFullRelease() {
            this.$router.push({path:'/PublishProject/0'})
            this.startProject = false;
        },
        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
            let that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop >= 500) {
                that.isColor = true
            } else {
                that.isColor = false
            }
        }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route: {
            handler: function(val, oldVal){ 
                this.routerName = val.name
            },
            // 深度观察监听
            deep: true
        },
    },
    computed: {
        ...mapGetters(['token', 'userObj']),
    }
}
</script>

<style lang='scss'>
.el-container {
    height: 100%;
}

.el-header {
    height: 80px;
    background:rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    z-index: 10;
    .header-cont {
        height: 100%;
        max-width: 1080px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        margin: 0 auto;
        .header-left {
            display: flex;
            height: 100%;
            align-items: center;
            .header-home{
                align-items: center;
                display: flex;
                a {
                    display: flex;
                }
                h3 {
                    font-size: 20px;
                    color: #FF6536;
                    font-family: PingFangSC-Medium;
                    font-weight: 600;
                    margin-left: 8px;
                    line-height: 26px;
                    width: 85px;
                }
            }
            .header-left-menu {
                margin-left: 18px;
                margin-bottom: 5px;
                // &.active {
                //     a > span{
                //         border-bottom: 2px solid;
                //         border-bottom-color: rgb(255, 101, 54);
                //         padding-bottom: 2px;
                //     }
                // }
                .el-menu-item {
                    font-size: 16px;
                    color: #333333;
                    border-bottom: none;
                    a {
                        display: inline-block;
                    }
                }
            }
        }
        .header-right {
            .login-regist {
                button {
                    width: 90px;
                    height: 28px;
                    padding: 0;
                    margin: 0 9px;
                    border-radius: 4px;
                    &.regist {
                        border-color: #FF6536;
                        span {
                            color: #FF6536;
                        }
                    }
                }
            }
            .user-info {
                display: flex;
                flex-direction: row;
                align-items: center;
                .release-project {
                    button {
                        width: 130px;
                        height: 32px;
                        font-size: 14px;
                    }
                }
                .set-information {
                    margin-left: 30px;
                    margin-right: 15px;
                    a {
                        display: flex;
                        align-items: center;
                    }
                    span {
                        font-size: 14px;
                        margin-left: 10px;
                    }
                    img {
                        border-radius: 50%;
                    }
                }
                .logout {
                    padding-left: 15px;
                    border-left: 1px solid #E0E0E0;
                    a {
                        cursor: pointer;
                        font-size: 14px;
                        color: #666666;
                    }
                }
            }
        }
    }
    .head-item {
        cursor: pointer;
    }
    .header-aside {
        font-size: 22px;
    }
    .el-menu-demo {
        .el-menu-item {
            padding: 0 15px;
        }
    }
    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }
    .el-menu--horizontal>.el-menu-item.is-active.active {
        border-bottom: none;
        // a > span{
        //     border-bottom: 2px solid;
        //     border-bottom-color: rgb(255, 101, 54);
        //     padding-bottom: 2px;
        //     color: #ff6536;
        // }
         span{
            border-bottom: 2px solid;
            border-bottom-color: rgb(255, 101, 54);
            padding-bottom: 2px;
            color: #ff6536;
        }
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        border-bottom: none
    }
    .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
        border-bottom: none
    }
    .work-dialog {
        .el-dialog--center .el-dialog__body {
            padding: 25px 40px 0 20px;
        }
        .el-dialog__title {
            font-size: 20px;
            color: #333;
            font-weight: 600;
        }
        .el-textarea {
            width: 100%;
            .el-textarea__inner {
                height: 100px;
            }
        }
        .el-dialog__footer {
            padding-bottom: 40px;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #000;
            font-size: 20px;
            font-weight: 600;
        }
        .dialog-footer1 {
            .el-button {
                width: 120px;
                height: 32px;
                span {
                    display: block;
                    margin-top: -4px;
                }
            }
        }
        .goRelease {
            text-align: right;
            // padding-right: 90px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            a {
                color:rgba(255,137,95,1);
                line-height: 20px;
            }
        }
    }
    .rapid-release {
        .el-form-item {
            margin-bottom: 6px;
        }
    }
}
.home-header {
    height: 500px;
    background-size: cover;
    background-image: url('../../static/image/banner.png');
    background-repeat: no-repeat;
    .scrollColor {
        font-size: #FF6536
    }
    .header-bg {
        width: 100%;
        height: 80px;
        position: fixed;
        background: linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
        opacity: 0.4654;
        filter: blur(0px);
    }
    
    .el-header {
        background: none;
        box-shadow: inherit;
        .header-cont .header-left .header-left-menu {
            background: none;
            span {
                color: #fff;
            }
        }
        .header-cont .header-right .user-info .logout a {
            color: #fff;
        }
        .header-right .user-info .release-project button {
            font-size: 14px;
            background: rgba(255,101,54,1);
            box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.3);
            border-radius: 2px;
        }
        
        .headerScroll-cont .header-left .header-left-menu {
            span {
                color: #333333;
            }
        }
        .headerScroll-cont .header-right .user-info .logout a {
            color: #333333;
        }
        .headerScroll-cont .header-right .user-info .set-information a span{
            color: #333333;
        }
        .header-right {
            .login-regist {
                .regist {
                    border-radius:4px;
                    border:1px solid rgba(255,255,255,1) !important;
                    // border: none;
                    background: none;
                    span {
                        color: #fff !important;
                    }
                }
                .el-button.is-plain:hover, .el-button.is-plain:focus {
                    border: none;
                }
            }
        }
        .headerScroll-cont .header-right {
            .login-regist {
                .regist {
                    border:1px solid #FF6536 !important;
                    span {
                        color: #FF6536 !important;
                    }
                }
            }
        }
    }
    .headerSroll-bg {
        background: #fff;
        box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
        opacity: 1;
    }
    .el-menu-item:hover, .el-menu-item:focus {
        background: none;
    }
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
        background: none;
    }
    span {
        color: #fff;
    }
    .banner-cont {
        height: 420px;
        max-width: 920px;
        margin: 0 auto;
        text-align: left;
        img {
            display: block;
            margin-top: 150px;
            max-height:46%;
        }
        .banner-btn {
            width: 130px;
            height: 45px;
            margin-top: 50px;
            background: rgba(255,101,54,1);
            box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.3);
            border-radius: 3px;
            font-size: 18px;
            &:hover {
                background: #ff845e;
            }
            span {
                color: #FBFBFB;
            }
        }
    }
   
}
</style>
