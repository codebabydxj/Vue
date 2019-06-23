<template>
    <div class="consultant-market-list flex-row">
        <div class="list-left">
            <img :src="item.avatar"/>
        </div>
        <div class="list-right flex-1 text-left">
            <div class="flex-row consultant-name-status">
                <h4>{{item.adviserName}}</h4>
            </div>
            <p class="flex-1 line3 mt20" v-html="item.introduction || '该顾问暂未填写个人简介'"></p>
            <p class="tags flex-1 mt20 skills" v-if="item.skillList && item.skillList.length>0">
                <span v-for="(aSkillItem,i) in item.skillList" :key="i">{{aSkillItem.asName}}</span>
            </p>
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
            title: '顾问列表信息'
        }
    },
    created() {
    },
    methods: {
        
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.consultant-market-list {
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 2px 0px rgba(0,0,0,0.2);
    border-radius:1px;
    margin-bottom: 20px;
    padding: 20px 30px;
    padding-bottom: 27px;
    font-size: 14px;
    .list-left {
        margin-right: 20px;
        img {
            width: 65px;
            height: 65px;
            border-radius: 50%;
        }
        
    }
    .list-right {
        line-height: 20px;
        p {
            color: #666666;
            &.line3 {
                height: 60px;
            }
        }
    }
    .consultant-name-status {
        h4 {
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
.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>