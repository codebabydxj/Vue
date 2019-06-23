<template>
    <div class="cont-box-card project-detail-cont">
        <div class="detail-cont-box border-b-1">
            <div class="flex-row">
                <DTitle :name="'项目详情'" :fontSize="18"/>
            </div>
            <div class="flex-row project-name mt20">
                <h4>{{detailsData.projectName}}</h4>
                <span class="project-status" v-if="detailsData.appStatus == 0">申请中</span>
                <span class="project-status" v-if="detailsData.appStatus == 1">待面试</span>
                <span class="project-status" v-if="detailsData.appStatus == 2">已推荐</span>
                <span class="project-status gray" v-if="detailsData.appStatus == 3">未采用</span>
                <span class="project-status" v-if="detailsData.appStatus == 4">方案待提交</span>
                <span class="project-status" v-if="detailsData.appStatus == 5">已聘用</span>
                <span class="project-status" v-if="detailsData.appStatus == 6">方案待确认</span>
                <span class="project-status" v-if="detailsData.appStatus == 7">阶段待确认</span>
                <span class="project-status orange" v-if="detailsData.appStatus == 8">进行中</span>
                <span class="project-status gray" v-if="detailsData.appStatus == 9 || detailsData.appStatus == 11">已完成</span>
                <span class="project-status" v-if="detailsData.appStatus == 10">阶段待提交</span>
            </div>
            <div class="flex-start mt20">
                <p class="w192">
                    <label>项目周期</label>
                    <span v-if="detailsData.projectLengthType==0">0-3个月</span>
                    <span v-if="detailsData.projectLengthType==1">3-6个月</span>
                    <span v-if="detailsData.projectLengthType==2">6-12个月</span>
                    <span v-if="detailsData.projectLengthType==3">其他时间</span>
                </p>
                <p>
                    <label>发布时间</label>
                    <span>{{detailsData.releaseTime | moment}}</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p class="w192">
                    <label>项目地点</label>
                    <span>{{detailsData.province}} {{detailsData.city}}</span>
                </p>
                <p>
                    <label>开始时间</label>
                    <span v-if="detailsData.startTimeType==0">越快越好</span>
                    <span v-if="detailsData.startTimeType==1">{{detailsData.startTime | moment}}</span>
                    <span v-if="detailsData.startTimeType==2">待商议</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <label>项目描述</label>
                <p class="flex-1" v-html="detailsData.description"></p>
            </div>
            <div class="flex-start mt20">
                <label>交付标的</label>
                <p class="flex-1" v-html="detailsData.target"></p>
            </div>
            <div class="flex-start mt20">
                <label>预算方式</label>
                <span v-if="detailsData.budgetType == 0">每日费用</span>
                <span v-if="detailsData.budgetType == 1">固定单价</span>
                <span v-if="detailsData.budgetType == 2">待商议</span>
            </div>
            <div class="flex-start mt20">
                <label>预算总价</label>
                <span v-if="detailsData.budgetType == 0 || detailsData.budgetType == 1">{{detailsData.budget}} 元</span>
                <span v-if="detailsData.budgetType == 2">待商议</span>
            </div>
        </div>
        <div class="detail-cont-box">
            <div class="flex-row">
                <DTitle :name="'顾问需求'" :fontSize="18"/>
            </div>
            <div class="flex-start mt20">
                <label>是否驻场</label>
                <span v-if="detailsData.deliverMethod ==0">驻场</span>
                <span v-if="detailsData.deliverMethod ==1">非驻场</span>
                <span v-if="detailsData.deliverMethod ==2">待商议</span>
            </div>
            <div class="flex-start mt20">
                <label>资质要求</label>
                <span v-if="detailsData.qualification ==0">初级</span>
                <span v-if="detailsData.qualification ==1">中级</span>
                <span v-if="detailsData.qualification ==2">高级</span>
                <span v-if="detailsData.qualification ==3">专家</span>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>所在行业</label>
                     <p class="tags flex-1" v-if="detailsData.pIndustry && detailsData.pIndustry.length>0">
                        <span v-for="(industryItem,i) in detailsData.pIndustry" :key="i">{{industryItem.industryName}}</span>
                    </p>
                </div>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>专业技能</label>
                    <p class="tags flex-1 skills" v-if="detailsData.pSkill && detailsData.pSkill.length>0">
                        <span v-for="(skillItem,i) in detailsData.pSkill" :key="i">{{skillItem.skillName}}</span>
                    </p>
                </div>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>语言要求</label>
                    <p v-if="detailsData.planguage && detailsData.planguage.length>0">
                        <span class="mr20" v-for="(languageItem,i) in detailsData.planguage" :key="i">{{languageItem.language}} -
                            <span v-if="languageItem.grade == 0">母语</span>
                            <span v-if="languageItem.grade == 1">精通</span>
                            <span v-if="languageItem.grade == 2">熟练</span>
                            <span v-if="languageItem.grade == 3">一般</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="status-btn mt20" v-if="!detailsData.appStatus && detailsData.appStatus != 0">
            <el-button type="primary" v-if="!detailsData.appStatus && detailsData.appStatus != 0" @click="dialogVisible=true">立即申请</el-button>
        </div>
        <!--申请项目内容框-->
        <el-dialog
            class="program-dialog-model header-border-b"
            :visible.sync="dialogVisible"
            :close-on-click-modal="onclickModal"
            @close="closeDialog('ruleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'方案计划书'" :fontSize="18"/></h4>
            <div>
                <el-form :model="applyProjectFrom" :rules="applyProjectRules" ref="ruleForm" label-width="100px" class="program-ruleForm">
                    <el-form-item label="胜任描述" prop="introduction">
                        <el-input type="textarea" 
                                v-model="applyProjectFrom.introduction" 
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入您对项目的胜任描述，字数在300字以内"
                                maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="项目规划" prop="proposal">
                        <el-input type="textarea" 
                                v-model="applyProjectFrom.proposal" 
                                placeholder="请输入您对项目的初步规划，字数在300字以内"
                                maxlength="300"
                                :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </el-form-item>
                </el-form>
                <el-checkbox v-model="checked" class="checkbox-from">平台将收取项目费用的20%作为平台服务费用，请知晓。</el-checkbox>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="solid" :disabled="!checked">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Checkbox } from 'element-ui';
