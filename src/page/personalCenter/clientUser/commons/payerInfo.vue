<template>
    <div class="playInfo-content">
        <div class="header">
            <div class="consultant-title">付款人信息</div>
        </div>
        <div class="consultant-content" v-for="(paymentListItem,index) in paymentListData" :key="index">
            <div class="dashed-bottom">
                 <div class="clearfix ">
                    <div >
                        <span class="label">付款人</span>
                        <span class="label-text">{{paymentListItem.name}}</span>
                    </div>
                    <div class="edit">
                        <span class="label colorFF6536" @click="invoiceEdit(paymentListItem)"><i class="el-icon-bianji icon"></i>编辑</span>
                        <span class="label-text colorFF6536" @click="delInvoicEdit(paymentListItem)"><i class="el-icon-delete icon"></i>删除</span>
                    </div>
                </div>
                <div >
                    <span class="label mt20">付款银行</span>
                    <span class="label-text">{{paymentListItem.bankName}}</span>
                </div>
                <div class="clearfix mt20">
                    <div >
                        <span class="label">付款账号</span>
                        <span class="label-text">{{paymentListItem.account}}</span>
                    </div>
                    <div class="mt10">
                        <el-button style="float: right; padding: 3px 0" type="text" class="bdf36" v-if="paymentListItem.type==1">默认付款人</el-button>
                    </div>
                </div>
            </div>
           
        </div>
        <div class="add mt20" @click="invoiceEdit(null)">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加付款人</span>
        </div>
        <!-- 添加付款人弹框 -->
        <div class="addPlayInfo-dialog">
            <el-dialog
            title="付款人信息"
            :visible.sync="playInfoDlog"
            width="630px"
            center
            :show-close="showClos"
            :close-on-click-modal='onclickModal'
            >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="付款人姓名" prop="name" class="companyName">
                        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入付款人姓名" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="付款银行" prop="bankName">
                        <el-input v-model="ruleForm.bankName" autocomplete="off" placeholder="请输入银行（精确到支行）" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="付款账号" prop="account">
                        <el-input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model.number="ruleForm.account" autocomplete="off" placeholder="请输入付款账号" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="是否默认" prop="isdefault" class="btntype">
                        <el-button @click="Sure(1)" :class="{SureClass:this.isDefault == 1 }" class="ml0">是</el-button>
                        <el-button @click="Sure(0)" class="mf20" :class="{SureClass:this.isDefault == 0}">否</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf37">取 消</el-button>
                    <el-button type="primary" @click="submitFirm('ruleForm') " class="bdf36">确 定</el-button>
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
                :close-on-click-modal='onclickModal'
                >
                <div class="backbor"></div>
                <div class="center">确认要删除吗？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteCancel" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Icon ,Dialog, Input ,Form, FormItem } from 'element-ui';
import { getPayerListUrl, editCompanyPayerUrl, addCompanyPayerUrl, delPayerUrl } from '@/serverApi/personalCenter';

