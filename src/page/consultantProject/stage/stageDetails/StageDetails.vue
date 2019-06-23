<template>
    <div class="program-cont">
        <div class="program-title mt20">
            <div class="flex-row">
                <DTitle :name="'阶段详情'" :fontSize="18"/>
                <a class="project-edit" href="javascript:void(0);" @click="onEditStage" v-if="detailsData.adviserStatus == -1 || detailsData.adviserStatus == 1">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                </a>
            </div>
        </div>
        <div>
            <div class="detail-cont-box">
                <div class="flex-row project-name">
                    <h4>{{detailsData.stageName}}</h4>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>整体进度</label>
                        <span>第{{detailsData.stageSort}}阶段</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>阶段周期</label>
                        <span>{{detailsData.startTime | moment}} 至 {{detailsData.endTime | moment}}</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <label>阶段描述</label>
                    <p class="flex-1" v-html="detailsData.stageDescription"></p>
                </div>
                <div class="flex-start mt20">
                    <label>交付标的</label>
                    <p class="flex-1" v-html="detailsData.deliverable"></p>
                </div>
                <div class="flex-start mt20">
                    <label>项目备注</label>
                    <p class="flex-1" v-html="detailsData.note"></p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>付款比例</label>
                        <span v-if="detailsData.percentage<1">{{detailsData.percentage*100}}</span>
                        <span v-else>{{detailsData.percentage}}</span>
                        %
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>付款金额</label>
                        <span>{{detailsData.price}} 元</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>交付方式</label>
                        <span v-if="detailsData.paymentMethod == 0">线上</span>
                        <span v-if="detailsData.paymentMethod == 1">线下</span>
                    </p> 
                </div>
            </div>
            <template v-if="(!detailsData.document || detailsData.document.length<1) && (detailsData.adviserStatus == 3 || detailsData.adviserStatus == 8)">
                <div class="detail-cont-box">
                    <DTitle :name="'阶段交付物'" :fontSize="18"/>
                    <div class="no-content">
                        <img src="static/image/no-content.png"/>
                        <p>当前分类暂时为空，点击下方按钮添加阶段交付物！</p>
                        <el-button type="primary" @click="deliverablesDialogVisible=true">添加阶段交付物</el-button>
                    </div>
                </div>
            </template>
            <template v-if="detailsData.document && detailsData.document.length>0">
                <div class="detail-cont-box detail-cont-pbox" v-for="(documentItem,key) in detailsData.document" :key="key">
                    <div class="detail-title">
                        <DTitle :name="'交付物'+(key+1)" :fontSize="18"/>
                    </div>
                    <div class="detail-content">
                        <div class="flex-edit">
                            <div class="flex-start mt20">
                                <label class="w90">交付物名称</label>
                                <span>{{documentItem.name}}</span>
                            </div>
                            <div class="flex-end pl90 mt20">
                                <span class="edit" @click="EditInfo(documentItem)"><i class="el-icon-bianji icon"></i>编辑</span>
                                <span class="delete" @click="deleteSubmit(documentItem.pdid)"><i class="el-icon-delete"></i>删除</span>
                            </div>
                        </div>
                        <!-- <div class="flex-start mt20">
                            <label class="w90">交付物名称</label>
                            <span>{{documentItem.name}}</span>
                        </div> -->
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
                        <div class="add-text mt20" @click="deliverablesDialogVisible=true" v-if="key == (detailsData.document.length-1) && (detailsData.adviserStatus == 3 || detailsData.adviserStatus == 8)">
                            <a href="javascript:void(0);">
                                <i class="el-icon-circle-plus"></i>
                                <span>添加阶段交付物</span>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </template>
            <!-- <div class="add-text mt20" v-if="detailsData.adviserStatus == 3 || detailsData.adviserStatus == 8" @click="deliverablesDialogVisible=true"> -->
            <!-- <div class="add-text mt20" @click="deliverablesDialogVisible=true">
                <a href="javascript:void(0);">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加阶段交付物</span>
                </a>
            </div> -->
            <div class="detail-cont-box" v-if="detailsData.proposal && detailsData.proposal.length>0">
                <DTitle :name="'修改意见'" :fontSize="18"/>
                <div v-for="(proposalItem,key) in detailsData.proposal" :key="key">
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
        </div>
        <!-- <p class="status-btn mt20">
            <el-button type="primary" @click="onDeliverablesSubmit">提交阶段交付</el-button>
            <el-button type="primary" @click="applyCollectionInfo">申请收款</el-button>
            <el-button type="primary" class="disable" v-if="detailsData.adviserStatus == 0 || detailsData.adviserStatus == 4">等待审核中</el-button>
        </p> -->
        <p class="status-btn mt20" v-if="(detailsData.document && detailsData.document.length>0) && (detailsData.adviserStatus == 0 || detailsData.adviserStatus == 3 || 
        detailsData.adviserStatus == 4|| detailsData.adviserStatus == 5 || detailsData.adviserStatus == 8)">
            <el-button type="primary" v-if="(detailsData.document && detailsData.document.length>0) && (detailsData.adviserStatus == 3 || detailsData.adviserStatus == 8)" @click="onDeliverablesSubmit">提交阶段交付</el-button>
            <el-button type="primary" v-if="detailsData.adviserStatus == 5" @click="applyCollectionInfo">申请收款</el-button>
            <el-button type="primary" class="disable" v-if="detailsData.adviserStatus == 0 || detailsData.adviserStatus == 4">等待审核中</el-button>
        </p>
        <!--添加交付物内容框-->
        <el-dialog
            class="deliverables-dialog-model header-border-b"
            :visible.sync="deliverablesDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog('ruleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'交付物'" :fontSize="18"/></h4>
            <div>
                <el-form :model="deliverablesForm" :rules="rules" ref="ruleForm" label-width="100px" class="program-ruleForm">
                    <el-form-item label="文档名称" prop="name">
                        <el-input v-model="deliverablesForm.name" placeholder="请输入文档名称"></el-input>
                    </el-form-item>
                    <el-form-item label="文档描述" prop="introduction">
                        <el-input type="textarea" 
                                  v-model="deliverablesForm.introduction" 
                                  :autosize="{ minRows: 4, maxRows: 6}"
                                  placeholder="请输入您对项目的描述，字数在300字以内"
                                  maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="交付文档" prop="fid">
                        <el-upload
                            class="upload-demo"
                            :action="deliverablesActiionUrl"
                            :before-remove="beforeRemove"
                            :on-success="handleAvatarSuccess"
                            :show-file-list="false"
                        >
                            <span>{{deliverablesForm.sourceName}}</span>
                            <el-button type="primary" class="btn-w60">{{isUpload ? '重新上传':'上传'}}</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="solid">保存</el-button>
            </div>
        </el-dialog>
        <!--申请收款内容框-->
        <el-dialog
            class="deliverables-dialog-model header-border-b text-left"
            :visible.sync="applyMoneyDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog('applyRuleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'收款申请'" :fontSize="18"/></h4>
            <div>
                <el-form :model="applyMoneyForm" :rules="applyMoneyRules" 
                    ref="applyRuleForm" 
                    label-width="100px" 
                    class="program-ruleForm" 
                    label-position="left">
                    <el-form-item label="收款人" class="h30">
                        <span>{{applyMoneyInfoData.accountHolder}}</span>
                    </el-form-item>
                    <el-form-item label="收款额度">
                        <div class="price-item-cont">
                            <p>{{applyMoneyInfoData.price}} 元</p>
                            <p>（平台依据国家相关扣税要求进行审核）</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="收款账号" prop="payeeAccount" class="h30">
                        <el-input v-model="applyMoneyForm.payeeBank" placeholder="请输入收款账号"></el-input>
                    </el-form-item>
                    <el-form-item label="收款银行" prop="payeeBank" class="h30">
                        <el-input v-model="applyMoneyForm.payeeAccount" placeholder="请输入收款银行"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="address-slot-label">
                            麦盟寄收<br>地址
                        </div>
                        <span>广东省深圳市南山区粤海街道粤兴二道10号香港中文大学李伟波楼312室</span>
                    </el-form-item>
                    <el-form-item label="快递公司" prop="logisticsCompany" class="h30">
                        <el-input v-model="applyMoneyForm.logisticsCompany" placeholder="请输入快递公司"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号" prop="logisticsNumber" class="h30">
                        <el-input v-model="applyMoneyForm.logisticsNumber" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('applyRuleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="applyMoneysubmitForm('applyRuleForm')" class="solid">保存</el-button>
            </div>
        </el-dialog>
        <!--编辑阶段内容框-->
        <el-dialog
            class="deliverables-dialog-model header-border-b"
            :visible.sync="stageDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog('stageRuleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'阶段详情'" :fontSize="18"/></h4>
            <div>
                <el-form :model="stageForm" :rules="stagerules" ref="stageRuleForm" label-width="100px" class="program-ruleForm">
                    <el-form-item label="阶段名称" prop="stageName">
                        <el-input v-model="stageForm.stageName" placeholder="请输入方案名称"></el-input>
                    </el-form-item>
                    <el-form-item label="阶段描述" prop="stageDescription">
                        <el-input type="textarea" 
                                  v-model="stageForm.stageDescription" 
                                  :autosize="{ minRows: 4, maxRows: 4}"
                                  placeholder="请输入阶段描述，字数在300字以内"
                                  maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="交付标的" prop="deliverable">
                        <el-input type="textarea" 
                                  v-model="stageForm.deliverable" 
                                  placeholder="请输入交付标的，字数在300字以内"
                                  maxlength="300"
                                  :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                    </el-form-item>
                    <el-form-item label="阶段备注" prop="note">
                        <el-input type="textarea" 
                                  v-model="stageForm.note" 
                                  placeholder="请输入阶段备注，字数在300字以内"
                                  maxlength="300"
                                  :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                    </el-form-item>
                    <el-form-item label="起止日期" class="h30">
                        <el-col :span="11">
                            <el-form-item prop="startTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="stageForm.startTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line text-center" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="endTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="stageForm.endTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="付款占比" class="h30" prop="percentage">
                        <el-col :span="9">
                            <el-input v-model="stageForm.percentage" placeholder="请输入1-100的数字"/>
                        </el-col>
                        <el-col :span="1">
                            <span class="ml10">%</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="付款金额" prop="price" class="h30">
                        <div>{{newPrice}}<span class="ml10">元</span></div>
                    </el-form-item>
                    <el-form-item label="交付方式" prop="paymentMethod" class="h30">
                        <el-radio-group v-model="stageForm.paymentMethod" size="medium">
                            <el-radio label="0">线上</el-radio>
                            <el-radio label="1">线下</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('stageRuleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="stagesubmitForm('stageRuleForm')" class="solid">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import Vue from 'vue'
import '@/styles/element-variables.scss'
import { Button, Upload, Col, DatePicker } from 'element-ui'
import DTitle from '@/components/DTitle'
import { getAdvisertageDetail, submitDocument, changeStageStatus, 
applyMoneySubmit, applyMoneyInfo, getDemandDeatil, addOrEditStage, deleteDocumentList } from '@/serverApi/project'
import { filesUpload } from '@/serverApi/common'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Col)
Vue.use(DatePicker)

export default {
    components: {
        DTitle,
    },
    data() {
        let planUrlValidate = (rule, value, callback) => {
            if(!value){
                callback(new Error('请上传交付物文档')); 
            }else {
                callback();
            }
        };
        let logisticsCompanyChecked = (rule, value, callback) => {
            // console.log(value,this.applyMoneyForm,'传值')
            if(!value){
                callback(new Error('请上传方案书'));
            }else {
                callback();
            }
        };
        let endTimeValidate = (rule, value, callback) => {
            if(!value){
                callback();
            }else {
                if(Date.parse(this.stageForm.endTime)<=Date.parse(this.stageForm.startTime)){ 
                    callback(new Error('选择的时间期间不正确'))
                }else{
                    callback();
                }
            }
        };
        let validateNumber = (rule, value, callback) => {
            let numberReg =  /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入快递单号'));
            }else if(numberReg.test(value)) {
                callback(new Error('快递单号必须为数字值'));
            }else {
              callback();  
            }
        };
        let validatePercentage = (rule, value, callback) => {
            let numberReg =  /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入付款占比'));
            } else if(numberReg.test(value)) {
                callback(new Error('只能输入数字'));
            }else {
              callback();  
            }
        };
        return {
            title: '项目详情',
            deliverablesActiionUrl: filesUpload,
            detailsData: {},
            ProjectdetailsData: {},
            deliverablesDialogVisible: false,
            applyMoneyDialogVisible: false,
            onclickModal:false,
            applyMoneyInfoData: {

            },
            deliverablesForm: {
                name: '',
                introduction: '',
                // deliverableUrl: '',
                sourceName: '',
                fid: ''
            },
            applyMoneyForm: {
                payeeBank: '',
                payeeAccount: '',
                logisticsCompany: '',
                logisticsNumber: ''
            },
            fileList: [],
            isUpload: false,
            rules: {
                name: [
                    { required: true, message: '请输入文档名称' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符'}
                ],
                introduction: [
                    { required: true, message: '请输入文档描述内容' },
                ],
                fid: [
                    {required: true, validator: planUrlValidate }
                ]
            },
            applyMoneyRules: {
                logisticsCompany: [
                    { required: true, message: '请输入快递公司',validator: logisticsCompanyChecked}
                ],
                logisticsNumber: [
                    { required: true,validator: validateNumber }
                ],
            },
            stageDialogVisible: false,
            stageForm: {
                stageName: '',
                stageDescription: '',
                deliverable: '',
                note: '',
                startTime: '',
                endTime: '',
                percentage: null,
                paymentMethod: ''
            },
            stagerules: {
                stageName: [
                    { required: true, message: '请输入方案名称' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符'}
                ],
                programDescription: [
                    { required: true, message: '请输入项目描述内容' },
                ],
                deliverable: [
                    { required: true, message: '请输入职责描述内容' },
                ],
                note: [
                    { required: true, message: '请输入阶段备注内容' },
                ],
                startTime: [
                    { validator: endTimeValidate},
                ],
                endTime: [
                    { validator: endTimeValidate},
                ],
                percentage: [
                    { required: true, validator: validatePercentage },
                ],
                paymentMethod: [
                    { required: true, message: '请选择交付方式' },
                ],
            },
        }
    },
    created() {
        this.getAdvisertageDetailData()
        this.getProjectDetailsData()
    },
    methods: {
        // 阶段详情数据请求
        getAdvisertageDetailData() {
            getAdvisertageDetail({id: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data;
                    // console.log(this.detailsData,'this.detailsDatathis.detailsData')
                }
            })
        },
        // 项目详情请求
        getProjectDetailsData() {
            getDemandDeatil({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.ProjectdetailsData = response.data
                }
            })
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 上传成功时调用
        handleAvatarSuccess(res, file) {
                // this.deliverablesForm.deliverableUrl = URL.createObjectURL(file.raw);
            if(res.code == 200){
                // this.deliverablesForm.deliverableUrl = res.data.url;
                this.deliverablesForm.sourceName = file.name
                this.deliverablesForm.fid = res.data.fid
                this.isUpload = true
            }
            
        },
        // 关闭时回调
        closeDialog(formName) {
            this.$refs[formName].resetFields() 
            this.deliverablesForm.sourceName = ''
            this.deliverablesForm.fid = ''
            this.isUpload = false
            this.deliverablesForm = {};
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.deliverablesDialogVisible = false
            this.applyMoneyDialogVisible = false
            this.stageDialogVisible = false
        },
        // 交付物编辑
        EditInfo(data) {
            this.deliverablesDialogVisible = true;
            this.deliverablesForm = data;
            this.deliverablesForm = Object.assign({},this.deliverablesForm,{
                introduction:data.introduction.replace(/<br>/g, "\n")
            })
        },
        // 删除交付物
        deleteSubmit(id){
            MessageConfirm({
                 title: '删除交付物',
                 content: '确定删除交付该交付物吗？',
                 okText: '确定',
                 cancelText:'取消',
                 textAlign:'center'
            }).then(res => {
                let params = { pdid: id}
                // console.log(params,'43423423')
                deleteDocumentList(params).then(response => { 
                    if(response.code == 200) {
                        MessageAlert({title:'删除成功',content:'该交付物已经被删除',okText:'确定',textAlign:'center'}).then(res => {
                            this.getAdvisertageDetailData()
                        }).catch(err => {
                            this.getAdvisertageDetailData()
                        })
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 交付物新增、编辑提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let reg = new RegExp("\n", "g");
                    this.deliverablesForm.introduction = this.deliverablesForm.introduction ? this.deliverablesForm.introduction.replace(reg, "<br>"):'';
                    let params = this.deliverablesForm;
                    params = Object.assign({pid: this.$route.params.pid,type: 0, psid: this.detailsData.psid},params);
                    if(this.deliverablesForm.pdid) {
                       params = Object.assign({pdid:this.deliverablesForm.pdid},params);
                    }
                    submitDocument(params).then(response => {
                        if(response.code == 200){
                            this.$message.success('保存成功！')
                            this.getAdvisertageDetailData()
                            this.deliverablesDialogVisible = false
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 提交阶段交付操作
        onDeliverablesSubmit() {
             MessageConfirm({
                 title: '提交阶段交付',
                 content: '交付物提交后将不可修改，请确认是否提交？如有疑问请联系麦盟客服：<br/>0755-8695-9936',
                 okText: '提交阶段交付',
                 cancelText:'取消'
            }).then(res => {
                let params = { psid: this.detailsData.psid, type: 0}
                changeStageStatus(params).then(response => {
                    if(response.code == 200) {
                        MessageAlert({title:'提交成功',content:'请耐心等候平台与客户对方案进行反馈',okText:'确定',textAlign:'center'}).then(res => {
                            this.getAdvisertageDetailData()
                        }).catch(err => {
                            this.getAdvisertageDetailData()
                        })
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 获取收款信息数据请求
        applyCollectionInfo() { 
            applyMoneyInfo({psid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.applyMoneyInfoData = response.data
                    if(!response.data) return;
                    this.applyMoneyForm.payeeBank = this.applyMoneyInfoData.bankAccount
                    this.applyMoneyForm.payeeAccount = this.applyMoneyInfoData.account
                    this.applyMoneyDialogVisible = true
                }else{
                    this.$message.error(response.msg)
                }
            })
        },
        // 提交申请收款请求
        applyMoneysubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.applyMoneyForm;
                    params = Object.assign({
                        pid: this.$route.params.pid,
                        psid: this.detailsData.psid,
                        payee: this.applyMoneyInfoData.accountHolder,
                        realPrice: this.applyMoneyInfoData.price,
                    },params)
                    applyMoneySubmit(params).then(response => {
                        if(response.code == 200){
                            this.applyMoneyDialogVisible = false
                            MessageAlert({
                                title:'提交成功',
                                content:'您的收款申请已成功提交！平台将于48小时内对您的支付凭证进行核实并进行处理。如有疑问请联系麦盟客服：0755-8695-9936',
                                okText:'确定'
                            }).then(res => {
                                this.getAdvisertageDetailData()
                            }).catch(text => {
                                this.getAdvisertageDetailData()
                            })
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 编辑阶段操作
        onEditStage() {
            this.detailsData.paymentMethod = this.detailsData.paymentMethod.toString()
            this.setNewObj(this.stageForm, this.detailsData);
            this.stageForm.stageDescription = this.stageForm.stageDescription.replace(/<br>/g, "\n");
            this.stageForm.deliverable = this.stageForm.deliverable.replace(/<br>/g, "\n");
            this.stageForm.note = this.stageForm.note.replace(/<br>/g, "\n");

            // this.ruleForm = Object.assign({},this.ruleForm,{
            //     workDescription:this.workdata.workDescription.replace(/<br>/g, "\n")
            // })

            this.stageDialogVisible = true
        },
        // 遍历对象赋值
        setNewObj(newObj,oldObj) {
            Object.keys(newObj).forEach(key => {
                newObj[key] = oldObj[key]
            })
        },
        // 阶段编辑提交
        stagesubmitForm(formName) {
            this.$refs[formName].validate((valid) => {
                let reg = new RegExp("\n", "g");
                this.stageForm.stageDescription = this.stageForm.stageDescription ? this.stageForm.stageDescription.replace(reg, "<br>"):'';
                this.stageForm.deliverable = this.stageForm.deliverable ? this.stageForm.deliverable.replace(reg, "<br>"):'';
                this.stageForm.note = this.stageForm.note ? this.stageForm.note.replace(reg, "<br>"):'';
                if (valid) {
                    let params = Object.assign({pid: this.$route.params.pid,price: this.newPrice},this.stageForm);
                    if(this.detailsData && this.detailsData.ppid){
                        params = Object.assign({psid: this.detailsData.psid},params)
                    }
                    addOrEditStage(params).then(response => {
                        if(response.code == 200){
                            this.stageDialogVisible = false
                            this.getAdvisertageDetailData()
                            this.$message.success('编辑成功！')
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
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
        newPrice: function() {
            return ((this.stageForm.percentage / 100) || 0) * this.ProjectdetailsData.finalPrice;
        }
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
        margin-right: 32px;
        margin-bottom: 4px;
        .project-edit {
            font-size: 14px;
            color: #FF895F;
            i {
                font-size: 16px;
            }
            span {
                color: #FF895F;
            }
        }
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
    .add-text {
        span, i {
            color: #FF895F
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
        &.detail-cont-pbox {
            padding: 0;
        }
        .detail-title {
            padding: 20px 35px 20px 30px;
        }
        .detail-content {
            padding:0 30px 20px;
            .flex-end {
                display: none;
            }
            &:hover {
                background:rgba(248,248,248,1);
                .flex-end {
                    display: block;
                }
            }
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
            }
        }
        
        .flex-edit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .flex-end {
                padding-right: 10px;
                cursor:pointer;
                span {
                    color: #FF6536;
                }
                .edit {
                    padding-right: 10px;
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
    }
    .deliverables-dialog-model {
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
            padding: 20px 50px 25px 26px;
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
            padding-bottom: 20px;
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
        // .upload-demo {
        //     display: flex;
        //     justify-content: space-between;
        //     .el-upload--text {
        //         order: 1;
        //     }
        // }
        .upload-demo {
            width: max-content;
            height: 40px;
            display: flex;
            justify-content: space-between;
            .el-upload--text {
                order: 1;
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: max-content;
            }
        }
        .el-form-item {
            margin-bottom: 20px;
            &.h30 {
                height: 30px;
                text-align: left;
                input {
                    height: 30px;

                }
                .text-center {
                    text-align: center
                }
            }
            span {
                color: #999999;
            }
            .btn-w60 {
                span {
                    color: #fff;
                }
            }
            .price-item-cont {
                margin-top: 15px;
                p {
                    line-height: 20px;
                    color: #999999;
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
    }
    
    
}


</style>