import DTitle from '@/components/DTitle'
import { getDemandDeatil, projectEvaluate, submitApplication } from '@/serverApi/project'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Checkbox);

export default {
    components: {
        DTitle
    },
    data() {
        return {
            title: '项目详情',
            detailsData: {},
            textareaValue: '',
            dialogVisible: false,
            checked: true,
            onclickModal:false,
            applyProjectFrom: {
                introduction: '',
                proposal: ''
            },
            applyProjectRules: {
                introduction: [
                    { required: true, message: '请输入胜任描述' },
                ],
                proposal: [
                    { required: true, message: '请输入项目规划' },
                ]
            },
        }
    },
    created() {
        this.getProjectDetailsData()
    },
    methods: {
        // 项目详情请求
        getProjectDetailsData() {
            getDemandDeatil({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.detailsData = response.data
                }
            })
        },
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible=false
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        //提交提交支付凭证
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.applyProjectFrom;
                    params = Object.assign({pid: this.$route.params.pid},params)
                    submitApplication(params).then(response => {
                        if(response.code == 200){
                            this.dialogVisible = false
                            MessageConfirm({
                                title:'申请成功',
                                content:'您的新项目已成功发布并邀请意向顾问！我们将尽快对项目进行审核，审核结果将会以邮件和短信的形式通知您。',
                                okText:'继续申请项目',
                                cancelText:'前往项目列表'
                            }).then(res => {
                                this.$router.push({path:'/rojectMarket'})
                            }).catch(text => {
                                this.$router.push({path:'/personalCenter/myProject'})
                            })
                        }
                    })
                   
                } else {
                    return false;
                }
            });
        },
    },
    computed: {
        ...mapGetters(['userObj']),
    }
}
</script>

<style lang='scss'>
.project-detail-cont {
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
    .detail-cont-box {
        padding: 20px 30px;
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
        .project-name {
            h4 {
                line-height: 22px;
                font-size: 16px;
                color: #404040;
            }
            .project-status {
                display: inline-block;
                width: 100px;
                height: 24px;
                line-height: 24px;
                border-radius:15px;
                background-color:#FF705F;
                color: #FFFFFF;
                font-size: 14px;
                &.orange {
                    background-color:#FF895F;
                }
                &.gray {
                    background-color: #D9D9D9;
                }
            }
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
            
        }
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
    .border-b-1 {
        border-bottom: 1px solid #E0E0E0;
    }
    .program-dialog-model {
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
                line-height: 30px;
                border-radius: 4px;
                padding: 0;
                &.border {
                    border:1px solid rgba(255,101,54,1);
                    span {
                        color: #FF6536;
                        margin-top: 0;
                    }
                }
                &.solid {
                    span {
                        color: #fff;
                        margin-top: 0;
                    }
                }
            }
            .el-button + .el-button {
                margin-left: 0;
            }
        }
        .checkbox-from {
            display: flex;
            margin-left: 30px;
            margin-top: -6px;
            align-items: center;
            span {
                color: #666666;
            }
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #999999;
            border-color: #999999;
        }
        .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #999999;
        }
    }
    .tags {
        span {
            color: #FFA75F;
            padding: 0 15px;
            border-right: 1px solid #E0E0E0;
            &:first-child {
                padding-left: 0;
            }
            &:last-child {
                border-right: none;
            }
        }
        &.skills {
            span{
                color: #FF895F;
            }
        }

    }
}

</style>