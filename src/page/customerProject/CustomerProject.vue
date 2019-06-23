<template>
    <div class="personal-center">
        <div class="left-menu">
            <div class="menu-userinfo">
                <el-menu class="el-menu-demo personalCenter-left-menu" active-text-color="#FF6536" :default-active="$route.path">
                    <el-menu-item :index="'customerDetails'" :class="{ active: routerName == 'customerDetails' }">
                        <router-link :to="{ path: '/customerProject/details/'+$route.params.pid }">项目详情</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerConsultant'" :class="{ active: (routerName == 'customerConsultant' || routerName == 'consultantDetails') }">
                        <router-link :to="{ path: '/customerProject/consultant/'+$route.params.pid }">项目顾问</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerProgram'" :class="{ active: (routerName == 'customerProgram' ||　routerName == 'customer-programDetails') }">
                        <router-link :to="{ path: '/customerProject/program/'+$route.params.pid }">项目方案</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerStage'" :class="{ active: (routerName == 'customerStage' || routerName == 'customer-stageDetails') }">
                        <router-link :to="{ path: '/customerProject/stage/'+$route.params.pid }">阶段</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerDocument'"  :class="{ active: routerName == 'customerDocument' }">
                        <router-link :to="{ path: '/customerProject/document/'+$route.params.pid }">文档</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerPayment'" :class="{ active: routerName == 'customerPayment' || routerName == 'customer-paymentDetails' }">
                        <router-link :to="{ path: '/customerProject/payment/'+$route.params.pid }">支付记录</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'customerInvoice'" :class="{ active: routerName == 'customerInvoice' || routerName == 'customer-invoiceDetails' }">
                        <router-link :to="{ path: '/customerProject/invoice/'+$route.params.pid }">发票</router-link>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="focus-on-box">
                <p>关注公众号</p>
                <img src="static/image/qrcode.png"/>
            </div>
        </div>
        <div class="right-cont">
            <template>
                <router-view></router-view>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { Header, Menu, MenuItem, Button } from 'element-ui'
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
export default {
    data() {
        return {
            title: '客户项目',
            routerName: this.$route.name
        }
    },
    created() {

        // console.log(this.$route, this.$route.params, '客户项目')
    },
    methods: {
        
    },
    computed: {
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.routerName = val.name
            },
            // 深度观察监听
            deep: true
        }
    }
}
</script>

<style lang='scss' scope>
.personal-center {
    max-width: 940px;
    // min-height: 600px;
    margin: 0 auto;
    // margin-top: 60px;
    margin-top: 140px;
    margin-bottom: 146px;
    display: flex;
    flex-direction: row;
    .left-menu {
        width: 170px;
        margin-right: 50px;
        .menu-userinfo {
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
            border-radius:3px;
            .userinfo {
                padding: 20px 0;
                img {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                }
                .username {
                    margin-top: 10px;
                    span {
                        font-size: 18px;
                    }
                    i {
                        font-size: 16px;
                        color: #597EF7;
                        margin-left: 5px;
                    }
                    
                }
            }
            .personalCenter-left-menu {
                .el-menu-item {
                    height: 48px;
                    line-height: 48px;
                    font-size: 16px;
                    &.active {
                        background-color: #EFEFEF;
                    }
                    a {
                        width: 100%;
                        display: inline-block;
                        color: #666666;
                    }
                }
                .el-menu-item:hover, .el-menu-item:focus {
                    background-color: #EFEFEF;
                }
            }
        }
        .focus-on-box {
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
            border-radius:3px;
            margin-top: 20px;
            padding: 20px 0;
            p {
                font-size: 16px;
                color: #FF895F;
                margin-bottom: 10px;
            }
            img{
                width: 108px;
                border: 2px solid #D9D9D9;
            }
        }
    }
    .right-cont {
        flex: 1;
    }
}
</style>