<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'文档列表'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div>
            <div class="stage-list-box" v-for="(itemData,i) of documentData" :key="i">
                <!-- <router-link :to="{path: '/customerProject/stage/stageDetails/'+(i+1)}" > -->
                    <DocumentList :itemData="itemData"/>
                <!-- </router-link> -->
            </div>
        </div>
        <!-- <p class="status-btn mt20">
            <el-button type="primary">上传附件文档</el-button>
            <el-button type="primary" class="disable">等待顾问修改中</el-button>
        </p> -->
    </div>
</template>

<script>
import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import DocumentList from './common/DocumentList'
import { getCustomerDocumentList } from '@/serverApi/project'

export default {
    components: {
        DTitle,
        DocumentList
    },
    data() {
        return {
            title: '我的项目',
            documentData: [],
            isContent: null
        }
    },
    created() {
        this.getDocumentData();
    },
    methods: {
        // 文档列表数据请求
        getDocumentData() {
            getCustomerDocumentList({pid: this.$route.params.pid,type:-1}).then(response => {
                if(response.code == 200) {
                    this.documentData = response.data
                    this.isContent = this.documentData && this.documentData.length>0 ?true:false
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
    .status-btn {
        padding-bottom: 60px;
        .el-button {
            width:260px;
            height:45px;
            border-radius:3px;
            span {
                font-size: 18px;
                color: #fff;
            }
            &.disable {
                background:rgba(217,217,217,1);
                border-color: #d9d9d9;
                cursor: auto;
            }
            &.btn-border {
                border: 1px solid rgba(255,101,54,1);
                span {
                    color: #FF6536;
                }
            }
            
        }
    }
}
</style>