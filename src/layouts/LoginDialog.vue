<template>
    <!-- 登录弹出框 -->
    <el-dialog
        class="madol-dialog"
        :visible.sync="loginDialogVisible"
        width="386px"
        @close="closeDialog"
        center
        :close-on-click-modal="onclickModal"
    >
        <div class="madol-cont" v-if="!isLogin">
            <h4 class="cont-title">欢迎登录麦盟咨询</h4>
            <p class="rich-title mt15">社交账号快捷登录</p>
            <a href="javascript:void(0);" @click="wechatLoginClick"><img class="weix mt50" src="static/image/weix.png"></a>
            <div class="line mt25"></div>
            <el-button class="mt30" icon="el-icon-mobile-phone" @click="onPhoneLogin">手机登录</el-button>
            <p class="go-regist mt10" @click="$store.dispatch('hideLoginDialog');"><router-link :to="{path: '/register'}">前往注册</router-link></p>
        </div>
        <div class="madol-cont" v-else>
            <h4 class="cont-title">欢迎登录麦盟咨询</h4>
            <p class="rich-title mt15">社交账号快捷登录</p>
            <a href="javascript:void(0);"><img class="weix mt25" src="static/image/weix.png"></a>
            <div class="line mt25"></div>
            <el-form :model="ruleForm" status-icon ref="ruleFormRef" :rules="rules" class="regist-form mt20">
                <el-form-item prop="phone">
                    <el-input type="tal" v-model.trim="ruleForm.phone" autocomplete="off" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode" class="item-phone-code">
                    <el-input type="text" v-model.trim="ruleForm.verifyCode" autocomplete="off" placeholder="输入验证码"></el-input>
                    <el-button @click="sendCode" :disabled="disabledBtn">{{phoneCodeText}}</el-button>
                </el-form-item>
                <el-form-item class="login-form-item">
                    <el-button type="primary" @click="submitForm('ruleFormRef')" class="login-btn" :disabled="isDisabled">登录</el-button>
                </el-form-item>
            </el-form>
            <p class="go-regist" @click="$store.dispatch('hideLoginDialog')"><router-link :to="{path: '/register'}">前往注册</router-link></p>
        </div>
    </el-dialog>
    <!-- /登录弹出框 -->
</template>

<script>
import Vue from 'vue'
import { Container, Dialog, Form, FormItem, Input, Button, Message } from 'element-ui'
import { sendPhoneCode, verifyCodeLogin, wechatLogin } from '@/serverApi/registLogin'
import { setSessionStore } from '@/utils/auth'
Vue.use(Container)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message;

