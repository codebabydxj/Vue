<template>
    <div class="cont-box-card project-detail-cont">
        <div class="detail-cont-box border-b-1">
            <div class="flex-row">
                <DTitle :name="'项目详情'" :fontSize="18"/>
                <router-link  :to="'/publishProject/'+this.id">
                    <a class="project-edit" href="javascript:void(0);" v-if="projectDetailsData.status == 0 || projectDetailsData.status ==7" >
                        <i class="el-icon-edit"></i>
                        <span>编辑</span>
                    </a>
                </router-link>
                
            </div>
            <div class="flex-row project-name mt20">
                <h4>{{projectDetailsData.projectName || '未命名项目'}}</h4>
                <span class="project-status" v-if="projectDetailsData.status ==1||projectDetailsData.status ==2||
                         projectDetailsData.status ==3||projectDetailsData.status ==6 ||
                         projectDetailsData.status ==7||projectDetailsData.status ==11|| 
                         projectDetailsData.status ==12|| projectDetailsData.status ==13 ||
                         projectDetailsData.status ==14 || projectDetailsData.status ==15">未开始</span>
                <span class="project-status orange" v-if="projectDetailsData.status ==4">进行中</span>
                <span class="project-status gray" v-if="projectDetailsData.status ==5 || projectDetailsData.status ==8||
                        projectDetailsData.status ==9 || projectDetailsData.status ==10">已完成</span>
                <span class="project-status" v-if="projectDetailsData.status ==0">草稿箱</span>
            </div>
            <div class="flex-start mt20">
                <p class="w192">
                    <label>项目周期</label>
                    <span v-if="projectDetailsData.projectLengthType==0">0-3个月</span>
                    <span v-if="projectDetailsData.projectLengthType==1">3-6个月</span>
                    <span v-if="projectDetailsData.projectLengthType==2">6-12个月</span>
                    <span v-if="projectDetailsData.projectLengthType==3">其他时间</span>
                </p>
                <p class="pl37">
                    <label>发布时间</label>
                    <span v-if="projectDetailsData.releaseTime">{{projectDetailsData.releaseTime | moment}}</span>
                    <span v-if="!projectDetailsData.releaseTime">未发布</span>
                </p>
            </div>
            <div class="flex-start mt20 ">
                <p class="w192 pr10">
                    <label>项目地点</label>
                    <span>{{projectDetailsData.province}} . {{projectDetailsData.city}}</span>
                </p>
                <p class="pl26">
                    <label>开始时间</label>
                    <span v-if="projectDetailsData.startTimeType==0">越快越好</span>
                    <span v-if="projectDetailsData.startTimeType==1">{{projectDetailsData.startTime | moment}}</span>
                    <span v-if="projectDetailsData.startTimeType==2">待商议</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <label>项目描述</label>
                <p class="flex-1" v-html="projectDetailsData.description"></p>
            </div>
            <div class="flex-start mt20">
                <label>交付标的</label>
                <p class="flex-1" v-html="projectDetailsData.target"></p>
            </div>
            <div class="flex-start mt20">
                <label>预算方式</label>
                <span v-if="projectDetailsData.budgetType == 0">每日费用</span>
                <span v-if="projectDetailsData.budgetType == 1">固定单价</span>
                <span v-if="projectDetailsData.budgetType == 2">待商议</span>
            </div>
            <div class="flex-start mt20">
                <label>预算总价</label>
                <span v-if="projectDetailsData.budgetType == 0 || projectDetailsData.budgetType == 1">{{projectDetailsData.budget}} 元</span>
                <span v-if="projectDetailsData.budgetType == 2">待商议</span>
            </div>
        </div>
        <div class="detail-cont-box border-b-1">
            <div class="flex-row">
                <DTitle :name="'顾问需求'" :fontSize="18"/>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>是否驻场</label>
                    <span v-if="projectDetailsData.deliverMethod ==0">驻场</span>
                    <span v-if="projectDetailsData.deliverMethod ==1">非驻场</span>
                    <span v-if="projectDetailsData.deliverMethod ==2">待商议</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>资质要求</label>
                    <span v-if="projectDetailsData.qualification ==3">初级</span>
                    <span v-if="projectDetailsData.qualification ==2">中级</span>
                    <span v-if="projectDetailsData.qualification ==1">高级</span>
                    <span v-if="projectDetailsData.qualification ==0">专家</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>所在行业</label>
                    <p class="tags flex-1" v-if="projectDetailsData.pIndustry && projectDetailsData.pIndustry.length>0">
                        <span v-for="(industryItem,i) in projectDetailsData.pIndustry" :key="i">{{industryItem.industryName}}</span>
                    </p>
                </div>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>专业技能</label>
                    <p class="tags flex-1 skills" v-if="projectDetailsData.pSkill && projectDetailsData.pSkill.length>0">
                        <span v-for="(skillItem,i) in projectDetailsData.pSkill" :key="i">{{skillItem.skillName}}</span>
                    </p>
                </div>
            </div>
            <div class="flex-start mt20">
                <div class="flex-start">
                    <label>语言要求</label>
                    <p v-if="projectDetailsData.planguage && projectDetailsData.planguage.length>0">
                        <span class="mr20" v-for="(languageItem,i) in projectDetailsData.planguage" :key="i">{{languageItem.language}} -
                            <span v-if="languageItem.grade == 0">母语</span>
                            <span v-if="languageItem.grade == 1">精通</span>
                            <span v-if="languageItem.grade == 2">熟练</span>
                            <span v-if="languageItem.grade == 3">一般</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="detail-cont-box">
            <div class="flex-row">
                <DTitle :name="'负责人信息'" :fontSize="18"/>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>公司</label>
                    <span>{{projectDetailsData.companyName}}</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>对接人</label>
                    <span>{{projectDetailsData.principalName}}</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>职务</label>
                    <span>{{projectDetailsData.principalPosition}}</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>电话号码</label>
                    <span>{{projectDetailsData.principalPhone}}</span>
                </p>
            </div>
            <div class="flex-start mt20">
                <p>
                    <label>工作邮箱</label>
                    <span>{{projectDetailsData.principalEmail}}</span>
                </p>
            </div>
            <p class="mt20 text-left">（该内容仅平台可见）</p>
        </div>
        <div class="status-btn mt20" v-if="projectDetailsData.status == 0 || projectDetailsData.status ==7 || projectDetailsData.status ==5 || projectDetailsData.status == 1">
            <el-button type="primary" v-if="projectDetailsData.status == 0 || projectDetailsData.status ==7" @click="applyRelease(projectDetailsData.pid)">申请发布</el-button>
            <el-button type="primary" v-if="projectDetailsData.status ==5" @click="evaluationDialogVisible=true">评价</el-button>
            <el-button type="primary" class="disable" v-if="projectDetailsData.status == 1">等待审核中</el-button>
        </div>
        <!--发布成功提示框-->
        <el-dialog
            class="dialog-model release-project-model"
            :visible.sync="releaseDialogVisible"
            :close-on-click-modal="onclickModal"
            width="400px"
            center>
            <h4 slot="title" class="dialog-title">发布成功</h4>
            <span class="dialog-cont">您已成功发布项目！我们将尽快对项目进行审核，审核结果将会以邮件和短信的形式通知您。</span>
            <span slot="footer" class="dialog-footer">
                <router-link :to="{path: '/personalCenter/myProject'}">
                    <el-button @click="releaseDialogVisible = false" class="border mr60">前往项目列表</el-button>
                </router-link>
                <router-link :to="{path: '/home'}">
                    <el-button type="primary" @click="releaseDialogVisible = false" class="solid">返回首页</el-button>
                </router-link>
            </span>
        </el-dialog>
        <!--评价内容框-->
        <el-dialog
            class="dialog-model header-border-b"
            :visible.sync="evaluationDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="releaseData(1)"
            width="600px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'项目评价'" :fontSize="18"/></h4>
            <div>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    placeholder="请输入项目评价，字数在300字以内"
                    maxlength="300"
                    v-model.trim="textareaValue">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="evaluationDialogVisible = false" class="border mr60">取消</el-button>
                <el-button type="primary" @click="evaluationSubmit" class="solid">提交</el-button>
            </div>
        </el-dialog>
        <!--项目评价成功提示框-->
        <el-dialog
            class="dialog-model"
            :visible.sync="tipDialogVisible"
            :close-on-click-modal="onclickModal"
            @close="releaseData(2)"
            width="400px"
            center>
            <h4 slot="title" class="dialog-title">项目评价</h4>
            <span class="dialog-cont">感谢您对评价，平台将根据您所评价的内容，来完善平台目前的不足之处。</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="releaseData(2)" class="solid">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'
