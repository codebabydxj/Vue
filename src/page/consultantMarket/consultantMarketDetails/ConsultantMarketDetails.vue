<template>
    <div class="project-cont main-cont consultant-market-details">
        <ConsultantInfo :detailsData="detailsData" :applicationData="applicationData"/>
        <div class="status-btn mt20">
            <el-button type="primary" @click="inviteProject()" v-if="userObj && userObj.type === 0">发起项目邀请</el-button>
        </div>
        <!--邀请顾问内容框-->
        <el-dialog
            class="dialog-model invoice-model"
            :visible.sync="inviteDialogVisible"
            @close="closeDialog"
            width="630px"
            :close-on-click-modal="onclickModal"
            >
            <h4 slot="title" class="dialog-title">邀请顾问</h4>
            <div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="发起新的项目" name="inviteNewProject">
                        <div class="invite-new-project mt20">
                            <el-input class="des-textarea" type="textarea" v-model.trim="description" maxlength="300" placeholder="请输入您对项目的描述，字数在300字以内"></el-input>
                            <div class="hint-complete-project">
                                <p class="hint-text">{{isCheck && !description ? '请输入项目描述内容！' : ''}}</p>
                                <a class="go-complete-project" href="javascript:void(0);" @click="goFullRelease">前往完整发布>>></a>
                            </div>
                            <el-button type="primary" @click="inviteSubmit()"> 发起邀请</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="选择已有项目" name="inviteOldProject">
                        <div class="invite-old-project">
                            <div class="no-old-project-content" v-if="isOldProjectCont == false">
                                <img src="static/image/no-content.png"/>
                                <p class="mt12">当前分类为空，请发起新的项目</p>
                            </div>
                            <div class="select-old-project">
                                <div class="select-old-project-list" v-for="(item,key) in invitationListData" :key="key">
                                    <template v-if="item.isRequest == 0">
                                        <a href="javascript:void(0);" class="project-name" @click="selectProjectId=item.pid">
                                            <span :class="[{ 'select-active': item.pid == selectProjectId }, 'radio-selected']">
                                                <span class="radio-selected-acitve" v-show="item.pid == selectProjectId"></span>
                                            </span>
                                            {{item.projectName}}
                                        </a>
                                        <div class="cont-line cont-line1">
                                            <p class="w192">
                                                <label>项目周期</label>
                                                <span v-if="item.projectLengthType==0">0-3个月</span>
                                                <span v-if="item.projectLengthType==1">3-6个月</span>
                                                <span v-if="item.projectLengthType==2">6-12个月</span>
                                                <span v-if="item.projectLengthType==3">其他时间</span>
                                            </p>
                                            <p>
                                                <label>项目地点</label>
                                                <span>{{item.province}} . {{item.city}}</span>
                                            </p>
                                        </div>
                                        <div class="cont-line cont-line2">
                                            <label>项目描述</label>
                                            <p class="flex-1 line-h20 line4" v-html="item.description"></p>
                                        </div>
                                        <div class="cont-line cont-line3">
                                            <label>发布时间</label>
                                            <span>{{item.releaseTime || '未发布'}}</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="dialog-footer text-centerr">
                            <el-button @click="closeDialog()" class="border mr60">取消</el-button>
                            <el-button type="primary" @click="insertAdProjectSubmit()" class="solid">确定</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { Tabs, TabPane } from 'element-ui'
import { getAdviserDetail } from '@/serverApi/project'
import { getSpeedrelease } from '@/serverApi/personalCenter'
import { getInvitationList, insertAdProject } from '@/serverApi/project'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
import { mapGetters, mapState } from 'vuex'
import ConsultantInfo from './ConsultantInfo'

Vue.use(Tabs)
Vue.use(TabPane)

