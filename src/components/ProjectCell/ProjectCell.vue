<template>
    <div class="cell-content">
         <el-card class="box-card card-content">
            <div class="card-left">
                <div class="card-title">
                    <h4>{{cellItem.projectName}}</h4>
                </div>
                <div class="card-label project-date">
                    <div class="card-label m0">
                        <span class="label">项目周期</span>
                        <span class="label-text" v-if="cellItem.projectLengthType == 0">0-3个月</span>
                        <span class="label-text" v-if="cellItem.projectLengthType == 1">3-6个月</span>
                        <span class="label-text" v-if="cellItem.projectLengthType == 2">6-12个月</span>
                        <span class="label-text" v-if="cellItem.projectLengthType == 3">其他时间</span>
                    </div>
                    <div class="card-label m0">
                        <span class="label">项目地点</span>
                        <span class="label-text">{{cellItem.province}} <span v-if="cellItem.province && cellItem.city">.</span> {{cellItem.city}}</span>
                    </div>
                </div>
                <div class="card-label">
                    <span class="label">项目描述</span>
                    <span class="label-text row3" v-html="cellItem.description"></span>
                </div>
                <div class="card-label">
                    <span class="label">发布时间</span>
                    <span class="label-text">{{cellItem.releaseTime | moment }}</span>
                </div>
                
            </div> 
            <span class="card-center mr30"></span>
            <div class="card-right mr30" >
                <h4 class="h4">项目预算</h4>
                <p v-if="cellItem.budget" class="cellItem-money">
                    <span class="budget">{{cellItem.budget | ExtenSion}}元</span>
                </p>
                <p v-if="!cellItem.budget" class="cellItem-money">
                    <span class="budget">待商议</span>
                </p>
            </div>
         </el-card>
    </div>
</template>

<script>
import Vue from 'vue';
import {Card} from 'element-ui';
Vue.use(Card)
export default {
    name: 'ProjectCell',
    props: {
        cellItem: {
            type: Object,
            default:[]
        }
    },
    created() {
        
    },
    methods:{
        // change:function(content){
        //     content = content.replace(/;/g,";</br>");
        //     content = content.replace(/；/g,"；</br>");
        //     return content;
        // }
    },
    filters:{
        ExtenSion(value) {
            if (value && value != null) {
                value = String(value);
                var left = value.split('.')[0], right = value.split('.')[1];
                right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
            } else if (value === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            } else {
                return '';
            }
        }
    }
}
</script>

<style lang="scss">
    .cell-content {
        .box-card {
            text-align: left;
            .el-card__body{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .card-left {
                    .card-title {
                        height: 15px;
                        line-height: 15px;
                        border-left: 3px solid #FF6536;
                        h4 {
                            height: 28px;
                            margin: -2px 0 0 0;
                            padding-left: 10px;
                            color: #404040;
                            font-size: 18px;
                            font-weight: 600;
                            font-style: PingFangSC;
                            font-weight: Medium;
                                    
                        }
                    }
                    .card-label {
                        margin-top: 20px;
                        line-height: 22px;
                        display: flex;
                        .label {
                            display: block;
                            color: #404040;
                            font-size: 16px;
                            font-weight: Regular;
                            font-style: PingFangSC;
                            text-align: left;
                            width: 70px;
                        }
                        .label-text {
                            display: block;
                            color: #666666;
                            font-size: 16px;
                            font-style: PingFangSC;
                            font-weight: Regular;
                            text-align: left;
                            margin-left: 10px; 
                        }
                        .row3 {
                           display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                            line-height: 22px;
                            width: 440px;
                        }
                    }
                     .project-date {
                        display: flex;
                        justify-content: space-between;
                        .m0 {
                            margin-top:0 ;
                            margin-right: 50px;
                        }
                    }
                }
                .card-center {
                    display: block;
                    height: 132px;
                    border-left: 1px solid #E0E0E0;
                }
                .card-right {
                    .h4 {
                        color: #404040;
                        font-size: 20px;
                        font-weight:500;
                        font-family: PingFangSC-Medium;
                        margin: 0;
                        text-align: center;
                        padding: 0px 20px;
                    }
                    .cellItem-money {
                        font-size:20px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(64,64,64,1);
                        .budget {
                            display: block;
                            font-size:20px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            margin-top: 20px;
                            color:rgba(255,137,95,1);
                            text-align: center;
                        }
                    }
                }
                .mr30 {
                    margin-right: 30px;
                }
            }
        }
        .el-card {
            margin-bottom: 20px;
        }
        .el-tab-pane {
            margin-left: 15px;
        }
    }
</style>

