<template>
    <div class="project-cont">
        <div v-if="isContent == false">
            <div class="myproject-title">
                <DTitle :name="'项目顾问'" :fontSize="18"/>
            </div>
            <div class="no-content">
                <img src="static/image/no-content.png"/>
                <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
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
                    <!-- <div v-for="(itemData,ikey) in listData" :key="ikey" @click="goConsultantDetails(itemData)"> -->
                    <router-link v-for="(itemData,ikey) in listData" :to="{path: '/customerProject/consultant/'+$route.params.pid+'/consultantDetails/'+itemData.uid}" :key="ikey">
                        <ConsultantList :item="itemData" :i="ikey+1"/>
                    </router-link>
                    <!-- </div> -->
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
import { getProjectSignUpAdviserCount, getProjectSignUpAdviserList } from '@/serverApi/project'
import ConsultantList from './common/ConsultantList'
import DTitle from '@/components/DTitle'
Vue.use(Tabs)
Vue.use(TabPane)

export default {
    components: {
        ConsultantList,
        DTitle
    },
    data() {
        return {
            title: '我的项目',
            editableTabsValue: '-1',
            listData: [],
            tableTabs: [
                { title: '所有顾问', name: '-1', type: 'allCount'}, 
                { title: '已推荐', name: '0', type: 'recommendedCount'}, 
                { title: '待面试', name: '1', type: 'interviewCount'}, 
                { title: '方案待提交', name: '6', type: 'programConfirmedCount'}, 
                { title: '已聘用', name: '5', type: 'employCount'}, 
            ],
            isContent: null
        }
    },
    created() {
        this.getProjectConsultantCont()
        this.getProjectConsultantList('-1')
    },
    methods: {
        onTabClick(tab, event) {
            // 根据状态请求数据
            this.getProjectConsultantList(tab.name)
        },
        // 项目顾问类型请求
        getProjectConsultantCont() {
            getProjectSignUpAdviserCount({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.setProjectCont(this.tableTabs, response.data);
                }
            })
        },
        // 顾问列表数据请求
        getProjectConsultantList(type) {
            let params = {pid: this.$route.params.pid}
            if(type !== '-1'){
                params = {pid: this.$route.params.pid,status:type}
            }
            getProjectSignUpAdviserList(params).then(response => {
                if(response.code == 200) {
                    this.listData = response.data;
                    if(type == '-1'){
                        this.isContent = this.listData && this.listData.length>0?true:false
                    }
                }
            })
        },
        // 设置顾问类型菜单
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
        goConsultantDetails(data) {
            this.$router.push({name:'consultantDetails',params:{pid:this.$route.params.pid,id:data.uid}})
        }

    },
    computed: {
        ...mapGetters(['token', 'userObj']),
    }
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