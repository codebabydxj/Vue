<template>
    <div class="recommend-project-cont">
        <div v-if="isContent == false">
            <div class="myproject-title">
                <DTitle :name="'项目推荐'" :fontSize="18"/>
            </div>
            <div class="no-content">
                <img src="static/image/no-content.png"/>
                <p>当前分类暂为空，前往项目市场查看更多!!</p>
                <router-link :to="{path: '/rojectMarket'}"><el-button type="primary">前往项目市场</el-button></router-link>
            </div>
        </div>
        <div class="list-cont">
            <router-link v-for="(itemData,ikey) in listData"
                :to="{path: '/personalCenter/projectRecommend/projectDetails/'+itemData.pid}" 
                :key="ikey">
                <TabList :item="itemData" :i="ikey+1" :userType="userObj.type"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import { mapGetters } from 'vuex'
import { getRecommendList } from '@/serverApi/personalCenter'
import DTitle from '@/components/DTitle'
import TabList from './tabList'

export default {
    components: {
        TabList,
        DTitle
    },
    data() {
        return {
            title: '项目推荐',
            tableTabs: [],
            listData: [],
            projectCount: {},
            isContent: null
        }
    },
    computed: {
        ...mapGetters(['token', 'userObj']),
    },
    created() {
        this.getRecommendListData()
    },
    methods: {
        // 顾问推荐列表数据 
        getRecommendListData(){
            let params = {type: 2, pageNum: 0, pageSize: 999}
            getRecommendList(params).then(response => {
                if(response.code == 200) {
                    this.listData = response.data
                    this.isContent = this.listData && this.listData.length>0?true:false
                }
            })
        },
    },
    
}
</script>

<style lang='scss'>
.recommend-project-cont {
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:3px;
    font-size: 14px;
    .myproject-title {
        padding: 20px 30px;
    }
}
</style>