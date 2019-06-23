<template>
    <div class="companyInvoice">
        <div class="header">
            <div class="consultant-title">公司发票信息</div>
        </div>
        <div class="consultant-content" v-if="companyDetailInvoice.taxPhone">
            <div class="companyInvoiceEdit" >
                <div >
                    <span class="label">纳税号</span>
                    <span class="label-text ml20" v-if="companyDetailInvoice.taxNumber">{{companyDetailInvoice.taxNumber}}</span>
                    <span class="label-text ml20" v-if="!companyDetailInvoice.taxNumber">未填写</span>
                </div>
                <div class="edit">
                    <span class="label colorFF6536" @click="invoiceEdit(companyDetailInvoice)"><i class="el-icon-bianji icon"></i>编辑</span>
                    <span class="label-text colorFF6536" @click="delInvoicEdit(companyDetailInvoice)"><i class="el-icon-delete icon"></i>删除</span>
                </div>
            </div>
            <div class="mt20">
                <span class="label">联系电话</span>
                <span class="label-text ml20" >{{companyDetailInvoice.taxPhone}}</span>
            </div>
            <div class="mt20">
                <span class="label">开户行</span>
                <span class="label-text ml20" >{{companyDetailInvoice.taxBank}}</span>
            </div>
            <div class="mt20">
                <span class="label">对公账号</span>
                <span class="label-text ml20" >{{companyDetailInvoice.taxAccount}}</span>
            </div>
        </div>
        <!-- 添加发票信息 -->
        <div class="add mt20" @click="invoiceEdit(null)" v-if="!companyDetailInvoice.taxNumber && !companyDetailInvoice.taxPhone 
        && !companyDetailInvoice.taxBank && !companyDetailInvoice.taxAccount">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加发票信息</span>
        </div>
        <!-- 添加发票弹框 -->
        <div class="addPlayInfo-dialog">
            <el-dialog
            title="公司发票信息"
            :visible.sync="companyInvoicInfoDlog"
            width="630px"
            center
            :show-close="showClos"
            :close-on-click-modal="onclickModal"
            >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="纳税号" prop="taxNumber" class="companyName">
                        <el-input v-model="ruleForm.taxNumber" autocomplete="off" placeholder="请输入公司纳税号" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="taxPhone">
                        <el-input v-model="ruleForm.taxPhone" autocomplete="off" placeholder="请输入联系电话" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行" prop="taxBank" class="taxBankName">
                        <el-input v-model="ruleForm.taxBank" autocomplete="off" placeholder="请输入银行信息（精确到支行）" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="对公账号" prop="taxAccount">
                        <el-input v-model="ruleForm.taxAccount" autocomplete="off" placeholder="请输入对公账号" class="company-input"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf37">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm') " class="bdf36">确 定</el-button>
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
                <div class="backbor"></div>
                <div class="center">确认要删除吗？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteCancel" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()" class="ml20">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Icon ,Dialog, Input ,Form, FormItem } from 'element-ui';
import { editCompanyPayTaxesUrl, delPayTaxesUrl } from '@/serverApi/personalCenter';

