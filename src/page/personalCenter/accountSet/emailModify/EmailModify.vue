<template>
    <div class="account-cont">
        <div class="account-title">
            <DTitle :name="title" :fontSize="18"/>
        </div>
        <div class="email-account-box">
            <div class="phone-step1" v-if="acitveStep == 1">
                <p class='phone-text' v-if="email">
                    <span class="label">当前邮箱账号</span><span>{{email}}</span>
                </p>
                <div class="input-phoneCode-text mt20">
                    <span class="label">{{(email?'新':'') + '邮箱地址'}}</span>
                    <el-input type="text" v-model.trim="fEmail" :placeholder="'请输入' +(email?'新':'') + '邮箱地址'" @change="oldVerifyCodeChange"></el-input>
                    <!-- <el-button @click="sendCode(oldPhone,'old')" :disabled="disabledBtn" type="primary">{{phoneCodeText}}</el-button> -->
                    <p class="err-tip" v-if="errTipText">{{errTipText}}</p>
                </div>
            </div>
            <div class="phone-step2" v-if="acitveStep == 2">
                <img src="static/image/email-img.png" width="98" height="70"/>
                <p>你的邮箱已经绑定成功，请前往邮箱认证。</p>
            </div>
            <div class="foot-phone-btn">
                <el-button type="primary" class="solid" @click="nextStep" v-if="acitveStep == 1">下一步</el-button>
                <router-link :to="{ path: '/home'}"><el-button type="primary" class="solid" @click="sendSubmit('ruleFormRef')" v-if="acitveStep == 2">返回首页</el-button></router-link>
                <router-link :to="{ path: '/personalCenter/accountSet' }"><el-button class="border let2 mr60" v-if="acitveStep == 1">取消</el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import DTitle from '@/components/DTitle'
import { sendPhoneCode } from '@/serverApi/registLogin'
import { checkCode, changePhone, sendMail } from '@/serverApi/personalCenter'
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
            title: '修改邮箱',
            userInfoData: {},
            uphoneStr: '',
            fEmail: '',
            phoneCodeText: '发送验证码',
            disabledBtn: false,
            acitveStep: 1,
            email: '',
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
        this.email = this.$route.query.email;
    },
    methods: {
        oldVerifyCodeChange(value) {
            if (!value) {
                this.errTipText = '邮箱地址不能为空!'
            }else{
                let reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
                if(reg.test(value) == false){
                    this.errTipText = '请填写正确的邮箱格式'
                } else {
                    this.errTipText = ''
                }
            }
        },
        // 修改手机号下一步请求
        stepCheckCode() {
            let params = {mail: this.fEmail}
            sendMail(params).then(response => {
                if (response.code == 200) {
                   this.acitveStep = 2;
                }else if(response.code == 209){
                    this.$message.error('此邮箱已存在！')
                } else {
                    this.$message.error('操作错误：'+response.msg)
                }
            })
        },
        // 下一步触发 sendMail
        nextStep() {
            let value =this.fEmail;
            this.isFouces = true;
            if (!value) {
                this.errTipText = '邮箱地址不能为空!'
            }else{
                let reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
                if(reg.test(value) == false){
                    this.errTipText = '请填写正确的邮箱格式'
                } else {
                    this.errTipText = ''
                    // this.acitveStep = 2;
                    this.stepCheckCode()
                }
            }
        },
        // 修改手机号提交
        // sendSubmit(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             let params = {
        //                 newphone: this.ruleForm.phone,
        //                 code: this.ruleForm.verifyCode
        //             };
        //             this.isDisabled = true;
        //             changePhone(params).then(response => {
        //                 this.isDisabled = false;
        //                 if(response.code == 200) {
        //                     MessageAlert({title:'手机号修改成功',content:'已成功修改绑定手机号',okText:'确定'}).then(res => {
        //                         this.$router.push({path:'/personalCenter/accountSet'})
        //                     }).catch(text => {
        //                         this.$router.push({path:'/personalCenter/accountSet'})
        //                     })
        //                 } else if(response.code == 204) {
        //                     this.$message.error('手机号已存在！')
        //                 } else {
        //                     this.$message.error('网络异常：'+response.msg)
        //                 }
        //             })
                    
        //         } else {
        //             return false;
        //         }
        //     });
        // },
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
    .email-account-box {
        padding: 20px 30px;
        .phone-step1 {
            text-align: left;
            .phone-text {
                line-height: 22px;
                span {
                    font-size: 14px;
                    color: #666666;
                    margin-right: 20px;
                    &.label {
                        width: 84px;
                        color: #000000;
                    }
                }
            }
            .input-phoneCode-text {
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
                .label {
                    width: 84px;
                    font-size: 14px;
                    color: #404040;
                    line-height: 20px;
                    margin-right: 20px;
                }
                .el-input {
                    width: 460px;
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
                    left: 105px;
                    font-size: 12px;
                    color: #f56c6c;
                }
            }
        }
        .phone-step2 {
            p {
                margin-top: 24px;
                line-height: 22px;
                font-size: 16px;
                color: #FF895F;
                margin-left: 20px;
            }
        }
        .foot-phone-btn {
            margin: 40px 0;
            margin-left: 12px;
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
        .el-input__inner {
            height: 32px !important;
            border-radius: 2px;
            line-height: 1 !important;
        }
    }
}
</style>