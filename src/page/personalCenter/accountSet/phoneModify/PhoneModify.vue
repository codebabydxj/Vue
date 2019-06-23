<template>
    <div class="account-cont">
        <div class="account-title">
            <DTitle :name="title" :fontSize="18"/>
        </div>
        <div class="phone-account-box">
            <div class="phone-step1" v-if="acitveStep == 1">
                <p class='phone-text'>
                    <span>当前手机号码</span>
                    <span>{{oldPhone}}</span>
                </p>
                <div class="input-phoneCode-text mt20">
                    <span class="span">验证码</span>
                    <el-input type="text" v-model.trim="oldVerifyCode" placeholder="输入验证码" @change="oldVerifyCodeChange"></el-input>
                    <el-button @click="sendCode(oldPhone,'old')" :disabled="disabledBtn" type="primary">{{phoneCodeText}}</el-button>
                    <p class="err-tip" v-if="errTipText">{{errTipText}}</p>
                </div>
            </div>
            <div class="phone-step2" v-if="acitveStep == 2">
                <el-form :model="ruleForm" status-icon ref="ruleFormRef" :rules="rules" class="regist-form mt20" label-width="90px" label-position="left">
                    <el-form-item prop="phone" label="新手机号码">
                        <el-input type="tal" v-model.trim="ruleForm.phone" autocomplete="off" placeholder="请输入新手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifyCode" class="item-phone-code" label="验证码">
                        <el-input type="text" v-model.trim="ruleForm.verifyCode" autocomplete="off" placeholder="输入验证码"></el-input>
                        <el-button type="primary" @click="sendCode(ruleForm.phone, 'new')" :disabled="disabledBtn">{{phoneCodeText}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foot-phone-btn">
                <el-button type="primary" class="solid" @click="nextStep" v-if="acitveStep == 1">下一步</el-button>
                <el-button type="primary" class="solid let2" @click="sendSubmit('ruleFormRef')" v-if="acitveStep == 2">确定</el-button>
                <router-link :to="{ path: '/personalCenter/accountSet' }"><el-button class="border let2 mr60">取消</el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import DTitle from '@/components/DTitle'
import { sendPhoneCode } from '@/serverApi/registLogin'
import { checkCode, changePhone } from '@/serverApi/personalCenter'
import { MessageAlert } from '@/importElement/messageBox'

export default {
    components: {
        DTitle
    },
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
            title: '修改手机号',
            userInfoData: {},
            uphoneStr: '',
            oldVerifyCode: '',
            phoneCodeText: '发送验证码',
            disabledBtn: false,
            acitveStep: 1,
            oldPhone: '',
            isFouces: false,
            errTipText: '',
            ruleForm: {
                phone: '',
                verifyCode: '',
            },
            rules: {
                phone: [
                    { validator: checkPhone },
                ],
                verifyCode: { validator: checkPhoneCode },
            }
        }
    },
    created() {
        this.oldPhone = this.$route.query.phone;
    },
    methods: {
        // 点击发送验证码操作
        sendCode(phoneText, type) {
            // 对手机号进行校验
            if(type == 'new') {
                this.$refs['ruleFormRef'].validateField('phone', (error) => {
                    if(!error){
                        this.sendVerifyCodeSubmit(phoneText)
                    } else {
                        return false;
                    }
                });
            }else {
                if(!phoneText) return;
                this.sendVerifyCodeSubmit(phoneText)
            }
        },
        // 发送验证码请求
        sendVerifyCodeSubmit(phoneText) {
            let params = {phone: phoneText}
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
        },
        oldVerifyCodeChange(value) {
            if (!value) {
                this.errTipText = '验证码不能为空!'
            }else{
                var reg = /^[0-9]{6}$/
                if(!reg.test(value)){
                    this.errTipText = '请输入6位数字的值'
                } else {
                    this.errTipText = ''
                }
            }
        },
        // 修改手机号下一步请求
        stepCheckCode() {
            let params = {oldPhone: this.oldPhone, code: this.oldVerifyCode}
            checkCode(params).then(response => {
                if(response.code == 200) {
                    this.acitveStep = 2;
                } else if (response.code == 205) {
                    this.$message.error('验证码不正确！')
                } else {
                    this.$message.error('网络异常！')
                }
            })
        },
        // 下一步触发 oldPhone/code
        nextStep() {
            let value =this.oldVerifyCode;
            this.isFouces = true;
            if (!value) {
                this.errTipText = '验证码不能为空!'
            }else{
                var reg = /^[0-9]{6}$/
                if(!reg.test(value)){
                    this.errTipText = '请输入6位数字的值'
                } else {
                    this.errTipText = ''
                    // this.acitveStep = 2;
                    this.stepCheckCode()
                }
            }
        },
        // 修改手机号提交
        sendSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        newPhone: this.ruleForm.phone,
                        verifyCode: this.ruleForm.verifyCode
                    };
                    this.isDisabled = true;
                    changePhone(params).then(response => {
                        this.isDisabled = false;
                        if(response.code == 200) {
                            MessageAlert({title:'手机号修改成功',content:'已成功修改绑定手机号',okText:'确定',textAlign:'center'}).then(res => {
                                this.$router.push({path:'/personalCenter/accountSet'})
                            }).catch(text => {
                                this.$router.push({path:'/personalCenter/accountSet'})
                            })
                        } else if(response.code == 204) {
                            this.$message.error('手机号已存在！')
                        } else {
                            this.$message.error('网络异常：'+response.msg)
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
    },
    computed: {
    }
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
    .phone-account-box {
        padding: 20px 30px;
        .phone-step1 {
            text-align: left;
            .phone-text {
                line-height: 22px;
                span {
                    font-size: 14px;
                    color: #999999;
                    margin-right: 20px;
                }
            }
            .input-phoneCode-text {
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
                .span {
                    font-size: 14px;
                    color: #404040;
                    line-height: 20px;
                    margin-right: 20px;
                }
                .el-input {
                    width: 200px;
                    height: 30px;
                    margin-right: 20px;
                    input {
                        height: 100%;
                    }
                }
                .el-button {
                    width: 96px;
                    height: 24px;
                    border-radius: 3px;
                    padding: 0;
                    font-size: 12px;
                }
                .err-tip {
                    position: absolute;
                    top: 34px;
                    left: 62px;
                    font-size: 12px;
                    color: #f56c6c;
                }
            }
        }
        .phone-step2 {
            .el-form {
                .el-form-item {
                    text-align: left;
                    margin-bottom: 14px;
                    .el-form-item__error {
                        padding-top: 0;
                    }
                }
                .el-input {
                    width: 200px;
                    height: 30px;
                    // line-height: 30px;
                    margin-right: 20px;
                    input {
                        height: 100%;
                    }
                }
                .el-button {
                    width: 96px;
                    height: 24px;
                    border-radius: 3px;
                    padding: 0;
                    font-size: 12px;
                }
            }
        }
        .foot-phone-btn {
            margin: 40px 0;
            .el-button {
                width: 120px;
                height: 32px;
                border-radius: 4px;
                padding: 0;
                &.border {
                    border: 1px solid #FF6536;
                    margin-left: 55px;
                    span {
                        color: #FF6536;
                    }
                }
                &.let2 {
                    letter-spacing: 2px;
                }
            }
        }
    }
}
</style>