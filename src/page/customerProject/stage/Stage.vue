<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'阶段列表'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div>
            <div class="stage-list-box" v-for="(itemData,i) of stageListData" :key="i">
                <router-link :to="{path: '/customerProject/stage/'+$route.params.pid+'/stageDetails/'+itemData.id}" >
                    <StageList :itemData="itemData"/>
                </router-link>
            </div>
            <!-- <div  class="stage-list-box">
                <DTitle :name="'修改意见'" :fontSize="18"/>
                <div class="flex-start mt20">
                    <label>修改意见</label>
                    <p class="flex-1">改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改改</p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>提出时间</label>
                        <span>2019.02.04</span>
                    </p>
                </div>
            </div> -->
        </div>
        <!-- <p class="status-btn mt20">
            <el-button class="btn-border mr60" @click="objectionDialogVisible=true">提出异议</el-button>
            <el-button type="primary" @click="onSubmitStage">确认阶段计划</el-button>
            <el-button type="primary" class="disable" v-if="projectDetailsData.status == 15">等待顾问修改中</el-button>
        </p> -->
        <p class="status-btn" v-if="projectDetailsData.status == 13 || projectDetailsData.status == 15">
            <el-button class="btn-border mr60" v-if="projectDetailsData.status == 13" @click="objectionDialogVisible=true">提出异议</el-button>
            <el-button type="primary" v-if="projectDetailsData.status == 13" @click="onSubmitStage">确认阶段计划</el-button>
            <el-button type="primary" class="disable" v-if="projectDetailsData.status == 15">等待顾问修改中</el-button>
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
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import StageList from './common/StageList'
import { getProjectDetail, getProjectStageList, customerNayStagePlan, customerConfirmStagePlan } from '@/serverApi/project'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'

export default {
    components: {
        DTitle,
        StageList
    },
    data() {
        return {
            title: '我的项目',
            stageListData: [],
            projectDetailsData: {},
            objectionDialogVisible: false,
            objectionValue: '',
            isContent: null,
            onclickModal:false
        }
    },
    created() {
        this.getStageListData()
        this.getProjectDetails()
    },
    methods: {
        // 阶段列表数据请求
        getStageListData() {
            getProjectStageList({pid: this.$route.params.pid,status:-1}).then(response => {
                if(response.code == 200) {
                    this.stageListData = response.data
                    this.isContent = this.stageListData && this.stageListData.length>0 ?true:false
                }
            })
        },
        // 项目详情请求
        getProjectDetails() {
            let params = {pid: this.$route.params.pid}
            getProjectDetail(params).then(response => {
                if(response.code==200) {
                    this.projectDetailsData = response.data;
                }
            })
        },
        // 整个阶段提出异议操作
        objectionSubmit() {
            let params = {pid: this.$route.params.pid, opinion: this.objectionValue}
            if(!this.objectionValue){
                this.$message.error('异议内容不能为空，请填写内容')
                return
            }
            customerNayStagePlan(params).then(response => {
                if(response.code == 200) {
                    this.objectionDialogVisible = false;
                    MessageAlert({title:'提交成功',content:'您已经成功提交阶段修改意见！请耐心等候顾问修改内容。',okText:'确定'}).then(res => {
                        this.getStageListData();
                        this.getProjectDetails();
                    }).catch(text => {
                        this.getStageListData();
                        this.getProjectDetails();
                    })
                }
            })
        },
        // 确认整个阶段计划请求
        onSubmitStage() {
            MessageConfirm({
                 title:'确认阶段计划',
                 content:'确认项目阶段计划后，平台将联系您完成合同线下签署！合同签署后，您可立即点击项目进行付款，启动项目！',
                 okText:'确定',
                 cancelText:'取消'
            }).then(res => {
                let params = { pid: this.$route.params.pid }
                customerConfirmStagePlan(params).then(response => {
                    if(response.code == 200) {
                         MessageAlert({
                             title:'确认成功',
                             content:'您已成功确认阶段计划！平台将在24小时内与您取得联系，完成合同签署。如有问题请联系麦盟客服：0755-8695-9936',
                             okText:'确定'
                        }).then(res => {
                            this.getStageListData()
                            this.getProjectDetails()
                        }).catch(err => {
                            this.getStageListData()
                            this.getProjectDetails()
                        })
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        }
    },
    computed: {
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
    }
}
</style>