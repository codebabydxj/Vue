<template>
    <div class="program-cont">
        <div class="program-title mt20">
            <DTitle :name="'方案详情'" :fontSize="18"/>
        </div>
        <div>
            <div class="detail-cont-box">
                <div class="flex-row project-name">
                    <h4>{{detailsData.programName}}</h4>
                    <span class="project-status" v-if="detailsData.status == 0">待查看</span>
                    <span class="project-status" v-if="detailsData.status == 1">待确认</span>
                    <span class="project-status" v-if="detailsData.status == 2">已确认</span>
                    <span class="project-status gray" v-if="detailsData.status == 3">未采用</span>
                    <span class="project-status" v-if="detailsData.status == 4 || detailsData.status == 5">有异议</span>
                </div>
                <div class="head-portrait flex-start mt20">
                    <img :src="detailsData.avatar"/>
                    <span>{{detailsData.nickName}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>方案描述</label>
                    <p class="flex-1" v-html="detailsData.programDescription"></p>
                </div>
                <div class="flex-start mt20">
                    <label>项目规划<br>与交付物</label>
                    <p class="flex-1" v-html="detailsData.deliverable"></p>
                </div>
                <div class="flex-start mt20">
                    <label>项目总价</label>
                    <span>{{detailsData.price | ExtenSion}} 元</span>
                        
                </div>
                <div class="flex-start mt20">
                    <label>项目周期</label>
                    <span>{{detailsData.workload}}
                        <span v-if="detailsData.workloadUnit == 0">天</span>
                        <span v-if="detailsData.workloadUnit == 1">个月</span>
                        <span v-if="detailsData.workloadUnit == 2">年</span>
                    </span>
                </div>
                <div class="flex-start mt20" v-if="detailsData.planUrl">
                    <div class="flex-items-center flex-1">
                        <label>计划书</label>
                        <span>{{detailsData.planName}}</span>
                        <p class="flex-1 text-right"><el-button class="btn-w60" type="primary" :url="detailsData.planUrl" @click="onDownUrl(detailsData.planUrl)">下载</el-button></p>
                    </div>
                </div>
            </div>
            <div class="detail-cont-box" v-if="detailsData.status == 5">
                <DTitle :name="'修改意见'" :fontSize="18"/>
                <div v-for="(proposalItem,key) in detailsData.proposal" :key="key">
                    <div class="flex-start mt20">
                        <label>修改意见</label>
                        <p class="flex-1">{{proposalItem.opinion}}</p>
                    </div>
                    <div class="flex-start mt20">
                        <label>提出时间</label>
                        <span>{{proposalItem.createTime | moment}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <p class="status-btn mt20">
            <el-button class="btn-border mr60" @click="objectionDialogVisible=true">提出异议</el-button>
            <el-button type="primary" @click="onSubmitProgram">确认方案</el-button>
            <el-button type="primary" class="disable" v-if="detailsData.status == 5 ||detailsData.status == 4 || detailsData.status == 0">等待顾问修改中</el-button>
        </p> -->
        <p class="status-btn" v-if="detailsData.status == 0 || detailsData.status == 1 || 
        detailsData.status == 3 || detailsData.status == 4 || detailsData.status == 5">
            <el-button class="btn-border mr60" v-if="detailsData.status == 1" @click="objectionDialogVisible=true">提出异议</el-button>
            <el-button type="primary" v-if="detailsData.status == 1" @click="onSubmitProgram">确认方案</el-button>
            <el-button type="primary" class="disable" v-if="detailsData.status == 5 ||detailsData.status == 4 || detailsData.status == 0">等待顾问修改中</el-button>
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
import { Button } from 'element-ui'
import DTitle from '@/components/DTitle'
import { getCustomerProgramDetail, customerNayProgramPlan, confirmProgram } from '@/serverApi/project'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Button)

export default {
    components: {
        DTitle,
    },
    data() {
        return {
            title: '项目详情',
            detailsData: {},
            objectionDialogVisible: false,
            objectionValue: '',
            onclickModal:false
        }
    },
    created() {
        this.getProgramDetails()
    },
    methods: {
        // 方案详情数据请求
        getProgramDetails() {
            getCustomerProgramDetail({ppid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data;
                }
            })
        },
        // 提出异议操作
        objectionSubmit() {
            let params = {ppid: this.$route.params.id, opinion: this.objectionValue}
            if(!this.objectionValue){
                this.$message.error('异议内容不能为空，请填写内容')
                return
            }
            customerNayProgramPlan(params).then(response => {
                if(response.code == 200) {
                    this.objectionDialogVisible = false;
                    MessageAlert({title:'提交成功',content:'您已经成功提交对方案计划的修改意见！请耐心等候顾问修改方案。',okText:'确定'}).then(res => {
                        this.getProgramDetails()
                    })
                }
            })
        },
        // 确认方案请求
        onSubmitProgram() {
            MessageConfirm({
                 title:'确认方案',
                 content:'是否确认方案？注意！您只能确认唯一方案！确认方案将视为您决定聘用该顾问！',
                 okText:'确定',
                 cancelText:'取消'
            }).then(res => {
                let params = { ppid: this.detailsData.ppid, status: 2}
                confirmProgram(params).then(response => {
                    if(response.code == 200) {
                         MessageAlert({
                             title:'确认成功',
                             content:'您已确认该方案为唯一方案！平台将通知顾问提交详细的阶段计划！您可以在“个人中心-我的项目-阶段列表”查看阶段内容。',
                             okText:'确定'
                        }).then(res => {
                            this.getProgramDetails()
                        })
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 下载方案计划书
        onDownUrl(url) {
            if(!url || url.substr(0,4) != "http"){
                this.$message.warning('下载的文件为空');
                return;
            }
            window.location.href = url;
        }
    },
    // 将数字转换成货币格式过滤器
    filters:{
        ExtenSion(value) {
            if (value && value != null) {
                value = String(value);
                var left = value.split('.')[0], right = value.split('.')[1];
                // right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                // return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('');
            } else if (value === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            } else {
                return '';
            }
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
            }
        }
        .head-portrait {
            align-items: center;
            img {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                margin-right: 10px;
            }
            span {
                font-size: 18px;
                color: #333333;
                font-weight: 600;
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
        line-height: 24px;
        background: rgba(255,101,54,1);
        border-radius: 3px;
        padding: 0;
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