Vue.use(Button);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
export default {
    props:['playInfoData'],
    data() {
        var validateNumber = (rule, value, callback) => {
            let numberReg =  /[^0-9]/g;
            if(numberReg.test(value)) {
                callback(new Error('付款账号必须为数字值'));
            }else {
              callback();  
            }
        };
        return {
            playInfoDlog:false,
            showClos:false,
            isDefault:null,
            paymentListData:[],
            playInfoList:[],
            editShow:false,
            onclickModal:false,
            cpid:'',
            cid:'',
            deleteDialogShow:false,
            ruleForm:{
                name:'',
                bankName:'',
                account:'',
                isdefault:'',
            },
            rules:{
                name:[
                    { required: true, message: '请输入付款人姓名', trigger: 'change' }
                ],
                bankName:[
                    { required: true, message: '请输入付款银行', trigger: 'change' },
                ],
                account:[
                    { required: true, message: '请输入付款账号', trigger: 'change' },
                    { required: true,validator: validateNumber,trigger: 'change'} 
                ]
            }
        }
    },
    created() {
        this.getPayerList();
        this.cid = this.$route.params.id
    },
    methods:{
        // 请求付款信息列表
        getPayerList() {
            // let companyDetaiData = this.playInfoData;
            // let cid = companyDetaiData.cid;
            let parms = {cid: this.$route.params.id};
            getPayerListUrl(parms).then(res => {
                if(res.code == 200) {
                    this.paymentListData = res.data;
                }
            })
        },
        // 添加编辑
        invoiceEdit(data) {
            this.playInfoList = data || {};
            this.ruleForm = JSON.parse(JSON.stringify(this.playInfoList));
            this.playInfoDlog = true;
            if(data) {
                this.isDefault = data.type;
                return;
            }
             
        },
        // 编辑提交
        submitFirm(formName) {
             let paymentDetail = this.ruleForm;
                paymentDetail.isdefault = this.isDefault 
            let type = paymentDetail.isdefault;
             let cid = this.playInfoData.cid;
             let cpid = paymentDetail.cpid;
             let parms = {payerName:paymentDetail.name,payerBank:paymentDetail.bankName,payerAccount:paymentDetail.account,
             type:type,cpid:cpid};
             let parmss = {payerName:paymentDetail.name,payerBank:paymentDetail.bankName,payerAccount:paymentDetail.account,
             type:type,cid:cid};
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(cpid) {
                        editCompanyPayerUrl(parms).then(res => {
                            if(res.code ==200) {
                                this.playInfoDlog = false;
                                this.getPayerList();
                                this.$refs[formName].resetFields();
                            }
                        })              
                    }else if (cid) {
                        addCompanyPayerUrl(parmss).then(res => {
                            if(res.code ==200) {
                                this.playInfoDlog = false;
                                this.$refs[formName].resetFields();
                                this.getPayerList();
                                 
                            }
                        })
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除
        delInvoicEdit(data) {
            this.deleteDialogShow = true;
            this.cpid = data.cpid;
        },
         // 弹框删除确认取消事件
        deleteSubmit() {
            let parms = {cpid:this.cpid};
            delPayerUrl(parms).then(res => {
                if(res.code == 200 ) {
                    this.deleteDialogShow = false;
                    this.getPayerList();
                }
            })
        },
        deleteCancel() {
            this.deleteDialogShow = false;
        },
        cancel(formName) {
            this.playInfoDlog = false;
            this.$refs[formName].resetFields();
        },
        // 鼠标移入显示隐藏编辑按钮
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
        },
    }
}
</script>

<style lang="scss">
    .playInfo-content {
        border-top: 1px solid rgba(224,224,224,1);;
        padding-top: 20px;
        padding-bottom: 20px;
        .header {
            padding: 0 30px 0px;
           .consultant-title  {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                padding-left: 8px;
           }
        }
        .consultant-content {
            margin-top:10px;
            padding: 10px 30px;
            .edit {
                display: none;
            }
            &:hover {
                background:rgba(248,248,248,1);
                .edit {
                    display: block;
                }
            }
            .dashed-bottom:nth-child(1) {
                border-top: none;
            }
            border-top: 1px dashed #E0E0E0;
            &:nth-child(2) {
                border-top: none;
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
            .mt10 {
                margin-top: 10px;
            }
            .bdf36 {
                width: 100px;
                height: 24px;
                background: #ff6536;
                border: 1px solid #FF6536;
                margin-left: 30px;
                border-radius:12px;
                margin-top: -20px;
                span {
                    font-size:12px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:17px;
                }
            }
        }
        .clearfix {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .edit {
                cursor:pointer;
                span {
                    color: #FF6536;
                }
            }
        }
        .add {
            cursor:pointer;
            text-align: center;
            margin-bottom: 20px;
            span {
                color:  #FF895F;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
            }
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
                span {
                    display: block;
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    letter-spacing:2px;
                    margin-top: -4px;
                }
            }
            .el-dialog__footer {
                padding: 0;
                margin-top: -30px;
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
            .el-form {
                margin-top: 20px;
                margin-right: 60px;
            }
            .el-input {
                left: 10px;
            }
            .el-input__inner {
                height: 30px;
                line-height: 1;
            }
            .el-form-item__error {
                left: 10px;
            }
            .el-dialog--center .el-dialog__body {
                 padding:0 !important;
            }  
            .btntype {
                // margin-top: -10px;
                    .el-button {
                        width: 120px;
                        height: 30px;
                        margin-left: 10px;
                        border-radius:2px;
                        border:1px solid #D9D9D9;
                        background: #fff;
                        margin-top: 6px;
                    span {
                        color: #999999;
                    }
                }
            }
        }
        .SureClass {
            border: 1px solid #FF6536 !important;
            background: #fff;
            span {
                color: #FF6536 !important;
            }
        }
        .delete-dialog {
            .el-dialog__header {
                text-align: center;
                .el-dialog__title {
                    border-left: none;
                }
            }
            .center {
                text-align: center;
                font-size: 16px;
                padding: 20px 0;
            }
            .dialog-footer {
                display: flex;
                // padding: 0 90px;
                justify-content: center;
                .el-button {
                    width: 120px;
                    height: 32px;
                    padding: 0;
                    line-height: 25px;  
                }
                .bdf36 {
                    border: 1px solid #FF6536;
                    margin-right: 30px;
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
