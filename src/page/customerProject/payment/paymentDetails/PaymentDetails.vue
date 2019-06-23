<template>
    <div class="paymentDetails-cont">
        <div class="paymentDetails-title mt20">
            <DTitle :name="'支付详情'" :fontSize="18"/>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start">
                <label>流水号</label>
                <span>{{detailsData.serialNumber}}</span>
            </div>
            <div class="flex-start mt20">
                <label>支付时间</label>
                <span>{{detailsData.createTime | moment}}</span>
            </div>
            <div class="flex-start mt20">
                <label>整体进度</label>
                <span>第{{detailsData.stageSort}}阶段</span>
            </div>
            <div class="flex-start mt20">
                <label>应付金额</label>
                <span>{{detailsData.price}} 元</span>
            </div>
            <div class="flex-start mt20">
                <label>实付金额</label>
                <span>{{detailsData.realPrice}} 元</span>
            </div>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start">
                <label>付款人</label>
                <span>{{detailsData.payer}}</span>
            </div>
            <div class="flex-start mt20">
                <label>付款账号</label>
                <span>{{detailsData.payerAccount}}</span>
            </div>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start">
                <label>收款人</label>
                <span>{{detailsData.payee}}</span>
            </div>
            <div class="flex-start mt20">
                <label>收款账号</label>
                <span>{{detailsData.payeeAccount}}</span>
            </div>
            <div class="flex-start mt20">
                <p class="display-flex">
                    <label>收款凭证</label>
                    <span class="flex-1" v-if="detailsData.paymentUrl">
                        <img class="max-w100" :src="detailsData.paymentUrl || ''"/>
                    </span>
                    <span v-else>未提交收款凭证</span>
                </p>
            </div>
        </div>
    </div>
    
</template>

<script>
import DTitle from '@/components/DTitle'
import { getPaymentDetail } from '@/serverApi/project'

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
            title: '文档信息',
            detailsData: {}
        }
    },
    created() {
        this.getPaymentDetailData()
    },
    methods: {
        // 支付记录详情请求
        getPaymentDetailData() {
            getPaymentDetail({id: this.$route.params.id}).then(response => {
                if(response.code == 200){
                    this.detailsData = response.data
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
    .display-flex {
        display: flex;
    }
    .max-w100 {
        display: inline-block;
        max-width: 100%;
    }
}
</style>