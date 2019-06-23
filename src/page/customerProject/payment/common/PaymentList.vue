<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <p class="left">
                <label>流水号</label>
                <span class="ml5">{{itemData.serialNumber}}</span>
            </p>
            <!-- <span class="project-status orange">已核对</span> -->
            <span class="project-status" v-if="itemData.status == 0">待核对</span><!-- 客户付款待确认 -->
            <span class="project-status orange" v-if="itemData.status == 1">已核对</span><!-- 客户付款待确认 -->
            <!-- <span class="project-status" v-if="itemData.status == 2">顾问申请收款待收款</span>客户付款待确认 -->
            <!-- <span class="project-status orange" v-if="itemData.status == 3">已向顾问付款</span>客户付款待确认 -->
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left">
                <div class="flex-start mt20">
                    <label>整体进度</label>
                    <span>第{{itemData.stageSort}}阶段</span>
                </div>
                <div class="flex-start mt20">
                    <label>应付金额</label>
                    <span>{{itemData.price}} 元</span>
                </div>
                <div class="flex-start mt20">
                    <label>实付金额</label>
                    <span>{{itemData.realPrice}} 元</span>
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
        align-items: center;
        .project-status {
            display: inline-block;
            width: 100px;
            height: 24px;
            line-height: 24px;
            border-radius:15px;
            background:#FF705F;
            color: #FFFFFF;
            font-size: 14px;
            &.orange {
                background: #FFA75F;
            }
        }
        p, span{
                line-height: 20px;
                font-size: 14px;
                color: #666666;
        }
        .left {
            text-align: left;
            .ml5 {
                margin-left: -4px;
            }
        }
        label {
            width: 57px;
            display: inline-block;
            margin-right: 20px;
            font-size: 14px;
            color: #333333;
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