export default {
    components: {
        ConsultantInfo,
    },
    data() {
        return {
            title: '我的项目',
            detailsData: {},
            applicationData: {},
            invitationListData: [],
            inviteDialogVisible: false,
            isCheck: false,
            activeName: 'inviteNewProject',
            description: '',
            confirmType: null,
            isOldProjectCont: null,
            selectProjectId: 0,
            onclickModal:false
        }
    },
    created() {
        this.getDetails()
        this.getInvitationListData()
    },
    methods: {
        // 顾问详情数据请求
        getDetails() {
            getAdviserDetail({uid:this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data
                }
            })
        },
        // 关闭时回调
        closeDialog() {
            this.inviteDialogVisible=false
            this.description = ''
            this.isCheck = false
            this.selectProjectId = 0
            this.activeName = 'inviteNewProject'
        },
        // 邀请项目
        inviteProject() {
            this.inviteDialogVisible = true;
        },
        // 前往完整发布
        goFullRelease() {
            MessageConfirm({
                 title:'切换新的发布方式',
                 content:'切换发布方式之后，部分您已经填写的消息将不会被保存，确定继续前往吗？',
                 okText:'确认',
                 cancelText:'取消'
            }).then(res => {
                this.inviteDialogVisible = false
                this.$store.dispatch('hideReleaseDialog')
                this.$router.push({path:'/PublishProject/0?uid='+this.$route.params.id})
            }).catch(text => {
                console.log('取消操作')
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
        // 获取邀请项目列表
        getInvitationListData() {
            getInvitationList({aiid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.invitationListData = response.data;
                    this.isOldProjectCont = this.invitationListData && this.invitationListData.length>0 ? true : false;
                }
            })
        },
        // 发起新项目邀请(快递发布)
        inviteSubmit() {
            this.isCheck = true
            let parmas = {description: this.description, appoint: this.$route.params.id}
            if(this.description) {
                getSpeedrelease(parmas).then(res => {
                    if(res.code ==200) {
                        this.inviteDialogVisible = false
                        MessageAlert({title:'成功向顾问发起新项目邀请',content:'已向该顾问发起项目邀请，请等待顾问等回复。',okText:'确定'}).then(res => {
                            this.$router.push({path:'/consultantMarket'})
                        }).catch(text => {
                            this.$router.push({path:'/consultantMarket'})
                        })
                    }
                })
            }else {
                return false;
            }
        },
        // 邀请项目请求(已有项目)
        insertAdProjectSubmit() {
            let params = {aiid: this.$route.params.id, pid: this.selectProjectId}
            if(!this.selectProjectId) {
                this.$message.warning('请选择已有项目')
                return
            }
            insertAdProject(params).then(response => {
                if(response.code == 200) {
                    this.closeDialog()
                    MessageConfirm({
                        title:'邀请成功',
                        content:'您已邀请该顾问并发布成功，我们将在尽快对项目展开审核，结果将会以邮件和短信的形式通知您',
                        okText:'继续邀请顾问',
                        cancelText:'前往项目列表'
                    }).then(res => {
                        this.$router.push({path:'/consultantMarket'})
                    }).catch(text => {
                        this.$router.push({path:'/personalCenter/myProject'})
                    })
                }
            })
        },
    },
    computed: {
        ...mapGetters(['token', 'userObj']),
    }
}
</script>

<style lang='scss'>
.project-cont {
    background:rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    &.consultant-market-details {
        margin-top: 140px;
        margin-bottom: 128px;
        &.main-cont {
            max-width: 960px;
            .cont-box-card {
                box-shadow: initial;
            }
        }
        .dialog-model {
            .dialog-title, .el-dialog__headerbtn .el-dialog__close {
                font-size: 20px;
                color: #000000;
                font-weight: 600;
            }
            .dialog-title {
                color: #333333;
            }
            
            .el-dialog__body {
                padding: 20px 45px 40px;
                .dialog-cont {
                    font-size: 16px;
                    line-height: 22px;
                    text-align: left;
                }
                .el-textarea {
                    max-width: 460px;
                }
            }
            .el-tabs__nav {
                display: flex;
                justify-content: center;
                transform: translateX(0px);
                width: 100%;
            }
            .el-tabs__nav-scroll .el-tabs__item {
                padding: 0;
                &:last-child {
                    margin-left: 100px;
                }
            }
            .el-tabs__nav-wrap::after {
                height: 2px;
            }
            .invite-new-project {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 40px;
                .des-textarea {
                    textarea {
                        height: 100px;
                    }
                }
                .hint-complete-project {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    line-height: 20px;
                    margin-top: 6px;
                    .hint-text {
                        color: #f56c6c;
                    }
                    .go-complete-project {
                        color: #FF895F;
                    }
                }
                .el-button {
                    width: 120px;
                    height: 32px;
                    margin-top: 20px;
                    border-radius: 4px;
                    padding: 0;
                    span {
                        color: #FBFBFB;
                    }
                }
            }
            .invite-old-project {
                height: 410px;
                margin: 20px 0;
                border-radius: 3px;
                border: 1px solid rgba(224,224,224,1);
                overflow: overlay;
                .no-old-project-content {
                    img {
                        margin-top: 100px;
                    }
                    p {
                        margin-top: 36px;
                        line-height: 20px;
                    }
                }
                .select-old-project {
                    padding: 20px 30px;
                    .el-radio-group {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                        .el-radio + .el-radio {
                            margin-left: 0;
                        }
                    }
                    .project-name {
                        display: flex;
                        line-height: 22px;
                        font-size: 16px;
                        color: #333333;
                        font-weight: 600;
                        margin-bottom: 20px;
                        .radio-selected {
                            width: 18px;
                            height: 18px;
                            border: 1px solid #999999;
                            border-radius: 50%;
                            margin-right: 8px;
                            text-align: center;
                            line-height: 20px;
                            &.select-active {
                                border-color: #FF6536;
                            }
                            .radio-selected-acitve {
                                width: 14px;
                                height: 14px;
                                border-radius: 50%;
                                background: rgba(255,101,54,1);
                                display: inline-block;
                            }
                        }
                    }
                    .select-old-project-list {
                        flex: 1;
                        text-align: left;
                        margin-top: 20px;
                        &:first-child {
                            margin-top: 0;
                        }
                        p, span{
                            color: #666666;
                        }
                        label {
                            width: 58px;
                            margin-right: 10px;
                            color: #404040;
                        }
                        .cont-line {
                            display: flex;
                            flex-direction: row;
                            margin-top: 10px;
                            line-height: 20px;
                        }
                    }
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
            &.invoice-model {
                .el-dialog__header {
                    text-align: center;
                }
            }
        }
    }
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
            width: 260px;
            height: 45px;
            // background:rgba(255,101,54,1);
            border-radius: 3px;
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
}
</style>