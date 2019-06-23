<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="title" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false && userObj.type === 1">
            <img src="static/image/no-content.png"/>
            <p>当前分类暂为空，前往项目市场寻找更多项目!</p>
            <router-link :to="{path: '/rojectMarket'}"><el-button type="primary">前往项目市场</el-button></router-link>
        </div>
        <div class="no-content" v-if="isContent == false && userObj.type === 0">
            <img src="static/image/no-content.png"/>
            <p>当前分类暂为空，前往发布项目!</p>
            <!-- <router-link :to="{path: '/rojectMarket'}"><el-button type="primary">发布项目</el-button></router-link> -->
            <el-button type="primary" @click="goPushProject">发布项目</el-button>
        </div>
        <div>
            <div class="stage-list-box hover-active" v-for="(itemData,i) of messageListData" :key="i" @click="onReadMessage(itemData)">
                <!-- <router-link :to="{path: '/customerProject/stage/'+$route.params.pid+'/stageDetails/'+itemData.id}" > -->
                    <MessageList :itemData="itemData"/>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import MessageList from './common/MessageList'
import { getMessageList, readMessage } from '@/serverApi/common'
import { getUserByTokenUrl } from '@/serverApi/personalCenter'
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        DTitle,
        MessageList
    },
    data() {
        return {
            title: '消息',
            messageListData: [],
            pageNum: 0,
            pageSize: 999,
            isContent: null,
            userInfoData: {}
        }
    },
    created() {
        this.getUserByTokenUrlData()
        this.getMessageListData()
    },
    methods: {
        // 个人信息数据请求
        getUserByTokenUrlData() {
            getUserByTokenUrl().then(response => {
                if(response.code == 200){
                    if(!response.data) return
                    this.userInfoData = response.data
                    this.title = this.userInfoData.messageCount ? (this.title + '（' + this.userInfoData.messageCount + '）') : this.title
                }
            })
        },
        // 消息中心列表数据请求
        getMessageListData() {
            getMessageList({pageNum: this.pageNum, pageSize: this.pageSize}).then(response => {
                if(response.code == 200) {
                    if(!response.data) return
                    this.messageListData = response.data.list
                    this.messageListData && this.messageListData.map(f => {
                        f.params = f.params ? JSON.parse(f.params) : {};
                    })
                    this.isContent = this.messageListData && this.messageListData.length>0 ?true:false
                }
            })
        },
        // 点击列表操作
        onReadMessage(data) {
            readMessage({mid: data.mid}).then(response => {
                if(response.code == 200){
                    this.goBackPage(data, this.userInfoData.type)
                }else{
                    this.$message.error('请求出错')
                }
            })
        },
        // 跳转页面操作
        goBackPage(data, type) {
            if (!data.backType && data.backType != 0) {
                return;
            }
            let params = data.params;
            //跳转到顾问列表backType:0
            if (data.backType == 0) {
                let routeList = this.$router.resolve({ path: '/customerProject/details/'+data.pid});
                window.open(routeList.href, '_blank');
                // this.$router.push({path: '/customerProject/details/'+data.pid})
            }
            //跳转到顾问详情backType:1
            else if (data.backType == 1) {
                let routedetails = this.$router.resolve({ path: '/customerProject/consultant/'+data.pid+'/consultantDetails/'+params.uid });
                window.open(routedetails.href, '_blank');
                // this.$router.push({path: '/customerProject/consultant/'+data.pid+'/consultantDetails/'+params.uid})
            }
            //跳转到需求市场backType:2
            else if(data.backType == 2){
                this.$router.push({path: '/rojectMarket'})
            }
            //跳转到项目详情backType:3
            else if (data.backType == 3) {
                let routeProjectDetails = '';
                type == 0 ? routeProjectDetails = this.$router.resolve({path: '/customerProject/details/'+data.pid}) : routeProjectDetails = this.$router.resolve({path: '/consultantProject/details/'+data.pid});
                window.open(routeProjectDetails.href, '_blank');
            }
            //跳转到项目详情backType:4
            else if (data.backType == 4) {
                // this.props.history.push(`/project/${data.pid}`);
            }
            //跳转到backType:5 (顾问：项目详情页，客户：顾问列表页)
            else if (data.backType == 5) {
                let routeProjectDetails = '';
                // type == 0 ? this.$router.push({path: '/customerProject/consultant/'+data.pid}) : this.$router.push({path: '/consultantProject/details/'+data.pid});
                type == 0 ? routeProjectDetails = this.$router.resolve({path: '/customerProject/consultant/'+data.pid}) : routeProjectDetails = this.$router.resolve({path: '/consultantProject/details/'+data.pid});
                window.open(routeProjectDetails.href, '_blank');
            }
            //跳转到项目方案详情backType:6
            else if (data.backType == 6) {
                let routeProgramtDetails = '';
                if (type == 0) {
                    // this.$router.push({path: '/customerProject/program/'+data.pid+'/programDetails/'+params.ppid})
                    routeProgramtDetails = this.$router.resolve({path: '/customerProject/program/'+data.pid+'/programDetails/'+params.ppid});
                    window.open(routeProgramtDetails.href, '_blank');
                    
                } else {
                    // this.$router.push({path: '/consultantProject/program/'+data.pid})
                    routeProgramtDetails =this.$router.resolve({path: '/consultantProject/program/'+data.pid})
                    window.open(routeProgramtDetails.href, '_blank');
                }
            }
            //跳转到阶段列表backType:7
            else if (data.backType == 7) {
                let routeProgramtStage = '';
                if (type == 0) {
                    // this.$router.push({path: '/customerProject/stage/'+data.pid});
                    routeProgramtStage = this.$router.resolve({path: '/customerProject/stage/'+data.pid});
                    window.open(routeProgramtStage.href, '_blank');
                } else {
                    // this.$router.push({path: '/consultantProject/stage/'+data.pid});
                    routeProgramtStage = this.$router.resolve({path: '/consultantProject/stage/'+data.pid});
                    window.open(routeProgramtStage.href, '_blank');
                }
            }
            //跳转到阶段详情backType:8
            else if (data.backType == 8) {
                let routeProgramtStageDetails = '';
                if (type == 0) {
                    // this.$router.push({path: '/customerProject/stage/'+data.pid+'/stageDetails/'+params.psid})
                    routeProgramtStageDetails = this.$router.resolve({path: '/customerProject/stage/'+data.pid+'/stageDetails/'+params.psid});
                    window.open(routeProgramtStageDetails.href, '_blank');
                } else {
                    // this.$router.push({path: '/consultantProject/stage/'+data.pid+'/stageDetails/'+params.psid})
                    routeProgramtStageDetails = this.$router.resolve({path: '/consultantProject/stage/'+data.pid+'/stageDetails/'+params.psid});
                    window.open(routeProgramtStageDetails.href, '_blank');
                }
            }
            //跳转到发票列表backType:10
            else if (data.backType == 10) {
                if (type == 0) {
                    let routeInvoice = this.$router.resolve({path: '/customerProject/invoice/'+data.pid});
                    window.open(routeInvoice.href, '_blank');
                } else {
                    // this.navCtrl.push(ConsultantStageBrowserPage,{id: params.psid, pid: data.pid, programPrice: params.finalPrice});
                }
            }
        },
        // 前往发布项目
        goPushProject() {
            this.$store.dispatch('showReleaseDialog')
        }
    },
    computed: {
        ...mapGetters(['token', 'userObj']),
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
        // padding: 20px 0px;
    }
    .stage-list-box {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &.hover-active {
            &:hover {
                background: #fafafa;
                cursor: pointer;
            }
        }
        &:last-child {
            border-bottom: none;
        }

    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
}
</style>