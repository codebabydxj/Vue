<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <h4>{{itemData.stageName}}</h4>
            <span class="project-status" v-if="itemData.adviserStatus == 0">待确认</span>
            <span class="project-status" v-if="itemData.adviserStatus == 1">有异议</span>
            <span class="project-status" v-if="itemData.adviserStatus == 2">未开始</span>
            <span class="project-status orange" v-if="itemData.adviserStatus == 3">进行中</span>
            <span class="project-status" v-if="itemData.adviserStatus == 4">待审核</span>
            <span class="project-status" v-if="itemData.adviserStatus == 5">申请收款</span>
            <span class="project-status gray" v-if="itemData.adviserStatus == 6">已完成</span>
            <span class="project-status" v-if="itemData.adviserStatus == 7">收款中</span>
            <span class="project-status" v-if="itemData.adviserStatus == 8">交付有异议</span>
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left">
                <div class="flex-start mt20">
                    <p>
                        <label>整体进度</label>
                        <span>第{{itemData.stageSort}}阶段</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>阶段周期</label>
                        <span v-if="itemData.startTime">{{itemData.startTime | moment}}</span> 
                        <span v-if="itemData.startTime && itemData.endTime">至</span> 
                        <span v-if="itemData.endTime">{{itemData.endTime | moment}}</span>
                        <!-- <span v-if="!itemData.startTime || !itemData.endTime">未填写</span> -->
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConsultantList',
    props: {
        itemData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            title: '文档信息'
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

<style lang='scss'>
.program-list {
    .project-name {
        h4 {
            line-height: 22px;
            font-size: 16px;
            color: #404040;
            font-weight: 600;
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
            &.orange {
                background:#FF895F;
            }
        }
    }
    
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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