import '@/styles/element-variables.scss'
import { getProjectDetail, releaseProject, projectEvaluate } from '@/serverApi/project'
import DTitle from '@/components/DTitle'
import { Button } from 'element-ui'
Vue.use(Button)

export default {
    components: {
        DTitle
    },
    data() {
        return {
            title: '项目详情',
            projectDetailsData: {},
            releaseDialogVisible: false,
            evaluationDialogVisible: false,
            tipDialogVisible: false,
            textareaValue: '',
            id:'',
            onclickModal:false
        }
    },
    created() {
        this.getProjectDetails()
        // console.log(this.$store.state.user, '------------');
        this.id = this.$route.params.pid
    },
    methods: {
        // 项目详情请求
        getProjectDetails() {
            let params = {pid: this.$route.params.pid}
            getProjectDetail(params).then(response => {
                if(response.code==200) {
                    this.projectDetailsData = response.data;
                }
            })
        },
        // 项目申请发布
        applyRelease(pid) {
            /** 第一步校验 */
            if (!this.projectDetailsData['companyName'] || !this.projectDetailsData['principalName'] || 
            !this.projectDetailsData['principalPhone'] || !this.projectDetailsData['principalEmail']) {
                this.$message.error('项目信息还不完整，请前往编辑')
                return
            }
            /** 第二步校验 */
            if (!this.projectDetailsData['projectName'] || !this.projectDetailsData['description']) {
                this.$message.error('项目信息还不完整，请前往编辑')
                return
            }
            /** 第三步校验 */
            if ((!this.projectDetailsData['startTimeType'] && this.projectDetailsData['startTimeType'] != 0) || 
            (!this.projectDetailsData['deliverMethod'] && this.projectDetailsData['deliverMethod'] != 0) || 
            (!this.projectDetailsData['province']) || (!this.projectDetailsData['budgetType'] && this.projectDetailsData['budgetType'] != 0)) {
                this.$message.error('项目信息还不完整，请前往编辑')
                return
            }
            releaseProject({pid:pid}).then(response => {
                if(response.code == 200) {
                    this.releaseDialogVisible = true;
                }
            })
        },
        // 项目评价处理 
        evaluationSubmit() {
            let userType = this.userObj.type;
            let params = {pid: this.$route.params.pid,evaluation:this.textareaValue}
            if(!this.textareaValue){
                this.$message.error('评价内容不能为空，请填写内容')
                return
            }
            projectEvaluate(userType,params).then(response => {
                if(response.code == 200) {
                    this.evaluationDialogVisible = false;
                    this.tipDialogVisible = true;
                }
            })
        },
        // 确定、关闭操作
        releaseData(value) {
            if(value==2){
                this.tipDialogVisible = false
                this.getProjectDetails()
            }
            this.textareaValue = ''
        }
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
                font-weight: 600;
            }
            .project-status {
                display: inline-block;
                width: 100px;
                height: 24px;
                line-height: 24px;
                border-radius:15px;
                background:#FF705F;
                color: #FFFFFF;
                margin-right: 35px;
                &.orange {
                    background: #FF895F;
                }
                &.gray {
                    background: #D9D9D9;
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
    .pr10 {
        padding-right: 10px;
    }
    .pl37 {
        padding-left:37px;
    }
    .pl26 {
        padding-left:26px;
    }
    .border-b-1 {
        border-bottom: 1px solid #E0E0E0;
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
        &.release-project-model {
            .el-dialog__body {
                padding-bottom: 20px;
            }
            .el-dialog__footer {
                padding-top: 0;
                padding-bottom: 40px;
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
    }
}

</style>