<template>
    <div class="account-cont">
        <div class="account-title">
            <DTitle :name="title" :fontSize="18"/>
        </div>
        <div class="account-box">
            <div class="account-box-list">
                <div class="account-list-left">
                    <img src="static/image/call.png"/>
                    <span>修改手机号</span>
                </div>
                <div class="account-list-right">
                    <span>{{uphoneStr}}</span>
                    <router-link :to="{path: '/personalCenter/accountSet/phoneModify?phone='+userInfoData.uphone}">
                        <!-- <a href="javascript:void(0);">修改</a> -->
                        修改
                    </router-link>
                </div>
            </div>
            <div class="account-box-list">
                <div class="account-list-left">
                    <img src="static/image/email.png"/>
                    <span>修改邮箱</span>
                </div>
                <div class="account-list-right">
                    <span>{{userInfoData.email || '未绑定'}}</span>
                    <router-link v-if="!userInfoData.email || userInfoData.emailStatus == 0" :to="{path: '/personalCenter/accountSet/emailModify'}">绑定</router-link>
                    <router-link v-if="userInfoData.email && userInfoData.emailStatus == 1" :to="{path: '/personalCenter/accountSet/emailModify?email='+userInfoData.email}">未认证</router-link>
                    <router-link v-if="userInfoData.email && userInfoData.emailStatus == 2" :to="{path: '/personalCenter/accountSet/emailModify?email='+userInfoData.email}">修改</router-link>
                    <!-- <a href="javascript:void(0);" v-if="!userInfoData.email || userInfoData.emailStatus == 0">绑定</a>
                    <a href="javascript:void(0);" v-if="userInfoData.email && userInfoData.emailStatus == 1">未认证</a>
                    <a href="javascript:void(0);" v-if="userInfoData.email && userInfoData.emailStatus == 2">修改</a> -->
                </div>
            </div>
            <div class="account-box-list">
                <div class="account-list-left">
                    <img src="static/image/weixin-3.png"/>
                    <span>绑定微信</span>
                </div>
                <div class="account-list-right">
                    <span>{{userInfoData.wxName}}</span>
                    <a href="javascript:void(0);" v-if="userInfoData.wxName">已绑定</a>
                    <a href="javascript:void(0);" v-else @click="wechatLoginClick">绑定</a>
                    <!-- <a href="javascript:void(0);">{{userInfoData.wxName ? '已绑定' : '未绑定'}}</a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DTitle from '@/components/DTitle'
import { getUserByTokenUrl } from '@/serverApi/personalCenter'
import { wechatLogin, userBindWechat } from '@/serverApi/registLogin'
import { MessageAlert } from '@/importElement/messageBox'
import { setSessionStore } from '@/utils/auth'
export default {
    components: {
        DTitle
    },
    data() {
        return {
            title: '账号管理',
            userInfoData: {},
            uphoneStr: ''
        }
    },
    created() {
        let {checkOp,checkUn,checkTon} = this.$route.query
        checkOp && checkUn && this.userBindWechatSubmit(checkOp, checkUn, checkTon)
        if(checkOp && checkUn) {
            this.userBindWechatSubmit(checkOp, checkUn)
        }else {
            this.getUserByTokenUrlData()
        }
        
    },
    methods: {
        // 个人信息数据请求
        getUserByTokenUrlData() {
            getUserByTokenUrl().then(response => {
                if(response.code == 200){
                    this.userInfoData = response.data ? response.data : {}
                    this.uphoneStr = this.userInfoData.uphone ? this.userInfoData.uphone.substring(0,3)+'****'+this.userInfoData.uphone.substring(7): ''
                    this.$store.dispatch('setUserObj',{userInfo: this.userInfoData, pCWebLoginToken: this.token})
                    setSessionStore('userInfo', this.userInfoData);
                }
            })
        },
        // 扫码登录操作
        wechatLoginClick() {
            wechatLogin({opStr: 'BINDWECHAT_URL'}).then(res =>{
                if(res.code == 200){
                    window.location.href = res.data
                }
            })
        },
        // 扫码后进行身份校验请求
        userBindWechatSubmit(checkOp,checkUn,checkTon) {
            let params = {
                checkOp,checkUn,checkTon
            }
            userBindWechat(params).then(res => {
                let mesStr = ''
                if(res.code == 200) {
                    mesStr = '恭喜您，微信绑定成功！'
                }else if(res.code == 232) {
                    mesStr = '绑定失败，该用户已经绑定了其他微信账号'
                }else if(res.code == 233) {
                    mesStr = '绑定失败，该微信已经绑定了其他用户'
                }
                MessageAlert({
                    title: '微信绑定提示',
                    content: mesStr,
                    okText: '确定',
                    textAlign: 'center'
                }).then(() => {
                    let urlStr = window.location.href;
                    this.getUserByTokenUrlData()
                    urlStr = urlStr.substring(0, urlStr.indexOf('?'))
                    window.location.href = urlStr
                })
            })
        }
    },
    computed: {
        ...mapGetters(['token', 'userObj'])
    },
}
</script>

<style lang='scss'>
.account-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .account-title {
        padding: 20px 30px;
        padding-bottom: 4px;
    }
    .account-box {
        padding: 20px 30px;
        .account-box-list {
            padding: 20px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E0E0E0;
            &:last-child {
                border-bottom: none;
            }
            .account-list-left {
                display: flex;
                align-items: center;
                span {
                    font-size: 16px;
                    color: #404040;
                    margin-left: 10px;
                }
                img {
                    width: 22px;
                    height: 22px;
                }
            }
            .account-list-right {
                font-size: 16px;
                span {
                    color: #666666;
                }
                a {
                    width: 48px;
                    display: inline-block;
                    text-align: left;
                    color: #FF6536;
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>