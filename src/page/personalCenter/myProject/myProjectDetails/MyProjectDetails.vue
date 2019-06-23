<template>
    <div class="cont-box-card project-detail-cont">
        <div class="detail-cont-box">
            <div class="flex-row">
                <DTitle :name="'项目详情'" :fontSize="18"/>
                <a class="project-edit" href="javascript:void(0);" v-if="projectDetailsData.status == 0 || projectDetailsData.status ==7">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                </a>
            </div>
            <div class="flex-row project-name mt20">
                <h4>{{projectDetailsData.projectName || '快速发布的项目'}}</h4>
            </div>
            <div class="flex-start mt20">
                <label>项目描述</label>
                <p class="flex-1" v-html="projectDetailsData.description"></p>
            </div>
            <div class="flex-start mt10 mb20">
                <label></label>
                <p class="flex-1 exp-text">(若该项目有语音记录请前往微信平台进行查看)</p>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import { getProjectDetail } from '@/serverApi/project'
import DTitle from '@/components/DTitle'

export default {
    components: {
        DTitle
    },
    data() {
        return {
            title: '项目详情',
            projectDetailsData: {}
        }
    },
    created() {
        this.getProjectDetails()
    },
    methods: {
        // 项目详情请求
        getProjectDetails() {
            let params = {pid: this.$route.params.pid}
            getProjectDetail(params).then(response => {
                if(response.code==200) {
                    this.projectDetailsData = response.data;
                }
            })
        },
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.project-detail-cont {
    p, span{
        font-size: 14px;
        color: #666666;
        &.exp-text {
            color: #999999;
            line-height: 22px;
        }
    }
    label {
        width: 57px;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        color: #333333;
    }
    .detail-cont-box {
        padding: 20px 30px;
        .project-edit {
            font-size: 14px;
            color: #FF895F;
            i {
                font-size: 16px;
            }
            span {
                color: #FF895F;
            }
        }
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
                background:#FF705F;
                color: #FFFFFF;
                margin-right: 35px;
                &.orange {
                    background: #FF895F;
                }
                &.gray {
                    background: #D9D9D9;
                }
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
    .mb20 {
        margin-bottom: 20px;
    }
}

</style>