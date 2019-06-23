<template>
    <div class="cont-box-card project-detail-cont application-cont">
        <div class="detail-cont-box border-b-1">
            <BasicInfo :detailsData="detailsData" :applicationData="applicationData"/>
        </div>
        <div class="detail-cont-box">
            <div class="flex-row">
                <DTitle :name="'申请项目'" :fontSize="18"/>
            </div>
            <div class="flex-start mt20">
                <label>胜任描述</label>
                <p class="flex-1" v-html="applicationData.introduction"></p>
            </div>
            <div class="flex-start mt20">
                <label>项目规划</label>
                <p class="flex-1" v-html="applicationData.proposal"></p>
            </div>
            <div class="flex-start mt20" v-if="applicationData.successCase && applicationData.successCase.length>0">
                <div class="flex-items-center flex-1" v-for="(successCaseItem,key) in applicationData.successCase" :key="key">
                    <label>计划书</label>
                    <span>{{successCaseItem.annexName}}</span>
                    <p class="flex-1 text-right"><el-button class="btn-w60" type="primary" :url="successCaseItem.annexUrl">下载</el-button></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import BasicInfo from './common/BasicInfo'
import { Button } from 'element-ui'
Vue.use(Button)

export default {
    props: {
        applicationData: {
            type: Object,
            default: {}
        },
        detailsData: {
            type: Object,
            default: {}
        }
    },
    components: {
        DTitle,
        BasicInfo
    },
    data() {
        return {
            title: '项目详情'
        }
    },
    created() {
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        
    },
    computed: {
    }
}
</script>

<style lang='scss' scope>
.text-right {
    text-align: right;
}
.flex-items-center {
    display: flex;
    align-items: center;
}
.application-cont {
    .btn-w60 {
        width: 60px;
        height: 24px;
        line-height: 24px;
        border-radius: 3px;
        padding: 0;
        span {
            font-size: 12px;
            color: #fff;
        }
    }
}

</style>