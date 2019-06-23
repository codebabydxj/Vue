<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'发票'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div>
            <div class="stage-list-box" v-for="(itemData,i) of invoiceListData" :key="i">
                <router-link :to="{path: '/customerProject/invoice/'+$route.params.pid+'/invoiceDetails/'+itemData.id}" >
                    <InvoiceList :itemData="itemData"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import InvoiceList from './common/InvoiceList'
import { getInvoiceList } from '@/serverApi/project'

export default {
    components: {
        DTitle,
        InvoiceList
    },
    data() {
        return {
            title: '我的项目',
            invoiceListData: [],
            isContent: null
        }
    },
    created() {
        this.getInvoiceListData()
    },
    methods: {
        // 发票列表数据请求
        getInvoiceListData() {
            let params = {pid: this.$route.params.pid, type: -1}
            getInvoiceList(params).then(response => {
                if(response.code == 200) {
                    this.invoiceListData = response.data
                    this.isContent = this.invoiceListData && this.invoiceListData.length>0 ?true:false
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