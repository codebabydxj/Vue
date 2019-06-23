<template>
    <div class="project-cont">
        <div v-if="isContent == false">
            <div class="myproject-title">
                <DTitle :name="'顾问推荐'" :fontSize="18"/>
            </div>
            <div class="no-content">
                <img src="static/image/no-content.png"/>
                <p>当前分类暂为空，前往发布项目！</p>
                <router-link :to="{path: '/publishProject/0'}"><el-button type="primary">发布项目</el-button></router-link>
            </div>
        </div>
        <div class="list-cont">
            <!-- <div v-for="(itemData,ikey) in listData" :key="ikey" @click="goConsultantDetails(itemData)"> -->
            <!-- <router-link v-for="(itemData,ikey) in recommentData" :to="{path: '/customerProject/consultant/'+$route.params.pid+'/consultantDetails/'+itemData.uid}" :key="ikey"> -->
                <ConsultantList v-for="(itemData,ikey) in recommentData" :key="ikey" :item="itemData" :i="ikey+1"/>
            <!-- </router-link> -->
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { mapGetters } from 'vuex'
import { getRecommendList } from '@/serverApi/personalCenter'
import ConsultantList from './common/ConsultantList'
import DTitle from '@/components/DTitle'

export default {
    components: {
        ConsultantList,
        DTitle
    },
    data() {
        return {
            title: '我的项目',
            isContent: null,
            recommentData: [],
        }
    },
    created() {
        this.getRecommendListData()
    },
    methods: {
        // 客户推荐列表数据请求
        getRecommendListData() {
            getRecommendList().then(response => {
                if(response.code == 200) {
                    this.recommentData = response.data
                    // this.recommentData = [{recommendadviser:[{},{}]},{recommendadviser:[]}]
                    this.isContent = this.recommentData && this.recommentData.length>0 ? true : false;
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