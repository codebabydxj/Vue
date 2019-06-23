<template>
    <div class="program-cont">
        <div class="program-title mt20">
            <DTitle :name="'阶段详情'" :fontSize="18"/>
        </div>
        <div>
            <div class="detail-cont-box">
                <div class="flex-row project-name">
                    <h4>{{stageDetailsData.stageName}}</h4>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 0">未开始</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 1">有异议</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 2">待付款</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 3">待核对付款</span>
                    <span class="project-status orange" v-if="stageDetailsData.customerStatus == 4">进行中</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 5">待审核</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 6">申请发票</span>
                    <span class="project-status gray" v-if="stageDetailsData.customerStatus == 7">已完成</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 8">开票中</span>
                    <span class="project-status" v-if="stageDetailsData.customerStatus == 9">交付有异议</span>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>整体进度</label>
                        <span>第{{stageDetailsData.stageSort}}阶段</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>阶段周期</label>
                        <span>{{stageDetailsData.startTime | moment}} 至 {{stageDetailsData.endTime | moment}}</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <label>阶段描述</label>
                    <p class="flex-1" v-html="stageDetailsData.stageDescription"></p>
                </div>
                <div class="flex-start mt20">
                    <label>交付标的</label>
                    <p class="flex-1" v-html="stageDetailsData.deliverable"></p>
                </div>
                <div class="flex-start mt20">
                    <label>项目备注</label>
                    <p class="flex-1" v-html="stageDetailsData.note"></p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>付款比例</label>
                        <span v-if="stageDetailsData.percentage<1">{{stageDetailsData.percentage*100}}</span>
                        <span v-else>{{stageDetailsData.percentage}}</span>
                        %
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>付款金额</label>
                        <span>{{stageDetailsData.price}} 元</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>交付方式</label>
                        <span v-if="stageDetailsData.paymentMethod == 0">线上</span>
                        <span v-if="stageDetailsData.paymentMethod == 1">线下</span>
                    </p>
                </div>
            </div>
            <template v-if="stageDetailsData.document && stageDetailsData.document.length>0">
                <div class="detail-cont-box" v-for="(documentItem,key) in stageDetailsData.document" :key="key">
                    <DTitle :name="'交付物'+(key+1)" :fontSize="18"/>
                    <div class="flex-start mt20">
                        <label class="w90">交付物名称</label>
                        <span>{{documentItem.name}}</span>
                    </div>
                    <div class="flex-start mt20">
                        <label class="w90">交付物描述</label>
                        <p class="flex-1" v-html="documentItem.introduction"></p>
                    </div>
                    <div class="flex-start mt20">
                        <div class="flex-items-center flex-1">
                            <label class="w90">交付物原件</label>
                            <span>{{documentItem.sourceName}}</span>
                            <p class="flex-1 text-right"><el-button class="btn-w60" type="primary" :url="documentItem.deliverableUrl" @click="onDownUrl(documentItem.deliverableUrl)">下载</el-button></p>
                        </div>
                    </div>
                </div> 
            </template>
            <!-- <div class="detail-cont-box">
                <DTitle :name="'交付物2'" :fontSize="18"/>
                <div class="flex-start mt20">
                    <p>
                        <label class="w90">交付物名称</label>
                        <span>第二阶段初步解决方案</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <label class="w90">交付物描述</label>
                    <p class="flex-1">项目规划的背景 报告厅的多媒体方案设计包括音响扩声系统、会议（舞台）灯光系统、视频显示系统等。</p>
                </div>
                <div class="flex-start mt20">
                    <div class="flex-items-center flex-1">
                        <label class="w90">交付物原件</label>
                        <span>阶段一详细方案计划书.doc</span>
                        <p class="flex-1 text-right"><el-button class="btn-w60" type="primary">下载</el-button></p>
                    </div>
                </div>
            </div> -->
            <template v-if="stageDetailsData.proposal && stageDetailsData.proposal.length>0">
                <div class="detail-cont-box">
                    <DTitle :name="'修改意见'" :fontSize="18"/>
                    <div v-for="(proposalItem,key) in stageDetailsData.proposal" :key="key">
                        <div class="flex-start mt20">
                            <label>修改意见</label>
                            <p class="flex-1">{{proposalItem.opinion}}</p>
                        </div>
                        <div class="flex-start mt20">
                            <p>
                                <label>提出时间</label>
                                <span>{{proposalItem.createTime | moment}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <!-- <p class="status-btn mt20">
            <el-button class="btn-border mr60" @click="objectionDialogVisible= true">提出异议</el-button>
            <el-button type="primary" @click="onSubmitStageDetails">确认阶段交付</el-button>
            <el-button type="primary" @click="applyInvoice">申请发票</el-button>
            <el-button type="primary" @click="onSubmitPayment">提交支付凭证</el-button>
            <el-button type="primary" class="disable" v-if="stageDetailsData.customerStatus == 1 || stageDetailsData.customerStatus == 9">等待顾问修改中</el-button>
        </p> -->
        <p class="status-btn mt20" v-if="stageDetailsData.customerStatus == 1 || stageDetailsData.customerStatus == 2 
        || stageDetailsData.customerStatus == 5 || stageDetailsData.customerStatus == 6 || stageDetailsData.customerStatus == 9">
            <el-button class="btn-border mr60" v-if="stageDetailsData.customerStatus == 5" @click="objectionDialogVisible= true">提出异议</el-button>
            <el-button type="primary" v-if="stageDetailsData.customerStatus == 5" @click="onSubmitStageDetails">确认阶段交付</el-button>
            <el-button type="primary" v-if="stageDetailsData.customerStatus == 6" @click="applyInvoice">申请发票</el-button>
            <el-button type="primary" v-if="stageDetailsData.customerStatus == 2" @click="onSubmitPayment">提交支付凭证</el-button>
            <el-button type="primary" class="disable" v-if="stageDetailsData.customerStatus == 1 || stageDetailsData.customerStatus == 9">等待顾问修改中</el-button>
        </p>
        <!--提出异议内容框-->
        <el-dialog
            class="dialog-model header-border-b"
            :visible.sync="objectionDialogVisible"
            :close-on-click-modal="onclickModal"
            width="600px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'提出异议'" :fontSize="18"/></h4>
            <div>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    placeholder="请输入对项目的异议，字数在300字以内"
                    maxlength="300"
                    v-model.trim="objectionValue">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="objectionDialogVisible = false" class="border mr60">取消</el-button>
                <el-button type="primary" @click="objectionSubmit" class="solid">提交</el-button>
            </div>
        </el-dialog>
        <!--提交支付凭证内容框-->
        <el-dialog
            class="dialog-model deliverables-dialog-model header-border-b text-left"
            :visible.sync="paymentDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog('paymentRuleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'提交支付凭证'" :fontSize="18"/></h4>
            <div>
                <p class="cont-title">{{stageDetailsData.stageName}}</p>
                <el-form :model="paymentForm" :rules="paymentRules" 
                    ref="paymentRuleForm" 
                    label-width="80px" 
                    class="program-ruleForm" 
                    label-position="left">
                    <el-form-item label="应付金额" class="h30">
                        <span>{{paymentAdditionalInfo.price}} 元</span>
                    </el-form-item>
                    <el-form-item label="实付金额" class="h30" prop="realPrice">
                        <el-col :span="10">
                            <el-input v-model="paymentForm.realPrice" placeholder="请输入实付金额"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="收款人" class="h30">
                        <span>{{paymentAdditionalInfo.payee}}</span>
                    </el-form-item>
                    <el-form-item label="收款账号" class="h30">
                        <span>{{paymentAdditionalInfo.payeeAccount}}</span>
                    </el-form-item>
                    <el-form-item label="付款人" prop="payer" class="h30">
                        <el-col :span="10">
                            <el-input v-model="paymentForm.payer" placeholder="请输入付款人"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="付款银行" prop="payerBank" class="h30">
                        <el-col :span="10">
                            <el-input v-model="paymentForm.payerBank" placeholder="请输入付款银行"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="付款账号" prop="payerAccount" class="h30">
                        <el-col :span="10">
                            <el-input v-model="paymentForm.payerAccount" placeholder="请输入付款账号"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="支付凭证" prop="paymentUrl" class="mt24">
                        <el-col :span="10">
                            <el-upload
                                class="upload-demo"
                                :action="paymentActionUrl"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :show-file-list="false"
                            >
                                <!-- <img width="190" height="122" :src="paymentForm.paymentUrl" alt="" class="payImg"> -->
                                <img :src="paymentForm.paymentUrl" alt="" class="payImg">
                                <el-button type="primary" class="btn-w60">{{isUpload ? '重新上传':'上传'}}</el-button>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr play-dialog">
                <el-button @click="resetForm('paymentRuleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="paymentsubmitForm('paymentRuleForm')" class="solid">确定</el-button>
            </div>
        </el-dialog>
        <!--申请发票内容框-->
        <el-dialog
            class="dialog-model deliverables-dialog-model text-left invoice-model"
            :visible.sync="invoiceDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog(activeName == 'ordinary' ? 'ordinaryRuleForm' : 'specialRuleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title">申请发票</h4>
            <div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="增值税普通发票" name="ordinary"> 
                        <p class="cont-title">{{stageDetailsData.stageName}}</p>
                        <el-form :model="ordinaryInvoiceForm" :rules="ordinaryInvoiceRules" 
                            ref="ordinaryRuleForm" 
                            label-width="80px" 
                            class="program-ruleForm" 
                            label-position="left">
                            <el-form-item label="对应阶段" class="h30">
                                <span>第{{stageDetailsData.stageSort}}阶段 </span>
                            </el-form-item>
                            <el-form-item label="金额" class="h30">
                                <span>{{invoiceAdditionalInfo.price}} 元</span>
                            </el-form-item>
                            <el-form-item label="发票抬头" class="h30" prop="invoiceLetterhead">
                                <el-input v-model="ordinaryInvoiceForm.invoiceLetterhead" placeholder="请输入发票抬头"></el-input>
                            </el-form-item>
                            <el-form-item label="纳税号" prop="taxNumber" class="h30">
                                <el-input v-model="ordinaryInvoiceForm.taxNumber" placeholder="请输入纳税号"></el-input>
                            </el-form-item>
                            <el-form-item label="寄送地址" prop="companyAddress" class="h30">
                                <el-input v-model="ordinaryInvoiceForm.companyAddress" placeholder="请输入寄送地址"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人" prop="recipient" class="h30">
                                <el-input v-model="ordinaryInvoiceForm.recipient" placeholder="请输入收件人"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" prop="phone" class="h30">
                                <el-input v-model="ordinaryInvoiceForm.phone" placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="增值税专用发票" name="special">
                        <p class="cont-title">{{stageDetailsData.stageName}}</p>
                        <el-form :model="specialInvoiceForm" :rules="specialInvoiceRules" 
                            ref="specialRuleForm" 
                            label-width="80px" 
                            class="program-ruleForm" 
                            label-position="left">
                            <el-form-item label="对应阶段" class="h30">
                                <span>第{{stageDetailsData.stageSort}}阶段 </span>
                            </el-form-item>
                            <el-form-item label="金额" class="h30">
                                <span>{{invoiceAdditionalInfo.price}} 元</span>
                            </el-form-item>
                            <el-form-item label="发票抬头" class="h30" prop="invoiceLetterhead">
                                <el-input v-model="specialInvoiceForm.invoiceLetterhead" placeholder="请输入发票抬头"></el-input>
                            </el-form-item>
                            <el-form-item label="纳税号" prop="taxNumber" class="h30">
                                <el-input v-model="specialInvoiceForm.taxNumber" placeholder="请输入纳税号"></el-input>
                            </el-form-item>
                            <el-form-item label="公司电话" prop="companyPhone" class="h30">
                                <el-input v-model="specialInvoiceForm.companyPhone" placeholder="请输入公司电话"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行" prop="bankName" class="h30">
                                <el-input v-model="specialInvoiceForm.bankName" placeholder="请输入开户行"></el-input>
                            </el-form-item>
                            <el-form-item label="对公账号" prop="bankNumber" class="h30">
                                <el-input v-model="specialInvoiceForm.bankNumber" placeholder="请输入对公账号"></el-input>
                            </el-form-item>
                            <el-form-item label="寄送地址" prop="companyAddress" class="h30">
                                <el-input v-model="specialInvoiceForm.companyAddress" placeholder="请输入寄送地址"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人" prop="recipient" class="h30">
                                <el-input v-model="specialInvoiceForm.recipient" placeholder="请输入收件人"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" prop="phone" class="h30">
                                <el-input v-model="specialInvoiceForm.phone" placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm(activeName == 'ordinary' ? 'ordinaryRuleForm' : 'specialRuleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="invoicesubmitForm(activeName == 'ordinary' ? 'ordinaryRuleForm' : 'specialRuleForm')" class="solid">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import Vue from 'vue'
import { Button, Upload, Col } from 'element-ui'
import DTitle from '@/components/DTitle'
import { getProjectStageDetail, customerNayDocument, 
confirmStage, getPayMentByPsid, addPayMent, getInvoiceByPsid, addInvoice } from '@/serverApi/project'
import { filesUpload } from '@/serverApi/common'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Button)
Vue.use(Col)
Vue.use(Upload)

export default {
    components: {
        DTitle,
    },
    data() {
        var payerAccountvalidate = (rule, value, callback) => {
            let numberReg =  /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入付款账号'));
            }else if(numberReg.test(value)) {
                callback(new Error('付款账号必须为数字值'));
            }else {
              callback();  
            }
        };
        var realPricevalidate = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入实付金额'));
            }else if(numberReg.test(value)) {
                callback(new Error('实付金额只能输入数字'));
            }else if(value > 999999999) {
                callback(new Error('实付金额只能小于9位数'));
            }else {
              callback();  
            }
        };
        var taxNumbervalidate = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入纳税号'));
            }else if(numberReg.test(value)) {
                callback(new Error('纳税号只能输入数字'));
            }else {
              callback();  
            }
        };
        var bankNumbervalidate = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入对公账号'));
            }else if(numberReg.test(value)) {
                callback(new Error('对公账号只能输入数字'));
            }else {
              callback();  
            }
        };
        var phonevalidate = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            if(!value) {
                callback(new Error('请输入联系方式'));
            }else if(!regPhone.test(value)) {
                callback(new Error('请输入正确联系方式'));
            }else {
              callback();  
            }
        };
        var companyPhonevalidate = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            if(!value) {
                callback(new Error('请输入公司电话'));
            }else if(!regPhone.test(value)) {
                callback(new Error('请输入正确公司电话'));
            }else {
              callback();  
            }
        };
        return {
            title: '项目详情',
            stageDetailsData: {},
            objectionDialogVisible: false,
            objectionValue: '',
            paymentDialogVisible: false,
            invoiceDialogVisible: false,
            activeName: 'ordinary',
            onclickModal:false,
            paymentForm: {
                realPrice: '',
                payer: '', 
                payerBank: '',
                payerAccount: '',
                paymentUrl: '',
                fid: ''
            },
            paymentRules: {
                realPrice: [
                    { required: true, validator:realPricevalidate },
                ],
                payer: [
                    { required: true, message: '请输入付款人' },
                ],
                payerBank: [
                    { required: true, message: '请输入付款银行' },
                ],
                payerAccount: [
                    // { required: true, message: '请输入付款账号' },
                    { required: true,validator: payerAccountvalidate,trigger: 'change'} 
                ]
            },
            ordinaryInvoiceForm: {
                invoiceLetterhead: '', //发票抬头
                taxNumber: '',  //纳税号
                companyAddress: '', //寄送地址
                recipient: '', //收件人
                price: '',  //金额
                phone: '', //联系方式taxPhone
            },
            specialInvoiceForm: {
                invoiceLetterhead: '',  //发票抬头
                taxNumber: '',  //纳税号
                price: '',  //金额
                recipient: '',  //收件人
                phone: '',  //联系方式taxPhone
                bankName: '',  //开户行openBank
                companyPhone: '',  //公司电话
                companyAddress: '',  //寄送地址
                bankNumber: '',  //对公账号account
            },
            specialInvoiceRules: {
                taxNumber: [
                    { required: true, validator: taxNumbervalidate, },
                ],
                invoiceLetterhead: [
                    { required: true, message: '请输入发票抬头' },
                ],
                companyAddress: [
                    { required: true, message: '请输入寄送地址' },
                ],
                recipient: [
                    { required: true, message: '请输入收件人' },
                ],
                phone: [
                    { required: true, validator: phonevalidate },
                ],
                bankName: [
                    { required: true, message: '请输入开户行' },
                ],
                companyPhone: [
                    { required: true, validator: companyPhonevalidate },
                ],
                bankNumber: [
                    { required: true, validator: bankNumbervalidate },
                ]
            },
            ordinaryInvoiceRules:{
                taxNumber: [
                    { required: true, validator: taxNumbervalidate },
                ],
                invoiceLetterhead: [
                    { required: true, message: '请输入发票抬头' },
                ],
                companyAddress: [
                    { required: true, message: '请输入寄送地址' },
                ],
                recipient: [
                    { required: true, message: '请输入收件人' },
                ],
                phone: [
                    { required: true,validator: phonevalidate },
                ]
            },
            fileList: [],
            isUpload: false,
            paymentAdditionalInfo: {},
            invoiceAdditionalInfo: {},
            paymentActionUrl: filesUpload
        }
    },
    created() {
        this.getStageDetails();
    },
    methods: {
        // 阶段详情数据请求
        getStageDetails() {
            getProjectStageDetail({id: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.stageDetailsData = response.data;
                }
            })
        },
        // 阶段交付物提出异议操作
        objectionSubmit() {
            let params = {psid: this.$route.params.id, opinion: this.objectionValue}
            if(!this.objectionValue){
                this.$message.error('异议内容不能为空，请填写内容')
                return
            }
            customerNayDocument(params).then(response => {
                if(response.code == 200) {
                    this.objectionDialogVisible = false;
                    MessageAlert({title:'提交成功',content:'您已经成功提交对阶段详情的修改意见！请耐心等候顾问修改内容。',okText:'确定'}).then(res => {
                        this.getStageDetails()
                    }).catch(text => {
                        this.getStageDetails()
                    })
                }
            })
        },
        // 确认单个阶段计划请求
        onSubmitStageDetails() {
            MessageConfirm({
                 title:'确认阶段交付',
                 content:'是否确认阶段交付？确认后，平台将视为您已确认该阶段的完工与验收！您可以前往“个人中心-发票管理”申请开票！',
                 okText:'确定',
                 cancelText:'取消'
            }).then(res => {
                let params = { psid: this.$route.params.id, status: 6 }
                confirmStage(params).then(response => {
                    if(response.code == 200) {
                         MessageAlert({
                             title:'已验收该阶段',
                             content:'您已验收该阶段！请前往“个人中心-发票管理”申请开票！',
                             okText:'确定'
                        }).then(res => {
                            this.getStageDetails()
                        }).catch(text => {
                            this.getStageDetails()
                        })
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        },
        handleRemove(file, fileList) {
            if(fileList.length<1) {
                this.isUpload = false
            }
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 上传成功时调用
        handleAvatarSuccess(res, file) {
            // this.paymentForm.paymentUrl = URL.createObjectURL(file.raw);
            if(res.code == 200){
                this.paymentForm.paymentUrl = res.data.url;
                this.paymentForm.fid = res.data.fid;
                this.isUpload = true;
            }
        },
        // 关闭时回调
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.invoiceDialogVisible=false
            this.isUpload = false
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.paymentDialogVisible = false;
            this.invoiceDialogVisible=false
        },
        //提交提交支付凭证
        paymentsubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.paymentForm;
                    params = Object.assign({
                        psid: this.$route.params.id,
                        payee: this.paymentAdditionalInfo.payee,
                        payeeBank: this.paymentAdditionalInfo.payeeBank,
                        payeeAccount: this.paymentAdditionalInfo.payeeAccount,
                        price: this.paymentAdditionalInfo.price
                    },params)
                    // this.paymentDialogVisible = false
                    this.paymentsubmitConfirm(params)

                } else {
                    return false;
                }
            });
        },
        // 提交支付凭证确认框
        paymentsubmitConfirm(data) {
            MessageConfirm({
                 title:'提交支付凭证',
                 content:'请您确认支付凭证信息是否正确？提交后，平台将对您的支付凭证进行核实，确保项目尽快启动。',
                 okText:'确定',
                 cancelText:'取消'
            }).then(res => {
                addPayMent(data).then(response => {
                    if(response.code == 200){
                        setTimeout(this.paymentDialogVisible = false,200) 
                        MessageAlert({
                             title:'提交成功',
                             content:'您的支付凭证已提交成功！平台将于48小时内对支付凭证进行核实，如有问题请联系麦盟客服：0755-8695-9936',
                             okText:'确定'
                        }).then(res => {
                            this.getStageDetails()
                        }).catch(err => {
                            this.getStageDetails()
                        })
                    }
                })
               
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 提交支付凭证图片格式大小限制
        beforeAvatarUpload(file) { 
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png'  || file.type === 'image/gif');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('支付凭证图片只能是 JPG 格式!');
                return
            }
            if (!isLt2M) {
                this.$message.error('支付凭证图片大小不能超过 2MB!');
                return
            }
        },
        // 项目提交支付凭证附加信息数据请求
        onSubmitPayment() {
            getPayMentByPsid({psid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    if(!response.data) return
                    this.paymentAdditionalInfo = response.data
                    this.paymentDialogVisible = true;
                    if(this.paymentAdditionalInfo.payerList && this.paymentAdditionalInfo.payerList.length>0) {
                        this.paymentAdditionalInfo.payerList.map(d => {
                            if (d.type == 1) {
                                this.paymentForm['payer'] = d.name;
                                this.paymentForm['payerBank'] = d.bankName;
                                this.paymentForm['payerAccount'] = d.account;
                            }
                        })
                    }
                }
            })
        },
        // 项目申请发票附加信息数据请求
        applyInvoice() {
            getInvoiceByPsid({psid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    if(!response.code) return
                    this.invoiceAdditionalInfo = response.data || {}
                    this.setNewObj(this.ordinaryInvoiceForm, this.invoiceAdditionalInfo)
                    this.setNewObj(this.specialInvoiceForm, this.invoiceAdditionalInfo)
                    this.invoiceDialogVisible = true
                }
            })
        },
        // 遍历对象赋值
        setNewObj(newObj,oldObj) {
            Object.keys(newObj).forEach(key => {
                if(key == 'phone'){
                    newObj['phone'] = oldObj['taxPhone']
                }else if(key == 'bankName'){
                    newObj['bankName'] = oldObj['openBank']
                }else if(key == 'bankNumber'){
                    newObj['bankNumber'] = oldObj['account']
                }else {
                    newObj[key] = oldObj[key]
                }
            })
        },
        // 提交发票请求
        invoicesubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = formName == 'ordinaryRuleForm' ? this.ordinaryInvoiceForm : this.specialInvoiceForm;
                    params = Object.assign({
                        psid: this.$route.params.id,
                        invoiceType: formName == 'ordinaryRuleForm' ? 1 : 0
                    },params)
                    this.incoicesubmitConfirm(params)
                } else {
                    return false;
                }
            });
        },
        // 提交发票请求确认框
        incoicesubmitConfirm(data) {
            MessageConfirm({
                 title:'申请发票',
                 content:'请确认发票信息是否正确！申请发票后，平台将对您的发票信息进行核实。核实无误后，将通过快递的方式给您邮寄发票。',
                 okText:'确定',
                 cancelText:'取消'
            }).then(res => {
                addInvoice(data).then(response => {
                    if(response.code == 200){
                        this.invoiceDialogVisible = false
                        MessageAlert({
                             title:'提交成功',
                             content:'您的发票申请已提交成功！平台将于48小时内对发票信息进行核实并安排邮寄！如有疑问请联系麦盟客服：0755-8695-9936',
                             okText:'确定'
                        }).then(res => {
                            this.getStageDetails()
                        }).catch(text => {
                            this.getStageDetails()
                        })
                    }
                })
               
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 下载文件
        onDownUrl(url) {
            if(!url || url.substr(0,4) != "http"){
                this.$message.warning('下载的文件为空');
                return;
            }
            window.location.href = url;
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.program-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .program-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    p, span{
        font-size: 14px;
        color: #666666;
    }
    label {
        width: 57px;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        color: #333333;
        &.w90 {
            width: 90px;
        }
    }
    .border-b-1 {
        border-bottom: 1px solid #E0E0E0;
    }
    .detail-cont-box {
        padding: 20px 35px 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }
        .project-name {
            h4 {
                line-height: 22px;
                font-size: 16px;
                color: #404040;
                font-weight: 600;
                text-align: left;
            }
            .project-status {
                display: inline-block;
                width: 100px;
                height: 24px;
                line-height: 24px;
                border-radius:15px;
                background:#FF705F;
                color: #FFFFFF;
                font-size: 14px;
                &.gray {
                    background: #D9D9D9;
                }
                &.orange {
                    background: #FFA75F;
                }
            }
        }
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .text-right {
        text-align: right;
    }
    .flex-items-center {
        display: flex;
        align-items: center;
    }
    .btn-w60 {
        width: 60px;
        height: 24px;
        line-height: 22px;
        border-radius: 3px;
        padding: 0;
        margin-left: 20px;
        // margin-left: 10px;
        span {
            font-size: 12px;
            color: #fff;
        }
    }
    .status-btn {
        padding-bottom: 60px;
        .el-button {
            width:260px;
            height:45px;
            // background:rgba(255,101,54,1);
            border-radius:3px;
            span {
                font-size: 18px;
                color: #fff;
            }
            &.disable {
                background:rgba(217,217,217,1);
                border-color: #d9d9d9;
                cursor: auto;
            }
            &.btn-border {
                border: 1px solid rgba(255,101,54,1);
                span {
                    color: #FF6536;
                }
            } 
        }
        .el-button + .el-button {
            margin-left: 0;
        }
    }
    .dialog-model {
        &.header-border-b {
            .el-dialog__header {
                border-bottom: 1px solid #E0E0E0;
            }
        }
        .dialog-title, .el-dialog__headerbtn .el-dialog__close {
            font-size: 20px;
            color: #000000;
            font-weight: 600;
        }
        .dialog-title {
            color: #333333;
        }
        
        .el-dialog__body {
            padding: 20px 38px 25px;
            .dialog-cont {
                font-size: 16px;
                line-height: 22px;
                text-align: left;
            }
            .el-textarea {
                max-width: 460px;
            }
        }
        .dialog-footer {
            .el-button {
                width: 120px;
                height: 32px;
                line-height: 32px;
                border-radius: 4px;
                padding: 0;
                &.border {
                    border:1px solid rgba(255,101,54,1);
                    span {
                        color: #FF6536;
                    }
                }
                &.solid {
                    span {
                        color: #fff;
                    }
                }
            }
            .el-button + .el-button {
                margin-left: 0;
            }
        }
        .play-dialog {
            padding-top: 45px;
        }
        .cont-title {
            font-size: 16px;
            line-height: 22px;
            color: #333333;
            font-weight: 600;
            margin-bottom: 10px;
        }
        &.deliverables-dialog-model {
            .el-form-item {
                margin-bottom: 16px;
                &.h30 {
                    height: 32px;
                    text-align: left;
                    input {
                        height: 30px;

                    }
                    .text-center {
                        text-align: center
                    }
                }
                .price-item-cont {
                    margin-top: 15px;
                    p {
                        line-height: 20px;
                        // color: #999999;
                    }
                }
                .address-slot-label {
                    line-height: 20px;
                    margin-top: 10px;
                }
                .el-form-item__error {
                    padding-top: 0;
                }
            }
            .upload-demo {
                display: flex;
                justify-content: space-between;
                .el-upload--text {
                    order: 1;
                }
                .el-upload {
                    text-align: left;
                    // padding-top: 80px;
                }
                .payImg {
                    // min-width: 191px;
                    max-width: 191px;
                    max-height: 122px;
                    position: relative;
                    top: 40px;
                }
            }
        }
        &.invoice-model {
            .el-form-item {
                margin-bottom: 20px;
            }
            .el-dialog__header {
                text-align: center;
            }
            .dialog-footer {
                padding-bottom: 20px;
            }
        }
    }
    .mt24 {
        margin-top: 24px;
    }
    .el-form-item.is-success .el-input__inner {
        border-color: #D9D9D9;
    }
    .el-input__inner {
        height: 30px;
        border-radius: 2px;
        border: 1px solid #D9D9D9;
        color: #333333;
        line-height: 1;
    }
}


</style>