<template>
    <div class="program-cont">
        <div class="program-title mt20">
            <DTitle :name="'方案列表'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div class="program-list-box" v-for="(itemData,i) of listData" :key="i">
            <router-link :to="{path: '/customerProject/program/'+$route.params.pid+'/programDetails/'+itemData.ppid}" >
                <ProgramList :itemData="itemData"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import ProgramList from './common/ProgramList'
import { getProjectProgramList } from '@/serverApi/project'
export default {
    components: {
        DTitle,
        ProgramList
    },
    data() {
        return {
            title: '我的项目方案',
            listData: [],
            isContent: null
        }
    },
    created() {
        this.getProgramList()
    },
    methods: {
        // 方案列表数据请求
        getProgramList() {
            getProjectProgramList({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200) {
                    this.listData = response.data
                    this.isContent = this.listData && this.listData.length>0 ? true:false
                }
            })
        }
    },
    computed: {
    }
}
</script>

<style lang='scss' scope>
.program-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .program-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    .program-list-box {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>