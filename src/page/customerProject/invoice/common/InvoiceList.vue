<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <p class="left">
                <label>发票抬头</label>
                <span>{{itemData.invoiceLetterhead}}</span>
            </p>
            <span class="project-status w120 orange" v-if="itemData.invoiceType == 0">增值税专用发票</span>
            <span class="project-status w120" v-if="itemData.invoiceType == 1">增值税普通发票</span>
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left">
                <div class="flex-start mt20">
                    <label>发票金额</label>
                    <span>{{itemData.price}} 元</span>
                </div>
                <div class="flex-start mt20">
                    <label>快递信息</label>
                    <span v-if="!itemData.logisticsCompany && !itemData.logisticsNumber">未发送</span>
                    <span v-else>{{itemData.logisticsCompany}}·{{itemData.logisticsNumber}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>流水号</label>
                    <span>{{itemData.serialNumber}}</span>
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
            &.w120 {
                width: 120px;
            }
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