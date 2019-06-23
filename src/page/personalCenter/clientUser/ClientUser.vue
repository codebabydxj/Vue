<template>
    <div class="client-box">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div class="clientContent">
                <div class="clientInfo-content">
                     <div slot="header" class="header" >
                        <div class="consultant-title">基本信息</div>
                        <div class="edit">
                            <span class="label colorFF6536" @click="clientEdut(userInfo)"><i class="el-icon-bianji icon"></i>编辑</span>
                        </div>
                    </div>
                    <div class="consultant-content">
                        <div class="consultant-Info">
                            <div class="NameTime">
                                <div class="person-Name mb20">
                                    <span class="label ">用户名</span>
                                    <span class="label-text">{{userInfo.nickName}}</span>
                                    <span v-if="userInfo.gender == 1" class="blue "><i class="el-icon-male icon-blue"></i></span>
                                    <span v-if="userInfo.gender == 2" class="origin"><i class="el-icon-woman icon-origin"></i></span>
                                    <span v-if="userInfo.gender == 0"><i class="el-icon-Privacy ml5"></i></span>
                                </div>
                                <div class="work-Time">
                                    <span class="label w70">账户状态</span>
                                    <span class="label-text" v-if= "userInfo.status == 4">已审核</span>
                                    <span class="label-text" v-if= "userInfo.status == 0">未审核</span>
                                </div>
                            </div>
                            <div class="NameTime mb20">
                                <div class="person-Name">
                                    <span class="label">手机号</span>
                                    <span class="label-text">{{userInfo.uphone}}</span>
                                </div>
                                <div class="work-Time">
                                    <span class="label w70">邮箱号</span>
                                    <span class="label-text ">{{userInfo.email}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <!-- 基本资料编辑弹框 -->
                <div class="addPlayInfo-dialog">
                        <el-dialog
                        title="基本资料"
                        :visible.sync="clienuserInfoDlog"
                        width="630px"
                        center
                        :show-close="showClos"
                        :close-on-click-modal="onclickModal"
                        >
                        <div class="backbor mb15"></div>
                        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="用户名" prop="nickName" class="companyName">
                                <el-input v-model="ruleForm.nickName" autocomplete="off" placeholder="请输入用户名" class="w200"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="ruleForm.gender">
                                    <el-radio-button label="1" >男</el-radio-button>
                                    <el-radio-button label="2" class="mf20 origin">女</el-radio-button>
                                    <el-radio-button label="0" class="mf20">保密</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="手机号" prop="uphone">
                                <el-input v-model.number="ruleForm.uphone" :disabled="true" autocomplete="off" placeholder="请输入手机号" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱号" prop="email" >
                                <el-input v-model="ruleForm.email" :disabled="true" autocomplete="off" placeholder="请输入邮箱号" class="company-input"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancel()" class="bdf37">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm') " class="bdf36">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <!-- 推荐人资料 -->
                <clientRecommender></clientRecommender>
                <!-- 公司信息 -->
                <div class="company-border">
                    <companyInformation ></companyInformation>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import companyInformation from './commons/companyInformation';
import clientRecommender from './commons/clientRecommender';
import { mapGetters } from 'vuex';
import { editUserUrl,editPCUserInfoUrl,getUserByTokenUrl } from '@/serverApi/personalCenter';
import {  Card, Button, Icon, RadioGroup, Form, FormItem, RadioButton  } from 'element-ui';
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioButton);

