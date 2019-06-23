<template>
    <div class="regist-bg">
        <div class="regist-bg2">
            <div class="regist-cont">
                <div class="form-cont">
                    <h4 class="form-title">绑定手机号</h4>
                    <!-- <p class="rich-title">成为{{$route.params.type == 1 ? '顾问':'客户'}}</p> -->
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="regist-form">
                        <el-form-item prop="phone">
                            <el-input type="tal" v-model="ruleForm.phone" autocomplete="off" placeholder="输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="verifyCode" class="item-phone-code">
                            <el-input v-model.trim="ruleForm.verifyCode" autocomplete="off" placeholder="输入验证码" :maxlength='6'></el-input>
                            <el-button @click="sendCode" :disabled="disabledBtn">{{phoneCodeText}}</el-button>
                        </el-form-item>
                        <!-- <el-form-item prop="nickName">
                            <el-input v-model.trim="ruleForm.nickName" placeholder="用户名" :maxlength='10'></el-input>
                        </el-form-item> -->
                        <el-form-item prop="type" class="item-checked">
                            <el-checkbox v-model="checked"></el-checkbox>
                            <span @click="goPlatfrom()" class="agreement">我已阅读并同意《麦盟网络服务使用协议》</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')" class="regist-btn" :disabled="!checked">注册</el-button>
                        </el-form-item>
                    </el-form>
                    <p class="go-login">已有账号？<a href="javascript:void(0);" @click="onLogin">去登录</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Form, FormItem, Button, Input, Checkbox } from 'element-ui'
import { sendPhoneCode, register, checkUser } from '@/serverApi/registLogin'
import { setSessionStore } from '@/utils/auth'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)

export default {
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
        // var checkNickName = (rele, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('用户名不能为空'))
        //     }else{
        //         // var reg = /^[\d\.,-\/]{1,9}$/
        //         var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 
        //         if(reg.test(value)){
        //             callback(new Error('用户名不能有特殊字符'))
        //         } else {
        //             callback();
        //         }
        //     }
        // }
        return {
            title: '注册-2',
            checked: false,
            ruleForm: {
                phone: '',
                verifyCode: '',
                // nickName: ''
            },
            phoneCodeText: '发送验证码',
            disabledBtn: false,
            rules: {
                phone: [
                    { validator: checkPhone },
                ],
                verifyCode: { validator: checkPhoneCode },
                // nickName: { validator: checkNickName }
            }
        }
    },
    created() {
    },
    methods: {
        // 注册表单提交请求
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.ruleForm;
                    params = Object.assign({
                        webOpenId: this.$route.query.webOpenId,
                        access_token: this.$route.query.access_token
                    },params)
                    checkUser(params).then(response => {
                        if(response.code == '200'){
                            if(response.data.userStatus == 2) {
                                this.$router.push({ name: 'steps-1', query: { checked: true, phone: params.phone}});
                            }else {
                                //成功后跳转路由
                                setSessionStore('userToken',response.data.pCWebLoginToken);
                                setSessionStore('userInfo',response.data.userInfo);
                                this.$store.dispatch('setUserObj',response.data);
                                this.$router.push({ name: 'home-content'});
                            }
                        }else {
                            this.$message.error(response.msg)
                        }
                    })
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 发送验证码请求
        sendCode() {
            // 对手机号进行校验
            this.$refs['ruleForm'].validateField('phone', (error) => {
                if(!error){
                    let params = {phone: this.ruleForm.phone}
                    sendPhoneCode(params).then(response => {
                        if(response.code == 200){
                            this.countdown()
                        }else if(response.code == '215'){
                            this.$message.error({message: response.msg, onClose: ()=>{console.log('关闭回调')}})
                        }else if(response.code == '217') {
                            this.$message.error('您获取次数超过5次，请24小时之后再试！')
                        }else if(response.code == '218'){
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
            
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
        // 弹出登录框
        onLogin() {
            this.$store.dispatch('showLoginDialog');
        },
        // 跳转到条款页面
        goPlatfrom() { 
            let routeData = this.$router.resolve({ path: '/platformTerms'});
            window.open(routeData.href, '_blank');
            // this.$router.push('/platformTerms')
        }

    },
    computed: {
    }
}
</script>

<style lang='scss'>
    .regist-bg {
        height: 100%;
        margin-top: 80px;
        background-image: url('../../../static/image/regist.png');
        background-size: cover;
        .regist-bg2 {
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
        .regist-cont {
            padding-top: 40px;
            .form-cont {
                width:460px;
                background:rgba(255,255,255,1);
                border-radius:3px;
                border:1px solid rgba(151,151,151,1);
                text-align: center;
                margin: 0 auto;
                padding: 40px 50px;
                box-sizing: border-box;
                .form-title {
                    font-size: 24px;
                    color: #333333;
                }
                .rich-title {
                    font-size: 16px;
                    color: #666666;
                    margin-top: 14px;
                }
                .regist-form {
                    margin-top: 22px;
                    .el-form-item {
                        text-align: left;
                        // margin-bottom: 10px;
                        &.item-phone-code {
                            .el-input{
                                width: 240px;
                            }
                            .el-button{
                                width:100px;
                                height:46px;
                                border-radius:3px;
                                border:1px solid rgba(255,101,54,1);
                                margin-left: 13px;
                                padding: 0;
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
                            height: 46px;
                        }
                        .regist-btn {
                            width: 100%;
                            height: 46px;
                            background: rgba(255,101,54,1);
                            border-radius: 3px;
                            span {
                                font-size: 18px;
                                color: #FBFBFB;
                            }
                        }
                    }
                    .el-checkbox__input.is-checked + .el-checkbox__label {
                        color: #FF6536;
                    }
                    .el-checkbox__input.is-checked .el-checkbox__inner {
                        background-color: #FF6536;
                        border-color: #FF6536;
                    }
                }
                .go-login {
                    font-size: 14px;
                    color: #666666; 
                    margin-top: 12px;
                    a {
                        color: #666666; 
                    }
                }
                .agreement {
                    cursor: pointer;
                }
            }
        }
    }
</style>    