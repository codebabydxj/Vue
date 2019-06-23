<template>
    <div class="account-content">
            <!-- 收款账号 -->
        <div class="recommend mt20 bt0" >
            <div class="consultant-title">收款账号</div>
            <div class="accountInfo" v-for="(item,index) in accountItem" :key='index' >
                <div class="accountEditor mt10 pr20">
                    <div class="pt20">
                        <label class="label">收款银行</label>
                        <span class="label-text">{{item.bankAccount}}</span>
                    </div>
                    <div class="work-Time pt20">
                        <span class="label colorFF6536" @click="showDlog(item)"><i class="el-icon-bianji icon"></i>编辑</span>
                        <span class="label-text colorFF6536" @click="dleAccount(item)"><i class="el-icon-delete icon"></i>删除</span>
                    </div>
                </div>
                <div class="accountEditor mt20"></div>
                <div class="pl30">
                    <label class="label">收款账号</label>
                    <span class="label-text">{{item.account}}</span>
                </div>
                <div class="mt10">
                    <el-button style="float: right; padding: 3px 0" type="text" class="accountDefault" v-if="item.type==1">默认收款账号</el-button>
                </div>
            </div>
        </div>
        <div class="add" @click="showDlog(null)">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加银行账户</span>
        </div>
        <!-- 收款账号弹框 -->
        <div class="gathering">
            <el-dialog
                title="收款账号"
                :visible.sync="dialogVisible"
                width="630px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <div class="backbor"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="收款银行" prop="bankAccount">
                        <el-input v-model="ruleForm.bankAccount" autocomplete="off" placeholder="请输入收款银行（精确到支行）"></el-input>
                    </el-form-item>
                    <el-form-item label="收款账号" prop="account">
                        <el-input v-model.number="ruleForm.account" autocomplete="off" placeholder="请输入收款账号"></el-input>
                    </el-form-item>
                    <el-form-item label="是否默认" prop="isdefault" class="btntype">
                        <el-button @click="Sure(1)" :class="{SureClass:isDefault == 1}">是</el-button>
                        <el-button @click="Sure(0)" class="mf20" :class="{SureClass:isDefault == 0}">否</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isClick">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 删除弹框 -->
        <div class="delete-dialog">
            <el-dialog
                title="提示"
                :visible.sync="deleteDialogShow"
                width="400px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <!-- <div class="backbor"></div> -->
                <div class="center">确认要删除吗？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteCancel" class="delete-cancel">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { getAdviserDetailUrl, addOrEditBankUrl, delBankUrl } from '@/serverApi/personalCenter';
import {  Button, Dialog, Input, Col,Form, FormItem, Switch  } from 'element-ui';
import { setTimeout } from 'timers';
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);

