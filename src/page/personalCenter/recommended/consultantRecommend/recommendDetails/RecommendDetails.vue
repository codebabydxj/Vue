<template>
    <div class="project-cont">
        <el-tabs v-model="editableTabsValue" @tab-click="onTabClick">
            <el-tab-pane
                :key="item.name"
                v-for="item in tableTabs"
                :label="item.title"
                :name="item.name"
            >
                <div class="list-cont">
                    <ConsultantInfo :item="item" v-if="item.name == '1'" :detailsData="detailsData" :applicationData="applicationData"/>
                    <ConsultantApply :item="item" v-else :applicationData="applicationData" :detailsData="detailsData"/>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="status-btn mt20" v-if="applicationData.status==0 || applicationData.status==1 || applicationData.status==2">
            <el-button type="primary" v-if="applicationData.status==0 || applicationData.status==2" @click="onConfirm(1)">面试该顾问</el-button>
            <el-button type="primary" v-if="applicationData.status==1" @click="onConfirm(4)">确认方案候选人</el-button>
        </div>
        <!--model弹出框-->
        <el-dialog
            class="dialog-model"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="onclickModal"
            width="400px"
            center>
            <h4 slot="title" class="dialog-title">{{dialogModel.title}}</h4>
            <span class="dialog-cont">{{dialogModel.content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" class="border mr60" v-if="dialogModel.type == 'confirm'">{{dialogModel.cancelText || '取消'}}</el-button>
                <el-button type="primary" @click="onBtnSubmit" class="solid">{{dialogModel.okText || '确定'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { Tabs, TabPane } from 'element-ui'
import { getAdviserDetail, getApplicationDeatil, changeApplicationStatus } from '@/serverApi/project'
import ConsultantInfo from './ConsultantInfo'
import ConsultantApply from './ConsultantApply'

Vue.use(Tabs)
Vue.use(TabPane)

export default {
    components: {
        ConsultantInfo,
        ConsultantApply
    },
    data() {
        return {
            title: '我的项目',
            editableTabsValue: '1',
            detailsData: {},
            applicationData: {},
            centerDialogVisible: false,
            onclickModal:false,
            confirmType: null,
            tableTabs: [{title: '顾问详情',name: '1',}, {title: '项目申请',name: '2'}],
            dialogModel: {
                title: '',
                content: '',
                type: '',  //提示框：prompt，确认框：confirm
                okText: '',
                cancelText: ''
            }
        }
    },
    created() {
        this.getDetails()
        this.getApplication()
    },
    methods: {
        onTabClick(tab, event) {
            // 根据状态请求数据
            if(tab.name == 1){
                this.listData = [1,2]
            }else if(tab.name ==2) {
                this.listData = [1]
            }
        },
        // 顾问详情数据请求
        getDetails() {
            getAdviserDetail({uid:this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data
                }
            })
        },
        // 顾问申请数据请求
        getApplication() {
            let params = {uid: this.$route.params.id, pid:this.$route.params.pid}
            getApplicationDeatil(params).then(response => {
                if(response.code == 200) {
                    this.applicationData = response.data
                }
            })
        },
        // 面试及确认顾问弹出框调用
        onConfirm(type) {
            if(type == 1){
                this.dialogModel.title = '邀请面试'
                this.dialogModel.content = '您确定邀请该顾问进行三方面试吗？邀请成功后平台将于24小时内与您取得联系'
            }else {
                this.dialogModel.title = '选为方案候选人'
                this.dialogModel.content = '您确定将该顾问选为方案候选人吗？选择成功后平台将通知该顾问提交方案计划书'
            }
            this.dialogModel.type = 'confirm'
            this.confirmType = type
            this.centerDialogVisible = true
        },
        // 弹出框确定事件
        onBtnSubmit() {
            if(this.dialogModel.type === 'prompt'){
                this.getDetails()   //更新内容
                this.getApplication()//重新请求刷新页面
                this.centerDialogVisible = false;
                return;
            }
            let params = {paid: this.applicationData.paid, status: this.confirmType}
            changeApplicationStatus(params).then(response => {
                if(response.code == 200) {
                    if(this.confirmType == 1){
                        this.dialogModel.title = '邀请成功'
                        this.dialogModel.content = '已经成功发起面试邀请，等待面试后你可以选择该顾问为方案候选人，邀请顾问提交方案计划'
                    }else {
                        this.dialogModel.title = '提交成功'
                        this.dialogModel.content = '您已选择该顾问为方案候选人！请耐心等待顾问提交方案计划，您可以在“个人中心-我的项目-项目详情”中查看方案列表'
                    }
                    this.dialogModel.type = 'prompt'
                }
            })
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.project-cont {
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:3px;
    .el-tabs {
        .el-tabs__header {
            margin-bottom: 0;
            height: 44px;
            line-height: 44px;
        }
        .el-tabs__nav-scroll {
            padding: 0 5px;
            .el-tabs__active-bar {
                display: none;
            }
            .el-tabs__item {
                padding: 0 15px;
                &.is-active {
                    color: #FF6536;
                    border-bottom: 2px solid #FF6536;
                }
                &:hover{
                    color: #FF6536;
                }
            }
        }
        .el-tabs__nav-wrap::after {
            height: 1px;
            background-color: rgba(224,224,224,1);
        }
        .el-tab-pane {
            font-size: 14px;
            color: #666666;
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