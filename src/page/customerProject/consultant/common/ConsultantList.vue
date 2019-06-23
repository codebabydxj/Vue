<template>
    <div class="consultant-common-box">
        <div class="consultant-list flex-row">
            <div class="list-left">
                <img :src="item.avatar ||　'static/image/defaultAvter.png'"/>
            </div>
            <div class="list-right flex-1 text-left">
                <div class="flex-row consultant-name-status">
                    <h4>{{item.nickName}}</h4>
                    <span class="project-status" v-if="item.astatus == 1">待面试</span>
                    <span class="project-status" v-if="item.astatus == 2">待查看</span>
                    <span class="project-status" v-if="item.astatus == 3">被拒绝</span>
                    <span class="project-status" v-if="item.astatus == 4">方案待提交</span>
                    <span class="project-status" v-if="item.astatus == 5">已聘用</span>
                    <span class="project-status" v-if="item.astatus == 6">方案待确认</span>
                    <span class="project-status" v-if="item.astatus == 7">阶段待确认</span>
                    <span class="project-status" v-if="item.astatus == 8">进行中</span>
                    <span class="project-status" v-if="item.astatus == 9">已完成</span>
                    <span class="project-status" v-if="item.astatus == 10">阶段待提交</span>
                </div>
                <p class="flex-1 line3 mt20" v-html="item.introduction"></p>
                <p class="tags flex-1 mt20 skills" v-if="item.adviserSkill && item.adviserSkill.length>0">
                    <span v-for="(aSkillItem,i) in item.adviserSkill" :key="i">{{aSkillItem}}</span>
                </p>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'ConsultantList',
    props: {
        i: {
            type: Number,
            default: 1
        },
        item: {
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
.consultant-common-box {
    .consultant-list {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        .list-left {
            margin-right: 20px;
            
            img {
                width: 64px;
                height: 64px;
                border-radius: 50%;
            }
            
        }
        .list-right {
            line-height: 20px;
            p {
                color: #666666;
            }
        }
        .consultant-name-status {
            h4 {
                line-height: 22px;
                font-size: 24px;
                color: #120338;
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
        }
        .tags {
            span {
                color: #FFA75F;
                padding: 0 15px;
                border-right: 1px solid #E0E0E0;
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    border-right: none;
                }
            }
            &.skills {
                span{
                    color: #FF895F;
                }
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
}

.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>