export default {
    name: 'Layout',
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        };
        var checkPhoneCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空'))
            }else{
                var reg = /^[0-9]{6}$/
                if(!reg.test(value)){
                    callback(new Error('请输入6位数字的值'))
                } else {
                    callback();
                }
            }
        };
        return {
            name: '首页内容',
            onclickModal:false,
            ruleForm: {
                phone: '',
                verifyCode: '',
            },
            isLogin: false,
            phoneCodeText: '发送验证码',
            disabledBtn: false,
            isDisabled: false,
            rules: {
                phone: [
                    { validator: checkPhone },
                ],
                verifyCode: { validator: checkPhoneCode },
            }
        }
    },
    created() {
        
    },
    methods: {
        // 手机号登录提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {

                if (valid) {
                    let params = {
                        phone: this.ruleForm.phone,
                        verifyCode: this.ruleForm.verifyCode
                    };
                    this.isDisabled = true;
                    verifyCodeLogin(params).then(response => {
                        this.isDisabled = false;
                        if(response.code == 200){
                            //成功后跳转路由
                            setSessionStore('userToken',response.data.pCWebLoginToken);
                            setSessionStore('userInfo',response.data.userInfo);
                            this.$store.dispatch('setUserObj',response.data)
                            this.$store.dispatch('hideLoginDialog')
                            let redirect = this.$route.query.redirect
                            // TODO 判断身份是否可以到此页面
                            if(redirect){
                                this.$router.push({path: redirect});
                            }else {
                                this.$router.push({path: '/home'});
                            }
                            this.$refs[formName].resetFields();
                        }else if(response.code == '220'){
                            this.$message.error('输入的验证码不正确！')
                        }else if(response.code == '205') {
                            this.$message.error('输入的验证码失效！')
                        }else if(response.code == '203'){
                            this.$message.error('账号不存在，请前往注册！')
                        }else if(response.code == '210'){
                            this.$message.error('账号异常，请联系麦盟管理员')
                        }else if(response.code == '219'){
                            this.$message.error(response.msg)
                        }
                    })
                    
                } else {
                    return false;
                }
            });
        },
        // 发送验证码请求
        sendCode() {
            // 对手机号进行校验
            this.$refs['ruleFormRef'].validateField('phone', (error) => {
                if(!error){
                    let params = {phone: this.ruleForm.phone}
                    sendPhoneCode(params).then(response => {
                        if(response.code == 200){
                            this.countdown()
                        }else if(response.code == '215'){
                            this.$message.error({message: response.msg, onClose: ()=>{console.log('关闭回调')}})
                        }else if(response.code == '217') {
                            this.$message.error('您获取次数超过8次，请24小时之后再试！')
                        }else if(response.code == '218'){
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
            
        },
        // 扫码登录操作
        wechatLoginClick() {
            
            wechatLogin({opStr: 'REDIRECT_URL'}).then(res =>{
                if(res.code == 200){
                    window.location.href = res.data
                }
            })
        },
        /*倒计时*/
        countdown() {
            this.disabledBtn = true;
            let count = 60;
            let setTimeInter = setInterval(() => {
                this.phoneCodeText = '重新获取:' + count--;
                if (count < 1) {
                    clearInterval(setTimeInter);
                    this.disabledBtn = false;
                    this.phoneCodeText = '发送验证码';
                }
            }, 1000);
            this.phoneCodeText = '发送验证码';
        },
        // 切换手机登录
        onPhoneLogin() {
            this.isLogin = true;
        },
        // 关闭时回调
        closeDialog() {
            this.isLogin && this.$refs['ruleFormRef'].resetFields()
            this.$store.dispatch('hideLoginDialog')
            this.isLogin = false
            this.isDisabled = false
        }
    },
    watch: {
        
    },
    computed: {
        loginDialogVisible: {
            get: function () {
                return this.$store.state.login.loginDialogVisible
            },
            set: function () {
            }
        }
       
    }
}
</script>

<style lang='scss'>
// 登录弹出框样式
.madol-dialog {
    .el-dialog__headerbtn .el-dialog__close {
        font-size: 20px;
        color: #000000;
        font-weight: 600;
    }
}
.madol-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    .cont-title {
        font-size: 24px;
        color: #333333;
    }
    .rich-title {
        font-size: 16px;
        color: #666666;
    }
    .weix {
        width: 44px;
        height: 44px;
    }
    .line {
        width: 270px;
        height: 1px;
        background: rgba(224,224,224,1);
    }
    .el-button {
        width: 270px;
        height: 40px;
        border-radius: 3px;
        border-color:rgba(255,101,54,1);
        span,i{
            font-size: 14px;
            color: #FF6536;
        } 
    }

    .regist-form {
        width: 270px;
        .el-form-item {
            text-align: left;
            margin-bottom: 20px;
            &.login-form-item {
                margin-bottom: 10px;
            }
            &.item-phone-code {
                .el-input{
                    width: 126px;
                }
                .el-button{
                    width: 126px;
                    height: 40px;
                    border-radius: 3px;
                    border: 1px solid rgba(255,101,54,1);
                    margin-left: 13px;
                    span {
                        color: #FF6536;
                    }
                }
            }
            &.item-checked {
                .el-form-item__content {
                    line-height: 26px;
                }
                margin-bottom: 16px;
            }
            input {
                height: 40px;
            }
            .login-btn {
                width: 100%;
                height: 40px;
                background: rgba(255,101,54,1);
                border-radius: 3px;
                span {
                    font-size: 14px;
                    color: #FBFBFB;
                }
            }
        }
    }
    
    .go-regist {
        width: 270px;
        text-align: left;
        a {
            font-size: 14px;
            color: #FF895F;
        }
    }

    .mt10 {
        margin-top: 10px;
    }
    .mt15 {
        margin-top: 15px
    }
    .mt20 {
        margin-top: 20px;
    }
    .mt25 {
        margin-top: 25px;
    }
    .mt30 {
        margin-top: 30px;
    }
    .mt50 {
        margin-top: 50px;
    }
}

</style>
