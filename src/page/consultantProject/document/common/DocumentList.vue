<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <h4>{{itemData.name}}</h4>
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left w100">
                <div class="flex-start mt20">
                    <p class="w192">
                        <label>上传时间</label>
                        <span>{{itemData.createTime | moment}}</span>
                    </p>
                    <p class="w192">
                        <label>文档类型</label>
                        <span v-if="itemData.type == 0">交付物</span>
                        <span v-if="itemData.type == 1">其他文档</span>
                    </p>
                    <p>
                        <label>对应阶段</label>
                        <span>第{{itemData.stageSort}}阶段</span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <label>文档描述</label>
                    <p class="flex-1" v-html="itemData.introduction"></p>
                </div>
                <div class="flex-start mt20">
                    <div class="flex-items-center flex-1">
                        <label>文档附件</label>
                        <span>{{itemData.sourceName}}</span>
                        <p class="flex-1 text-right"><el-button class="btn-w60" type="primary" :url="itemData.deliverableUrl" @click="onDownUrl(itemData.deliverableUrl)">下载</el-button></p>
                    </div>
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
        // 下载文件
        onDownUrl(url) {
            if(!url || url.substr(0,4) != "http"){
                this.$message.warning('下载的文件为空');
                return;
            }
            window.location.href = url;
        }
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
    }
    .program-box-cont {
        .program-cont-left {
            &.w100 {
                width: 100%;
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
            .btn-w60 {
                width: 60px;
                height: 24px;
                line-height: 24px;
                border-radius: 3px;
                padding: 0;
                span {
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
    }
    .text-right {
        text-align: right;
    }
    .flex-items-center {
        display: flex;
        align-items: center;
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