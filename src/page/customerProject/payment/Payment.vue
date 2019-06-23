<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'支付记录'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div>
            <div class="stage-list-box" v-for="(itemData,i) of paymentData" :key="i">
                <router-link :to="{path: '/customerProject/payment/'+$route.params.pid+'/paymentDetails/'+itemData.id}" >
                    <PaymentList :itemData="itemData"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import PaymentList from './common/PaymentList'
import { getPaymentList } from '@/serverApi/project'

export default {
    components: {
        DTitle,
        PaymentList
    },
    data() {
        return {
            title: '我的项目',
            paymentData: [],
            isContent: null
        }
    },
    created() {
        this.getPaymentData();
    },
    methods: {
        // 支付记录列表数据请求
        getPaymentData() {
            getPaymentList({pid: this.$route.params.pid,status:-1}).then(response => {
                if(response.code == 200) {
                    this.paymentData = response.data
                    this.isContent = this.paymentData && this.paymentData.length>0 ? true:false
                }
            })
        }
    },
    computed: {
    }
}
</script>

<style lang='scss' scope>
.stage-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .stage-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    .stage-list-box {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }

    }
}
</style>