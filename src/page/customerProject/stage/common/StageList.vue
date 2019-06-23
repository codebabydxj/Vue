<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <h4>{{itemData.stageName}}</h4>
            <span class="project-status" v-if="itemData.customerStatus == 0">未开始</span>
            <span class="project-status" v-if="itemData.customerStatus == 1">有异议</span>
            <span class="project-status" v-if="itemData.customerStatus == 2">待付款</span>
            <span class="project-status" v-if="itemData.customerStatus == 3">待核对付款</span>
            <span class="project-status orange" v-if="itemData.customerStatus == 4">进行中</span>
            <span class="project-status" v-if="itemData.customerStatus == 5">待审核</span>
            <span class="project-status" v-if="itemData.customerStatus == 6">申请发票</span>
            <span class="project-status gray" v-if="itemData.customerStatus == 7">已完成</span>
            <span class="project-status" v-if="itemData.customerStatus == 8">开票中</span>
            <span class="project-status" v-if="itemData.customerStatus == 9">交付有异议</span>
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
                        <span>{{itemData.startTime | moment}} 至 {{itemData.endTime | moment}}</span>
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
                background: #FFA75F;
            }
        }
    }
    .program-box-cont {
        .program-cont-left {
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