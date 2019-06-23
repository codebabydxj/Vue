<template>
    <div class="regist-bg">
        <div class="regist-bg2">
            <div class="regist-cont">
                <h3 class="regist-title">选择身份</h3>
                <div class="select-identity">
                    <div class="identity-rol select-customer">
                        <div class="identity-icon">
                            <img src="static/image/register-k.png"/>
                        </div>
                        <h4>成为客户</h4>
                        <p>发布项目并发现人才</p>
                        <router-link :to="{path: '/register/steps-2/0'}" v-if="!checked"><el-button>注册</el-button></router-link>
                        <el-button @click="upIdentitySubmit(0)" v-else>注册</el-button>
                    </div>
                    <div class="identity-rol select-customer">
                        <div class="identity-icon">
                            <img src="static/image/register-g.png"/>
                        </div>
                        <h4>成为顾问</h4>
                        <p>寻找项目并成就客户</p>
                        <router-link :to="{path: '/register/steps-2/1'}" v-if="!checked"><el-button class="customer">注册</el-button></router-link>
                        <el-button class="customer" @click="upIdentitySubmit(1)" v-else>注册</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
import { upIdentity } from '@/serverApi/registLogin'
import { setSessionStore } from '@/utils/auth'
Vue.use(Button)
export default {
    data() {
        return {
            title: '注册-1',
            checked: false
        }
    },
    created() {
        this.checked = this.$route.query.checked || false;
    },
    methods: {
        upIdentitySubmit(type) {
            let params = {
                type: type,
                phone: this.$route.query.phone
            }
            upIdentity(params).then(res => {
                if(res.code == 200) {
                    //成功后跳转路由
                    setSessionStore('userToken',res.data.pCWebLoginToken);
                    setSessionStore('userInfo',res.data.userInfo);
                    this.$store.dispatch('setUserObj',res.data);
                    this.$router.push({ name: 'steps-3', params: { type: type }});
                }else {
                    this.$message.error(response.msg)
                }
            })
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
    .regist-bg {
        margin-top: 80px;
        height: 100%;
        background-image: url('../../../../static/image/regist.png');
        background-size: cover;
        .regist-bg2 {
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
        .regist-cont {
            max-width: 940px;
            margin: 0 auto;
            padding-top: 70px;
            .regist-title {
                font-size:40px;
                color: #fff;
                font-weight: 500;
            }
            .select-identity {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: 40px;
                .identity-rol {
                    width:390px;
                    height:300px;
                    background:rgba(255,255,255,1);
                    border-radius:5px;
                    text-align: center;
                    .identity-icon {
                        width: 80px;
                        height: 80px;
                        // line-height: 70px;
                        // border:10px solid rgba(255,101,54,1);
                        // border-radius: 50%;
                        // font-size: 8px;
                        // color: #FF6536;
                        margin: 0 auto;
                        margin-top: 40px;
                        img {
                            width:100%;
                        }
                        &.customer {
                            border-color: #424AB4;
                            color: #3940A1;
                        }
                    }
                    h4 {
                        font-size: 20px;
                        color: #333333;
                        margin-top: 26px;
                        font-weight: 600;
                    }
                    p {
                        font-size: 16px;
                        color: #666666;
                        margin-top: 10px;
                    }
                    button {
                        width: 180px;
                        height: 46px;
                        border-radius: 3px;
                        border: 1px solid rgba(255,101,54,1);
                        margin-top: 24px;
                        span {
                            font-size: 18px;
                            color: #FF6536;
                        }
                        &.customer {
                            border-color: #3940A1;
                            span {
                                color: #3940A1;
                            }
                        }
                    }
                }
            }
        }
    }
</style>