<template>
    <div class="paymentDetails-cont">
        <div class="paymentDetails-title mt20">
            <DTitle :name="'发票详情'" :fontSize="18"/>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start">
                <label>发票类型</label>
                <span v-if="detailsData.invoiceType == 0">增值税专用发票</span>
                <span v-if="detailsData.invoiceType == 1">增值税普通发票</span>
            </div>
            <div class="flex-start mt20">
                <label>发票金额</label>
                <span>{{detailsData.price}} 元</span>
            </div>
            <div class="flex-start mt20">
                <label>流水号</label>
                <span>{{detailsData.serialNumber}}</span>
            </div>
            <div class="flex-start mt20">
                <label>发票抬头</label>
                <span>{{detailsData.invoiceLetterhead}}</span>
            </div>
            <div class="flex-start mt20">
                <label>纳税号</label>
                <span>{{detailsData.taxNumber}}</span>
            </div>
            <div v-if="detailsData.invoiceType == 0">
                <div class="flex-start mt20">
                    <label>对公银行</label>
                    <span>{{detailsData.bankName}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>银行账号</label>
                    <span>{{detailsData.bankNumber}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>公司地址</label>
                    <span>{{detailsData.companyAddress}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>公司电话</label>
                    <span>{{detailsData.companyPhone}}</span>
                </div>
            </div>
        </div>
        <div class="paymentDetails-title mt20">
            <DTitle :name="'寄送信息'" :fontSize="18"/>
        </div>
        <div class="detail-cont-box">
            <div class="flex-start">
                <label>寄送地址</label>
                <span>{{detailsData.companyAddress}}</span>
            </div>
            <div class="flex-start mt20">
                <label>收件人</label>
                <span>{{detailsData.recipient}}</span>
            </div>
            <div class="flex-start mt20">
                <label>联系方式</label>
                <span>{{detailsData.phone}}</span>
            </div>
            <div class="flex-start mt20">
                <label>快递</label>
                <span>{{detailsData.logisticsCompany || '未发送'}}</span>
            </div>
            <div class="flex-start mt20">
                <label>快递单号</label>
                <span>{{detailsData.logisticsNumber || '未发送'}}</span>
            </div>
        </div>
    </div>
    
</template>

<script>
import DTitle from '@/components/DTitle'
import { getInvoiceDetail } from '@/serverApi/project'
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
        this.getInvoiceDetailsData()
    },
    methods: {
        // 发票详情数据请求
        getInvoiceDetailsData() {
            getInvoiceDetail({id: this.$route.params.id}).then(response => {
                if(response.code == 200) {
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
}
</style>