<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'阶段列表'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p v-if="isAddProgram>6 || isAddProgram ==5">当前分类暂时为空，点击下方按钮添加项目阶段！</p>
            <p v-if="isAddProgram<7 && isAddProgram !=5" class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
            <el-button type="primary" @click="stageDialogVisible=true" v-if="isAddProgram>6 || isAddProgram ==5">添加阶段计划</el-button>
        </div>
        <div v-if="isContent == true">
            <div class="stage-list-box" v-for="(itemData,i) of stageData" :key="i">
                <router-link :to="{path: '/consultantProject/stage/'+$route.params.pid+'/stageDetails/'+itemData.id}" >
                    <StageList :itemData="itemData"/>
                </router-link>
            </div>
            <div class="add-text mt20" v-if="ProjectdetailsData.appStatus == 10" @click="stageDialogVisible=true">
                <a href="javascript:void(0);">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加阶段</span>
                </a>
            </div>
            <div  class="stage-list-box" v-if="proposalData && proposalData.length>0">
                <DTitle :name="'修改意见'" :fontSize="18"/>
                <div v-for="(proposalItem,key) in proposalData" :key="key">
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
        <p class="status-btn mt20" v-if="isContent == true && (ProjectdetailsData.appStatus == 10 || ProjectdetailsData.appStatus == 7)">
            <el-button type="primary" v-if="ProjectdetailsData.appStatus == 10" @click="onSubmitStage">提交阶段计划</el-button>
            <el-button type="primary" class="disable" v-if="ProjectdetailsData.appStatus == 7">等待审核中</el-button>
        </p>
        <!--添加、编辑阶段内容框-->
        <el-dialog
            class="stage-dialog-model header-border-b"
            :visible.sync="stageDialogVisible"
            @close="closeDialog('ruleForm')"
            :close-on-click-modal="onclickModal"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'阶段详情'" :fontSize="18"/></h4>
            <div>
                <el-form :model="stageForm" :rules="rules" ref="ruleForm" label-width="100px" class="program-ruleForm">
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
                    <el-form-item label="付款金额" class="h30">
                        <span>{{newPrice}}<span class="ml10">元</span></span>
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
                <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="solid">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { DatePicker, Col } from 'element-ui'
import DTitle from '@/components/DTitle'
import StageList from './common/StageList'
import { getAdviserProjectStageListUrl, getAdviserStageProposalList, 
getDemandDeatil, addOrEditStage, changeStageStatus } from '@/serverApi/project'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(DatePicker)
Vue.use(Col)

export default {
    components: {
        DTitle,
        StageList
    },
    data() {
        let endTimeValidate = (rule, value, callback) => {
            if(!value){
                callback();
            }else {
                if(Date.parse(this.stageForm.endTime)<Date.parse(this.stageForm.startTime)){
                    callback(new Error('选择的时间期间不正确'))
                }else{
                    callback();
                }
            }
        };
        var percentageValidate = (rule, value, callback) => {
            let numberReg = /[^0-9]/g;
            if(!value) {
                callback(new Error('请输入付款占比'));
            } else if(numberReg.test(value) || (value < 0 || value > 100)) {
                callback(new Error('只能输入0-100之间的数字数字'));
            }else {
              callback();  
            }
        };
        return {
            title: '我的项目',
            stageData: [],
            proposalData: [],
            ProjectdetailsData: {},
            isAddProgram: 0,
            stageDialogVisible: false,
            isContent: null,
            onclickModal:false,
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
            rules: {
                stageName: [
                    { required: true, message: '请输入方案名称' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符'}
                ],
                programDescription: [
                    { required: true, message: '请输入项目描述内容' },
                ],
                stageDescription:[
                     { required: true, message: '请输入阶段描述内容' },
                ],
                deliverable: [
                    { required: true, message: '请输入职责描述内容' },
                ],
                // note: [
                //     { required: true, message: '请输入阶段备注内容' },
                // ],
                startTime: [
                    { validator: endTimeValidate},
                ],
                endTime: [
                    { validator: endTimeValidate},
                ],
                percentage: [
                    { required: true, validator:percentageValidate },
                ],
                paymentMethod: [
                    { required: true, message: '请选择交付方式' },
                ],
            },
        }
    },
    created() {
        this.getProjectDetailsData()
        this.getStageListData()
        this.getStageProposalListData()
    },
    methods: {
        // 阶段列表数据请求
        getStageListData() {
            let params = {pid: this.$route.params.pid, status: 1}
            getAdviserProjectStageListUrl(params).then(response => {
                if(response.code == 200) {
                    this.stageData = response.data
                    this.isContent = response.data && response.data.length>0 ? true:false
                }
            })
        },
        // 项目详情请求
        getProjectDetailsData() {
            getDemandDeatil({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.ProjectdetailsData = response.data
                    this.isAddProgram = this.ProjectdetailsData ? this.ProjectdetailsData.appStatus : 0
                    // console.log(this.ProjectdetailsData, 'ProjectdetailsData=======')
                }
            })
        },
        // 阶段异议数据请求
        getStageProposalListData() {
            getAdviserStageProposalList({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200) {
                    this.proposalData = response.data
                }
            })
        },
        // 关闭时回调
        closeDialog(formName) {
            this.$refs[formName].resetFields();
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.stageDialogVisible = false
        },
        // 阶段新增、编辑提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let reg = new RegExp("\n", "g");
                    this.stageForm.stageDescription = this.stageForm.stageDescription ? this.stageForm.stageDescription.replace(reg, "<br>"):'';
                    this.stageForm.deliverable = this.stageForm.deliverable ? this.stageForm.deliverable.replace(reg, "<br>"):'';
                    this.stageForm.note = this.stageForm.note ? this.stageForm.note.replace(reg, "<br>"):'';
                    let params = {
                        pid: this.$route.params.pid,
                        ...this.stageForm,
                        price: this.newPrice
                    };
                    if(this.detailsData && this.detailsData.ppid){
                        params = Object.assign({psid: this.detailsData.psid},params)
                    }

                    addOrEditStage(params).then(response => {
                        if(response.code == 200){
                            this.stageDialogVisible = false;
                            this.getStageListData()
                            this.$message.success('保存成功！')
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 阶段提交操作
        onSubmitStage() {
            MessageConfirm({
                 title:'提交阶段计划',
                 content:'阶段计划提交后将不可修改，请确认是否提交？如有疑问请联系麦盟客服：<br/>0755-8695-9936',
                 okText:'提交阶段计划',
                 cancelText:'取消'
            }).then(res => {
                let params = {pid: this.$route.params.pid, type: 1}
                changeStageStatus(params).then(response => {
                    if(response.code == 200) {
                         MessageAlert({title:'提交成功',content:'请耐心等候客户对方案进行反馈！',okText:'确定',textAlign: 'center'}).then(res => {
                            this.getProjectDetailsData()
                            this.getStageListData()
                            this.getStageProposalListData()
                        }).catch(text =>{
                            this.getProjectDetailsData()
                            this.getStageListData()
                            this.getStageProposalListData()
                        })
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        }
    },
    computed: {
        newPrice: function() {
            return ((this.stageForm.percentage / 100) || 0) * this.ProjectdetailsData.finalPrice;
        }
    }
}
</script>

<style lang='scss' scope>
.stage-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .stage-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    .stage-list-box {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }

    }
    .add-text {
        span, i {
            color: #FF895F
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
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
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
    .stage-dialog-model {
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
        .el-form-item__error {
            margin-top: 0;
        }
        .el-dialog__body {
            padding: 20px 60px 10px 26px;
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
        }
    }
}
</style>