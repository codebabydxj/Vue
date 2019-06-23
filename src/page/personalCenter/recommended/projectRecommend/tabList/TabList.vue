<template>
    <div class="table-list">
        <div class="title-status">
            <h4>{{item.projectName}}</h4>
            <p v-if="userType === 0">
                <span class="project-status" v-if="item.status ==1||item.status ==2||
                         item.status ==3||item.status ==6 ||
                         item.status ==7||item.status ==11|| 
                         item.status ==12|| item.status ==13 ||
                         item.status ==14 || item.status ==15">未开始</span>
                <span class="project-status orange" v-if="item.status ==4">进行中</span>
                <span class="project-status gray" v-if="item.status ==5 || item.status ==8||
                        item.status ==9 || item.status ==10">已完成</span>
                <span class="project-status" v-if="item.status ==0">草稿箱</span>
            </p>
            <p v-else>
                <span class="project-status" v-if="item.status ==0">申请中</span>
                <span class="project-status" v-if="item.status ==1">待面试</span>
                <!-- <span class="project-status" v-if="item.status ==2">已推荐</span> -->
                <span class="project-status sourceOrigan" v-if="item.dataSource ==1 || item.dataSource ==3">平台推荐</span>
                <span class="project-status " v-if="item.dataSource ==2 || item.dataSource ==3">客户推荐</span>
                <span class="project-status" v-if="item.status ==3">未采用</span>
                <span class="project-status" v-if="item.status ==4">方案待提交</span>
                <span class="project-status" v-if="item.status ==5">已聘用</span>
                <span class="project-status" v-if="item.status ==6">方案待确认</span>
                <span class="project-status" v-if="item.status ==7">阶段待确认</span>
                <span class="project-status orange" v-if="item.status ==8">进行中</span>
                <span class="project-status gray" v-if="item.status ==9 ||item.status ==11">已完成</span>
                <span class="project-status" v-if="item.status ==10">阶段待提交</span>
            </p>
        </div>
        <!-- <div class="cont-box mt15" v-if="item.type == 1">
            <div class="cont-left">
                <div class="cont-line cont-line2">
                    <label>项目描述</label>
                    <p class="flex-1 line-h20 line3" v-html="item.description"></p>
                </div>
            </div>
        </div> -->
        <!-- <div v-if="item.type == 0"> -->
        <div>
            <div class="cont-box">
                <div class="cont-left">
                    <div class="cont-line cont-line1 mt20">
                        <p class="w192">
                            <label>项目周期</label>
                            <span v-if="item.projectLengthType==0">0-3个月</span>
                            <span v-if="item.projectLengthType==1">3-6个月</span>
                            <span v-if="item.projectLengthType==2">6-12个月 </span>
                            <span v-if="item.projectLengthType==3">其他时间</span>
                        </p>
                        <p>
                            <label>项目地点</label>
                            <span>{{item.city}}</span>
                            <!-- <span>{{item.province}} . {{item.city}}</span> -->
                        </p>
                    </div>
                    <div class="cont-line cont-line2">
                        <label>项目描述</label>
                        <p class="flex-1 line-h20 line3" v-html="item.description"></p>
                    </div>
                    <div class="cont-line cont-line3">
                        <label>发布时间</label>
                        <span v-if="item.releaseTime">{{item.releaseTime | moment}}</span>
                        <span v-if="!item.releaseTime">未发布</span>
                    </div>
                </div>
                <div class="cont-right">
                    <p class="project-budget">项目预算</p>
                    <p class="project-amount" v-if="item.budget">{{ item.budget | ExtenSion}}元</p>
                    <p class="project-amount" v-if="!item.budget">待商议</p>
                </div>
            </div>
            <div class="project-stage" v-if="item.projectStageList&&item.projectStageList.length>0">
                <div class="timeline" v-if="userType === 0">
                    <div v-for="(stageItem,i) in item.projectStageList" :key="i">
                        <p :class="[{ 'completed': stageItem.customerStatus == 7 }, 'round']" v-if="i==0"></p>
                        <p :class="[{ 'completed': stageItem.customerStatus == 7 }, 'line']" v-if="i!=0"></p>
                        <p :class="[{ 'completed': stageItem.customerStatus == 7 }, 'round']" v-if="i!=0"></p>
                    </div>
                </div>
                <div class="timeline" v-else>
                    <div v-for="(stageItem,i) in item.projectStageList" :key="i">
                        <p :class="[{ 'completed': stageItem.adviserStatus == 6 ||stageItem.adviserStatus == 7 }, 'round']" v-if="i==0"></p>
                        <p :class="[{ 'completed': stageItem.adviserStatus == 6 || stageItem.adviserStatus == 7 }, 'line']" v-if="i!=0"></p>
                        <p :class="[{ 'completed': stageItem.adviserStatus == 6 || stageItem.adviserStatus == 7 }, 'round']" v-if="i!=0"></p>
                    </div>
                </div>
                <div class="stage-list">
                    <div class="item-list" v-for="(stageItem,i) in item.projectStageList" :key="i">
                        <div class="stage-list-left">
                            <p class="stage-name">
                                <span class="mr20">第 {{i+1}} 阶段</span>{{stageItem.stageName}}
                            </p>
                        </div>
                        <div class="stage-list-right" v-if="userType === 0">
                            <span v-if="stageItem.customerStatus == 0">待确认</span>
                            <span v-if="stageItem.customerStatus == 1">有异议</span>
                            <span v-if="stageItem.customerStatus == 2">待付款</span>
                            <span v-if="stageItem.customerStatus == 3">待核对付款</span>
                            <span v-if="stageItem.customerStatus == 4">进行中</span>
                            <span v-if="stageItem.customerStatus == 5">待审核</span>
                            <span v-if="stageItem.customerStatus == 6">申请发票</span>
                            <span v-if="stageItem.customerStatus == 7">已完成</span>
                            <span v-if="stageItem.customerStatus == 8">开票中</span>
                            <span v-if="stageItem.customerStatus == 9">交付有异议</span>
                        </div>
                        <div class="stage-list-right" v-else>
                            <span v-if="stageItem.adviserStatus == -1">草稿</span>
                            <span v-if="stageItem.adviserStatus == 0">待确认</span>
                            <span v-if="stageItem.adviserStatus == 1">有异议</span>
                            <span v-if="stageItem.adviserStatus == 2">未开始</span>
                            <span v-if="stageItem.adviserStatus == 3">进行中</span>
                            <span v-if="stageItem.adviserStatus == 4">待审核</span>
                            <span v-if="stageItem.adviserStatus == 5">待收款</span>
                            <span v-if="stageItem.adviserStatus == 6">已完成</span>
                            <span v-if="stageItem.adviserStatus == 7">待平台付款</span>
                            <span v-if="stageItem.adviserStatus == 8">交付有异议</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        i: {
            type: Number,
            default: 1
        },
        item: {
            type: Object,
            default: {}
        },
        userType: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            title: '我的项目',
        }
    },
    created() {
        // console.log(this.$store.state.user,this.item, 'item值')
        
    },
    methods: {
        onTabClick(tab, event) {
            
        },
        onGoProjectDetail(val) {
            this.$router.push({ name: 'customerProjectIndex', params: { id: val }})
        }
    },
     // 将数字转换成货币格式过滤器
     filters:{
        ExtenSion(value) {
            if (value && value != null) {
                value = String(value);
                var left = value.split('.')[0], right = value.split('.')[1];
                // right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                // return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('');
            } else if (value === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            } else {
                return '';
            }
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.table-list {
    padding: 20px 0 20px 30px;
    border-bottom: 1px solid #E0E0E0;
    &:hover {
        background: #fafafa;
    }
    .title-status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        h4 {
            font-size: 16px;
            color: #404040;
            border-left: 3px solid #FF6536;
            padding-left: 8px;
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
            &.sourceOrigan {
                background: #FFA75F;
            }
        }
    }
    .cont-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .cont-left {
            flex: 1;
            text-align: left;
            margin-right: 34px;
            p, span{
                color: #666666;
            }
            label {
                width: 57px;
                margin-right: 20px;
                color: #333333;
            }
            .cont-line {
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                line-height: 20px;
                &.mt20 {
                    margin-top: 18px;
                }
            }
        }
        .cont-right {
            width: 177px;
            height: 100px;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-left: 1px solid #E0E0E0;
            .project-budget {
                line-height: 20px;
                color: #404040;
            }
            .project-amount {
                line-height: 28px;
                font-size: 20px;
                color: #666666;
            }
        }
    }
    .project-stage {
        display: flex;
        flex-direction: row;
        text-align: left;
        line-height: 20px;
        margin-top: 20px;
        .timeline {
                width: 16px;
                align-items: center;
                display: flex;
                flex-direction: column;
                margin-right: 20px;
            p {
                margin: 0;
            }
            .round {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #E0E0E0;
                &.completed {
                    background-color: #FF895F;
                }
            }
            .line {
                width: 2px;
                height: 32px;
                background: #E0E0E0;
                margin-left: 5px;
                &.completed {
                    background-color: #FF895F;
                }
            }
        }
        .stage-list {
            flex: 1;
            .item-list {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                .stage-list-left {
                    .stage-name {
                        color: #666666;
                    }
                }
                .stage-list-right {
                    width: 170px;
                    text-align: center;
                    span{
                        font-size: 12px;
                        color: #FF895F;
                    }
                }
            }
        }
    }
    .mt15 {
        margin-top: 15px;
    }
    .line-h20 {
        line-height: 20px;
    }
}
</style>