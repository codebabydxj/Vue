<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <h4>{{itemData.projectName}}</h4>
            <span class="project-status" v-if="itemData.mesStatus == 0">未查看</span>
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left w100pc">
                <div class="flex-start mt20">
                    <p class="flex-1">
                        <label>消息类型</label>
                        <span>{{itemData.message}}</span>
                    </p>
                    <p class="flex-1">
                        <label>整体进度</label>
                        <span v-if="itemData.params && itemData.params.stageSort">第{{itemData.params.stageSort}}阶段</span>
                        <span v-if="!itemData.params || !itemData.params.stageSort">未开始</span>
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
            title: '消息中心'
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
            background:#FF895F;
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
            &.w100pc {
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