export default {
    props:['accountItem','release', 'getUpdateDisplayProperty'],
    data() {
        var validateNumber = (rule, value, callback) => {
            let numberReg = /[^0-9.]/g;
            if(!value) {
                callback(new Error('请输入收款账号'));
            }
            if(numberReg.test(value)) {
                callback(new Error('请输入数字'));
            }else {
                callback();
            }
        };
        var validateBank = (rule, value, callback) => {
            if(!value) {
                callback(new Error('请输入收款银行'));
            }else {
                callback();
            }
        };
        return {
            dialogVisible:false,
            showClos:false,
            editShow:false,
            accountData:{},
            deleteDialogShow:false,
            abid:'',
            onclickModal:false,
            isClick:false,
            ruleForm: {
                bankAccount:'',
                account:'',
                isdefault:null,
            },
            isDefault:null,
            rules:{
                bankAccount:[
                    { required: true, validator: validateBank ,trigger: 'change' }
                ],
                account:[
                    { required: true,validator: validateNumber, trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        showDlog(data) {
            this.dialogVisible = true;
            this.accountData = (data ? data : {});
            this.ruleForm =JSON.parse(JSON.stringify(this.accountData));
            if(data) {
                this.isDefault = data.type
                return;
            }
            
        },
        // 删除
        dleAccount(data) {
            this.abid = data.abid;
            this.deleteDialogShow = true;
        },
        // 删除取消确认弹框
        deleteCancel () {
            this.deleteDialogShow = false;
        },
        deleteSubmit() {
            let parmas = {abid:this.abid}
            delBankUrl(parmas).then( res => {
                if(res.code == 200) {
                    this.deleteDialogShow = false;
                    this.release();
                }
            })
        },
        // 编辑确认
        submitForm(formName) {
            // this.isClick = true;
            let accountList = this.ruleForm;
            let type = (accountList.isdefault ? 1:0);
            let abid = accountList.abid || 0;
            let parmas = {bankAccount:accountList.bankAccount,account:accountList.account,type:type}
            if(abid) {
               parmas = {bankAccount:accountList.bankAccount,account:accountList.account,type:type,abid:abid}
            }
            
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addOrEditBankUrl(parmas).then(res => {
                        if(res.code == 200) {
                            this.dialogVisible = false;
                            setTimeout( () => {
                                this.isClick = false
                            },500)
                            this.release();
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); 
            // this.$refs[formName].resetFields();
        },
        // 取消
        cancel(formName) {
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        // onEditShow() {
        //     this.editShow = true;
        // },
        // offEditShow() {
        //     this.editShow = false;
        // },
        // 是否默认
        Sure(value) {
            this.isDefault = value
            this.ruleForm.isdefault = value;
        }
    }
}
</script>

<style lang="scss">
    .account-content {
        .recommend {
            padding:0;
            border-top: 1px solid #E0E0E0;
            border-bottom: 1px solid #E0E0E0;
            padding-top: 20px;  
            padding-bottom: 20px;
            // &:hover {
            //     background:rgba(248,248,248,1);
            // }
            .consultant-title {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                margin-left: 30px;
            }
            .NameTime {
                display: flex;
                .person-Name {
                    width: 250px;
                }
                .work-Time {
                    cursor:pointer;
                    margin-left: 120px;
                    margin-right: -70px;
                }
            }
            
            .accountEditor {
                display: flex;
                justify-content: space-between;
                .colorFF6536 {
                    cursor:pointer;
                    color: #FF6536;
                }
            }
            .pt20 {
                padding-top:10px;
                padding-left:30px;
            }
            .pl30 {
                padding-left:30px;
            }
            .accountInfo {
                padding-bottom: 20px;
                border-bottom: 1px dashed #E0E0E0;
                &:last-child {
                    border-bottom: none;
                }
                .work-Time {
                    display: none;
                }
                &:hover {
                     background:rgba(248,248,248,1);
                    .work-Time {
                        display: block;

                    }
                }
            }
        }
        .add {
            cursor:pointer;
            text-align: center;
            margin-top: -20px;
            span {
                color:  #FF895F;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
            }
        }
        .bt0 {
            border-bottom: 0;
        }
        .accountDefault {
            width: 100px !important;
            height: 24px !important;
            background: #ff6536;
            border: 1px solid #FF6536;
            margin-left: 30px;
            border-radius:15px;
            margin-top: -20px !important; 
            span {
                font-size:12px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:17px;
            }
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
            padding-left: 20px;
        }
         // 弹框
        .backbor {
            height:1px;
            background:rgba(224,224,224,1);
            // margin: 20px 0;
        }
        .el-dialog__body {
            padding: 0 0 20px;
        }
        .el-dialog__header {
            text-align: left;
            .el-dialog__title {
                border-left: 2px solid #FF6536;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(64,64,64,1);
                padding-left: 5px;
            }
        }
        .el-button  {
            width: 120px;
            height: 25px;
            span {
                display: block;
                // margin-top: -6px;
            }
        }
        .bdf36 {
            border: 1px solid #FF6536;
            span {
                color: #FF6536;
            }
        }
        .el-input {
            margin-left: 5px;
        }
        .el-input__inner {
            width: 460px;
            height: 30px;
            border-radius:2px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            vertical-align: middle;
            // color:rgba(191,191,191,1);
            border:1px solid rgba(217,217,217,1);
        }
        .el-form-item {
            margin-top: 20px;
        }
        .el-form-item__error {
            left: 15px !important;
        }
        .SureClass {
            border: 1px solid #FF6536 !important;
            background: #fff;
            span {
                color: #FF6536 !important;
            }
        }
        .btntype {
            margin-top: 0px;
            .el-button {
                width: 120px;
                height: 30px;
                margin-left: 15px;
                border-radius:2px;
                border:1px solid #D9D9D9;
                background: #fff;
                line-height: 1;
               span {
                   color: #999999;
               }
            }
            .mf20 {
                margin-left: -20px;
            }
            
        }
        .el-dialog__footer {
            margin-top: -20px;
        }
        .el-switch {
            padding-top: 10px;
        }
        .icon {
            padding-right: 5px;
        }
        .delete-dialog {
            .el-dialog {
                margin-top: 30vh !important;
            }
            .el-dialog__header {
                text-align: center ;
                .el-dialog__title {
                    border-left: none;
                }
            }
            .center {
                text-align: center;
                font-size: 16px;
                line-height: 30px;
                margin: 0 0 20px;
            }
            .dialog-footer {
                display: flex;
                // padding: 0 90px;
                justify-content: center;
                .el-button {
                    width: 80px;
                    height: 25px;
                    padding: 0;
                    line-height: 25px;  
                }
                .delete-cancel {
                    border: 1px solid #FF6536;
                    background: #fff;
                    span {
                        color: #FF6536;
                    }
                }
            }
            .el-dialog__body {
                 padding:0 !important;
            }  
            .icon {
                padding-right: 5px;
            }
        }
    }
</style>