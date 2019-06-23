<template>
    <div class="basic-info text-left">
        <div class="flex-row">
            <div class="flex-start head-portrait-info">
                <img :src="detailsData.avatar || 'static/image/defaultAvter.png'"/>
                <div class="user-info">
                    <p>
                        <label>用户名</label>
                        <span>{{detailsData.nickName}}</span>
                    </p>
                    <p>
                        <label>工作年龄</label>
                        <span>{{detailsData.years}}年</span>
                    </p>
                    <p>
                        <label>账户状态</label>
                        <span v-if="detailsData.status == 0">未审核</span>
                        <span v-if="detailsData.status == 4">已审核</span>
                        <span v-if="detailsData.status == 5">面试通过</span>
                        <span v-if="detailsData.status == 6">项目通过</span>
                    </p>
                </div>
            </div>
            <span class="project-status" v-if="applicationData.status == 0">待查看</span>
            <span class="project-status" v-if="applicationData.status == 1">待面试</span>
            <span class="project-status" v-if="applicationData.status == 2">已推荐</span>
            <span class="project-status" v-if="applicationData.status == 3">被拒绝</span>
            <span class="project-status" v-if="applicationData.status == 4">方案待提交</span>
            <span class="project-status" v-if="applicationData.status == 5">已聘用</span>
            <span class="project-status" v-if="applicationData.status == 6">方案待确认</span>
            <span class="project-status" v-if="applicationData.status == 7">阶段待确认</span>
            <span class="project-status" v-if="applicationData.status == 8">进行中</span>
            <span class="project-status" v-if="applicationData.status == 9">已完成</span>
            <span class="project-status" v-if="applicationData.status == 10">阶段待提交</span>
        </div>
        <p class="flex-start mt20" v-html="detailsData.introduction || '该顾问暂未填写个人简介'"></p>
        <div class="flex-start mt20">
            <div class="flex-start">
                <label>所在行业</label>
                <p class="tags flex-1" v-if="detailsData.industryList && detailsData.industryList.length>0">
                    <span v-for="(industryItem,key) in detailsData.industryList" :key="key">{{industryItem.alName}}</span>
                </p>
            </div>
        </div>
        <div class="flex-start mt20">
            <div class="flex-start">
                <label>专业技能</label>
                <p class="tags flex-1 skills" v-if="detailsData.skillList && detailsData.skillList.length>0">
                    <span v-for="(skillListItem,key) in detailsData.skillList" :key="key">{{skillListItem.asName}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        detailsData: {
            type: Object,
            default: {}
        },
        applicationData: {
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
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.basic-info {
    .head-portrait-info {
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-right: 30px;
        }
        .user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                margin-top: 10px;
            }
            label {
                color: #404040;
            }
            span {
                color: #919191
            }
        }
    }
    .project-status {
        display: inline-block;
        width: 100px;
        height: 24px;
        line-height: 24px;
        border-radius:15px;
        background:#FF705F;
        color: #FFFFFF;
        font-size: 14px;
        text-align: center;
    }
    .line3 {
        line-height: 20px;
    }
}

</style>