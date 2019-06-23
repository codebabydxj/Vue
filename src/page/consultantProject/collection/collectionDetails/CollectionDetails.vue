<template>
    <div class="paymentDetails-cont">
        <div class="paymentDetails-title mt20">
            <DTitle :name="'收款详情'" :fontSize="18"/>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start mt20">
                <label>流水号</label>
                <span>{{detailsData.serialNumber}}</span>
            </div>
            <div class="flex-start mt20">
                <label>整体进度</label>
                <span>第{{detailsData.stageSort}}阶段</span>
            </div>
            <div class="flex-start mt20">
                <label>收款金额</label>
                <span>{{detailsData.realPrice}} 元</span>
            </div>
            <div class="flex-start mt20">
                <label>收款时间</label>
                <span v-if="detailsData.status == 2">待收款</span>
                <span v-if="detailsData.status == 3">{{detailsData.updateTime | moment}}</span> 
            </div>
            <div class="flex-start mt20">
                <label>收款人</label>
                <span>{{detailsData.payee}}</span>
            </div>
            <div class="flex-start mt20">
                <label>收款银行</label>
                <span>{{detailsData.payeeBank}}</span>
            </div>
            <div class="flex-start mt20">
                <label>收款账号</label>
                <span>{{detailsData.payeeAccount}}</span>
            </div>
        </div>
    </div>
    
</template>

<script>
import DTitle from '@/components/DTitle'
import { getCollectionDetails } from '@/serverApi/project'
export default {
    components: {
        DTitle
    },
    name: 'ConsultantList',
    props: {
        item: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            title: '收款信息',
            detailsData: {}
        }
    },
    created() {
        this.getCollectionDetailsData()
    },
    methods: {
        // 收款记录详情数据请求
        getCollectionDetailsData() {
            getCollectionDetails({mpid: this.$route.params.id}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data
                    // console.log(this.detailsData,'this.detailsDatathis.detailsDatathis.detailsData')
                }
            })
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.paymentDetails-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .paymentDetails-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    .detail-cont-box {
        padding: 20px 35px 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }
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
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
}
</style>