export default {
    data() {
        var validatePhone = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
            if (!regPhone.test(value)) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        var validateNickName = (rule, value, callback) =>{
            let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if(regEn.test(value) || regCn.test(value)) {
                callback(new Error('用户名不能带有特殊字符'));
            }else {
                callback();
            }
        };
        return {
            editShow:false,
            clienuserInfoDlog:false,
            showClos:false,
            userInfo:{},
            onclickModal:false,
            emailDialogShow:false,
            ruleForm:{
                nickName:'',
                gender:'',
                uphone:'',
                email:''
            },
            rules:{
            //    email:[
            //        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            //    ],
            //    uphone:[
            //        { validator: validatePhone,trigger: 'change'} 
            //    ],
            //    nickName:[
            //         { validator: validateNickName, trigger: 'change' }
            //    ],
            }
        }
    },
    components:{
        companyInformation,
        clientRecommender
    },
    created() {
        this.getUserByTokenData();
    },
    computed:{
        ...mapGetters(['token', 'userObj'])
    },
    methods:{
        // 获取用户信息
        getUserByTokenData() {
            getUserByTokenUrl().then(res => {
                if(res.code == 200) {
                    this.userInfo = res.data;
                    this.$store.dispatch('setUserObj',{userInfo: res.data, pCWebLoginToken: this.token})
                }
            })
        },
        //个人资料编辑
        clientEdut(data) {
            let clientEdutData = (data ? data : {});
            this.ruleForm = JSON.parse(JSON.stringify(clientEdutData));
            this.clienuserInfoDlog = true;
        },
        // 弹框确认取消
        submitForm(formName) {
            let parmas = {nickName:this.ruleForm.nickName,gender:this.ruleForm.gender,
            userPhone:this.ruleForm.uphone,email:this.ruleForm.email}
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    editPCUserInfoUrl(parmas).then(res => {
                        if(res.code == 200 ) {
                            this.clienuserInfoDlog = false;
                            this.getUserByTokenData();
                            if(!this.userInfo.email) {
                                this.emailDialogShow = true;
                            }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        cancel() {
            this.clienuserInfoDlog = false;
        }
    }
}
</script>

<style lang="scss">
    .client-box {
        .box-card {
            text-align: left;
            margin-bottom: 90px;
            .clientContent {
                .clientInfo-content {
                    padding-top: 20px;
                    .edit {
                        display: none;
                    }
                    &:hover {
                        .consultant-content {
                            background:rgba(248,248,248,1);
                        }
                        .edit {
                            display: block;
                        } 
                    }
                }
            }
            .consultant-content {
                .consultant-Info {
                    padding:20px 30px;
                    border-bottom: 1px solid #D9D9D9;
                    .NameTime {
                        display: flex;
                    }
                    .work-Time {
                        margin-left: 120px;
                        margin-right: -70px;
                    }
                    .person-Name {
                        width: 250px;
                        .blue {
                            color: #409EFF !important;
                            font-size: 14px;
                        }
                        .origin {
                            color: #FF6536 !important;
                            font-size: 14px;
                        }
                    }
                    
                }
                
                .company-border {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(224,224,224,1);
                }
            }
        }
        .consultant-title {
            height:15px;
            font-size:18px;
            font-family:PingFangSC-Medium;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:15px;
            border-left: 3px solid #FF6536;
            padding-left: 8px;
        }
        .mt20 {
            margin-top: 20px;
        }
        .pl20 {
            padding-left: 20px;
        }
        .ml5 {
            margin-left: 5px;
        }
        .mb20 {
            margin-bottom: 20px;
        }
        .label {
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            width: 57px;
            display: inline-block;
        }
        .label-text {
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            // padding-left: 20px;
        }
        .el-card__header {
            border-bottom: none;
        }
        .header {
            // padding: 20px 0 20px 30px;
            height: 20px;
            padding-left: 30px;
            display: flex;
            justify-content: space-between;
            .colorFF6536 {
                cursor:pointer;
                color: #FF6536;
                padding-right: 20px;
            }
        }
        .el-card__body {
            padding: 20px 20px 20px;
        }
        .w70 {
            width: 70px;
        }
         .el-form {
            margin-top: 20px;
            margin-right: 60px;
        }
        .el-input__inner {
            height: 30px;
            border-radius: 2px;
            border:1px solid rgba(217,217,217,1);
            line-height: 1;
        }
        .el-textarea__inner {
            height: 100px;
        }
        .el-col-2 {
            text-align: center;
        }
        .el-dialog__body {
            padding:0;
        }
        // .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        //     margin-right: -62px;
        //     color: #333333;
        // }
        .el-date-editor .el-icon-circle-close {
            color: #D9D9D9
        }
        .addPlayInfo-dialog {
             .el-dialog__header {
                text-align: left;
                .el-dialog__title {
                    border-left: 2px solid #FF6536;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(64,64,64,1);
                    padding-left: 5px;
                    display: inline-block;
                    height: 15px;
                    line-height: 15px;
                }
            }
            
            .backbor {
                height:1px;
                background:rgba(224,224,224,1);
            }
            .el-button  {
                width:120px;
                height:32px;;
                border-radius:4px;
                background: #fff;
                margin-bottom: 40px;
                line-height: 0;
                // span {
                //     display: block;
                //     font-size:14px;
                //     font-family:PingFangSC-Medium;
                //     font-weight:500;
                //     letter-spacing:2px;
                //     margin-top: -4px;
                // }
            }
            .bdf37 {
                border: 1px solid #FF6536;
                span {
                    color: #FF6536;
                }
            }
            .bdf36 {
                background: #ff6536;
                border: 1px solid #FF6536;
                margin-left: 30px;
            }
            .el-dialog__body {
                padding: 0px 0px 0px;
            }
            // .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right: -62px;
            //     color: #333333;
            // }
            // .companyName.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right: -76px;
            //     color: #333333;
            // }
            .el-form {
                margin-top: 20px;
                margin-right: 60px;
            }
            .el-input__inner {
                height: 30px;
                vertical-align: middle;
            }
            .el-dialog__body {
                padding:0;
            }
            .el-radio-button {
                width: 120px;
                height: 30px;
            }
            .el-radio-button__inner {
                width: 120px;
                height: 30px;
                line-height: 6px;
                border-radius: 2px;
            }
            .mf20 {
                margin-left: 20px;
                border-left: 1px solid #dcdfe6;
            }
            
            .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                // border-left: 1px solid #fff;
                border-left: none;
            }
            .w200 {
                width: 200px;
            }
            .icon {
                padding-right: 5px;
            }
        }
    }
</style>
