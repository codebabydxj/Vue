<template>
    <div class="project-cont">
        <div v-if="isContent == false">
            <div class="myproject-title">
                <DTitle :name="'我的项目'" :fontSize="18"/>
            </div>
            <div class="no-content" v-if="userObj.type === 0">
                <img src="static/image/no-content.png"/>
                <p>当前分类暂为空，前往发布项目！</p>
                <router-link :to="{path: '/publishProject/0'}"><el-button type="primary">发布项目</el-button></router-link>
            </div>
            <div class="no-content" v-else>
                <img src="static/image/no-content.png"/>
                <p>当前分类内容暂为空，前往项目市场申请项目!</p>
                <router-link :to="{path: '/rojectMarket'}"><el-button type="primary">前往项目市场</el-button></router-link>
            </div>
        </div>
        <el-tabs v-model="editableTabsValue" @tab-click="onTabClick" v-if="isContent == true">
            <el-tab-pane
                :key="item.name"
                v-for="item in tableTabs"
                :label="item.title"
                :name="item.name"
            >
                <div class="list-cont">
                    <router-link v-for="(itemData,ikey) in listData" 
                        :to="{path: (userObj.type === 0 ? (itemData.type == 1 ? '/personalCenter/myProject/myProjectDetails/' : '/customerProject/') : '/consultantProject/')+(itemData.pid)}" 
                        :key="ikey" tag="a" target="_blank">
                        <TabList :item="itemData" :i="ikey+1" :userType="userObj.type"/>
                    </router-link>
                </div>
            </el-tab-pane>
        </el-tabs> 
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { Tabs, TabPane } from 'element-ui'
import { mapGetters } from 'vuex'
import { getProjectByStatus, getMyProjectCount } from '@/serverApi/project'
import DTitle from '@/components/DTitle'
import TabList from './tabList'
Vue.use(Tabs)
Vue.use(TabPane)

export default {
    components: {
        TabList,
        DTitle
    },
    data() {
        return {
            title: '我的项目',
            editableTabsValue: '0',
            tableTabs: [],
            listData: [],
            projectCount: {},
            customerTableTabs: [
                { title: '所有项目', name: '0', type: 'allCount' }, 
                { title: '未开始', name: '1', type: 'notBeginningCount' }, 
                { title: '进行中', name: '2', type: 'currentCount' }, 
                { title: '已完成', name: '3', type: 'completedCount'}
            ],
            consultantTableTabs: [
                { title: '所有项目', name: '-1', type: 'allCount'}, 
                { title: '申请中', name: '0', type: 'applicationCount'}, 
                { title: '待面试', name: '1', type: 'interviewCount'}, 
                { title: '方案待确认', name: '6', type: 'programmeCount'}, 
                { title: '阶段待确认', name: '7', type: 'stageCount'}, 
                { title: '进行中', name: '8', type: 'currentCount' }, 
                { title: '已完成', name: '9', type: 'completedCount'}
            ],
            tabIndex: 2,
            isContent: null
        }
    },
    computed: {
        ...mapGetters(['token', 'userObj']),
    },
    created() {
        this.getMyProjectCount(this.userObj.type);
        if(this.userObj.type === 0){
            this.getProjectList(0)
            this.editableTabsValue = '0'
        }else {
            this.getProjectList(-1)
            this.editableTabsValue = '-1'
        }
    },
    methods: {
        // 选项菜单改变时执行
        onTabClick(tab, event) {
            // 根据状态请求数据
            this.getProjectList(tab.name)
        },
        // 项目类型数量请求
        getMyProjectCount(type) {
            getMyProjectCount(type).then(response => {
                if(response.code == 200){
                    this.projectCount = response.data || {}
                    this.tableTabs = this.userObj.type === 0 ? this.customerTableTabs : this.consultantTableTabs;
                    this.setProjectCont(this.tableTabs,this.projectCount);
                }
            })
        },
        // 项目列表请求
        getProjectList(type) {
            getProjectByStatus(this.userObj.type,{proStatus:type}).then(response => {
                if(response.code == 200) {
                    this.listData  = response.data;
                    if(this.userObj.type === 0 && this.editableTabsValue == '0'){
                        this.isContent = this.listData && this.listData.length>0?true:false
                    }
                    if(this.userObj.type === 1 && this.editableTabsValue == '-1'){
                        this.isContent = this.listData && this.listData.length>0?true:false
                    }
                    
                }
            })
        },
        // 设置类型数量-选项卡菜单设置
        setProjectCont(data, obj) {
            if(!obj) return;
            data.map(d => {
                Object.keys(obj).forEach(key => {
                    if(d.type == key){
                        d.title += '(' + (obj[key] || 0) + ')';
                    }
                })
            })
        },

    },
    
}
</script>

<style lang='scss'>
.project-cont {
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:3px;
    .myproject-title {
        padding: 20px 30px;
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
}
</style>