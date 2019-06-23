<template>
    <div>
        <div class="consultant-projectName-title">
            <DTitle :name="item.projectName" :fontSize="18"/>
        </div>
        <template v-if="item.recommendadviser && item.recommendadviser.length>0">
            <router-link v-for="(adviserItem,key) in item.recommendadviser" 
                :key="key" 
                :to="{path: '/personalCenter/consultantRecommend/'+item.pid+'/consultantDetails/'+adviserItem.uid}">
                <div class="consultant-recommend-list flex-row">
                    <div class="list-left">
                        <img :src="adviserItem.avatar"/>
                    </div>
                    <div class="list-right flex-1 text-left">
                        <div class="flex-row consultant-name-status">
                            <h4>{{adviserItem.nickName}}</h4>
                        </div>
                        <p class="flex-1 line3 mt20" v-html="adviserItem.introduction || '拥有 MBA 学位及 17 年+供应链管理工作经验。曾负责管理宝洁7大品类中3大品类的供应及新产品上市计划。曾任职于多家跨国公司，具备丰富的大中型跨国商业谈判及带领团队开拓中国市场经验。'"></p>
                        <p class="tags flex-1 mt20 skills" v-if="adviserItem.adviserSkill && adviserItem.adviserSkill.length>0">
                            <span v-for="(aSkillItem,i) in adviserItem.adviserSkill" :key="i">{{aSkillItem}}</span>
                        </p>
                        <!-- <p class="tags flex-1 mt20 skills">
                            <span>供应链</span>
                            <span>水力资源与厂方管理</span>
                            <span>人力资源</span>
                        </p> -->
                    </div>
                </div>
             </router-link>
        </template>
        <div class="no-content" v-else>
            <img src="static/image/no-content.png"/>
            <p>当前分类暂为空，等待平台推荐！</p>
        </div>
    </div>
</template>

<script>
import DTitle from '@/components/DTitle'
export default {
    name: 'ConsultantList',
    components: {
        DTitle
    },
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
.consultant-projectName-title {
    padding: 20px 30px;
    padding-bottom: 8px;
}
.consultant-recommend-list {
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
            font-size: 14px;
            color: #666666;
        }
    }
    .consultant-name-status {
        h4 {
            line-height: 22px;
            font-size: 24px;
            color: #120338;
            line-height: 33px;
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
            padding: 0 10px;
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
                font-size: 14px;
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
.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>