Vue.use(Button);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
export default {
    props:['companyDetailInvoice','InvoiceFunction'],
    data() {
        var validatePhone = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[357894]\d{9}))$/;
            if(!value) {
                callback(new Error('请输入联系电话'));
            }else if (!regPhone.test(value) && value) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        var validateNumber = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入纳税号'));
            } else if(numberReg.test(value)) {
                callback(new Error('只能输入数字'));
            }else {
              callback();  
            }
        };
        var taxAccountValidate = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入对公账号'));
            } else if(numberReg.test(value)) {
                callback(new Error('只能输入数字'));
            }else {
              callback();  
            }
        };
        return{
            editShow:false,
            companyInvoicInfoDlog:false,
            showClos:false,
            deleteDialogShow:false,
            invoiceList:{},
            cid:'',
            onclickModal:false,
            ruleForm:{
                taxNumber:'',
                taxPhone:'',
                taxBank:'',
                taxAccount:''
            },
            rules:{
            //    taxNumber:[
            //        { required: true, validator: validateNumber,trigger: 'change'} 
            //    ],
               taxPhone:[
                   { required: true, validator: validatePhone,trigger: 'change'} 
               ],
               taxBank:[
                   {required: true, message: '请输入开户行',trigger: 'change'}
               ],
               taxAccount:[
                   { required: true, validator: taxAccountValidate,trigger: 'change'} 
               ], 
            }
        }
    },
    created() {
        this.cid = this.$route.params.id
    },
    methods:{
        // 添加编辑
        invoiceEdit(data) {
            this.invoiceList = (data ? data : {});
            this.ruleForm = JSON.parse(JSON.stringify(this.invoiceList));
            if(data) {
                this.ruleForm = Object.assign({},this.ruleForm)
            }
            this.companyInvoicInfoDlog = true;
        },
        // 删除
        delInvoicEdit(data) {
            this.cid = data.cid;
            this.deleteDialogShow = true;
            
        },
        // 删除确认框
        deleteSubmit() {
            let parms = {cid:this.cid}
            delPayTaxesUrl(parms).then(res => {
                this.InvoiceFunction();
                this.deleteDialogShow = false;
            })
        },
        deleteCancel() {
            this.deleteDialogShow = false;
        },
        // 鼠标移入显示隐藏编辑按钮
        // onEditShow() {
        //     this.editShow = true;
        // },
        // offEditShow() {
        //     this.editShow = false;
        // },
        // 编辑提交
        submitForm(formName) {
            let invoiceData = this.ruleForm;
            let parms = {taxNumber:invoiceData.taxNumber,taxPhone:invoiceData.taxPhone,taxBank:invoiceData.taxBank,taxAccount:invoiceData.taxAccount,cid:this.cid}
            // if(cid) {
            //     parms = {cid:cid,taxNumber:invoiceData.taxNumber,taxPhone:invoiceData.taxPhone,taxBank:invoiceData.taxBank,taxAccount:invoiceData.taxAccount}
            // }
            // editCompanyPayTaxesUrl(parms).then(res => {
            //     if(res.code == 200) {
            //         this.companyInvoicInfoDlog = false;
            //         this.InvoiceFunction();
            //         //  this.$refs[formName].resetFields();
            //     }
            // })
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    editCompanyPayTaxesUrl(parms).then(res => {
                        if(res.code == 200) {
                            this.companyInvoicInfoDlog = false;
                            this.InvoiceFunction();
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.companyInvoicInfoDlog =false;
        }
    },
    computed:{}
}
</script>

<style lang="scss">
    .companyInvoice {
        border-top: 1px solid rgba(224,224,224,1);;
        padding-top: 20px;
        padding-bottom:20px;
        .header {
            padding: 0 30px 0;
            .consultant-title  {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                padding-left: 8px;
                .company-border {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(224,224,224,1);
                }
            }
        }
        .consultant-content {
            margin-top:10px;
            padding:10px 30px;
             .edit {
                display: none;
            }
            &:hover {
                 background:rgba(248,248,248,1);
                .edit {
                    display: block;
                }
            }
            .consultant-Info {
                .NameTime {
                    display: flex;
                }
                .work-Time {
                    margin-left: 120px;
                    margin-right: -70px;
                }
                .person-Name {
                    width: 250px;
                }
            }
            .company-border {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid rgba(224,224,224,1);
            }
            .companyInvoiceEdit {
                display: flex;
                justify-content: space-between;
                // height: 32px;
                .edit {
                    cursor:pointer;
                    span {
                        color: #FF6536;
                    }
                }
            }
        }
        .mt20 {
            margin-top: 20px;
        }
        .pl20 {
            padding-left: 20px;
        }
        .ml20 {
            margin-left: 20px;
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
            padding-bottom: 0;
            border-bottom: none;
        }
        .el-card__body {
            padding: 0 20px 20px;
        }
        .w70 {
            width: 70px;
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
            //     margin-right: -48px;
            //     color: #333333;
            // }
            // .taxBankName.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right: -50px;
            //     color: #333333;
            // }
            .el-form {
                margin-top: 20px;
                margin-right: 60px;
            }
            .el-input__inner {
                height: 30px;
                line-height: 1;
            }
            .el-dialog__body {
                padding:0;
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
                    margin-right: 20px;
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