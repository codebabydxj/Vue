<template>
    <div class="resources-content">
        <div class="market-title">
            <div class="img">
                <img src="../../../static/image/zhiyuan.png" alt="">
            </div>
            <div class="market-title-cont-bg">
                <div class="main-cont tlf">
                    <h4>平台资源</h4>
                    <div class="bord"></div>
                    <p>OUR RESOURCES</p>
                    <p class="p16">多位行业与学术界领军人物加入麦盟智库，为客户提供前沿行业洞察与专业指导建议!</p>
                </div>
            </div>
        </div>
        <div class="resources-center main-cont">
            <div class="resources-box">
                <div class="resou-box-home">
                    <img src="static/image/word-0.jpg"/>
                    <div class="content">
                        <h4>麦盟自由顾问精英聚居地</h4>
                        <p class="time mt10">2018年11月28日</p>
                        <p class="line-row4 mt20">麦盟是提供中国管理咨询自由顾问资源的专业服务平台。麦盟力争于为自由顾问提供简洁的项目对接流程，为企业客户提供可持续的竞争优势，确保项目双方精准对接。…</p>
                    </div>
                    <div class="view-details">
                        <span>查看详情</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="resou-box-secondary">
                    <ResourcesBox class="ml20" :id="1"/>
                    <ResourcesBox class="ml20" :id="2"/>
                    <ResourcesBox class="ml20 mt20"  :id="3"/>
                    <ResourcesBox class="ml20 mt20"  :id="4"/>
                </div>
            </div>
            <div class="resources-box resources-list">
                <ResourcesBox class="list-li" :id="3"/>
                <ResourcesBox class="list-li" :id="4"/>
                <ResourcesBox class="list-li" :id="1"/>
                <ResourcesBox class="list-li" :id="2"/>
            </div>
            <div class="load-btn">
                <el-button type="primary" class="w130-btn">加载更多</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { demandListUrl } from '@/serverApi/common';
import ResourcesBox from './common/ResourcesBox'
export default {
    components:{
        ResourcesBox
    },
    data() {
        return {
            title: '项目市场',
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
.resources-content {
    .main-cont {
        max-width: 960px;
    }
    .market-title {
        width: 100%;
        height: 250px;
        position: relative;
        top: 80px;
        .img {
             position: absolute;
             z-index: 0;
            img {

                width: 100%;
                height: 250px;
            }
        }
        .market-title-cont-bg{
            position: absolute;
            right: 0;
            left: 0;
        }
        // background-image: url('../../../static/image/zhiyuan.png');
        .tlf {
            // position: relative;
            // top: -196px;
            text-align: left;
            h4 {
                color: #333333;
                font-size:32px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                padding-top: 50px;
                }
            .bord{
                width: 40px;
                height: 4px;
                background-color: #FF6536;
                margin-top: 12px;
            }
            p {
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color: #666666;
                margin-top: 12px;
                line-height: 22px;
            }
            .p16 {
                margin-top: 20px;
                font-size: 18px;
                line-height: 24px;
                color: #999999;
            }
        }
    }
    .resources-center {
        margin-top: 80px;
        .resources-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .resou-box-home {
                width: 470px;
                background: rgba(255,255,255,1);
                box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
                border-radius: 3px;
                text-align: left;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                -webkit-transition: all 0.3s ease;
                -moz-transition: all 0.3s ease;
                -o-transition: all 0.3s ease;
                transition: all 0.3s ease;
                &:hover {
                    transform: translateY(-6px);
                    -webkit-transform: translateY(-6px);
                    -moz-transform: translateY(-6px);
                    box-shadow: 0 26px 40px -10px rgba(0, 36, 100, 0.3);
                    -webkit-box-shadow: 0 26px 40px -10px rgba(0, 36, 100, 0.3);
                    -moz-box-shadow: 0 26px 40px -10px rgba(0, 36, 100, 0.3);
                    -webkit-transition: all 0.3s ease;
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                }
                img {
                    width: 100%;
                }
                .content {
                    flex: 1;
                    padding: 0 20px;
                    h4 {
                        margin-top: 30px;
                        line-height: 45px;
                        font-size: 32px;
                        color: #666666;
                        max-height: 45px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .time, .line-row4 {
                        line-height: 24px;
                        font-size: 18px;
                        color: #999999;
                    }
                    .line-row4{
                        line-height: 28px;
                        font-size: 20px;
                        color: #666666;
                        max-height: 112px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                        overflow: hidden;
                    }
                }
                .view-details {
                    line-height: 53px;
                    border-top: 1px solid #E0E0E0;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    span,i {
                        font-size: 20px;
                        color: #FF6536;
                    }
                    i {
                        font-weight: 600;
                    }
                }
                
            }
            .resou-box-secondary {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-evenly;
                flex: 1;
                .ml20 {
                    margin-left: 20px
                }
            }
            &.resources-list {
                .list-li {
                    margin-top: 20px;
                }
            }
        }
        .load-btn {
            margin-top: 60px;
            margin-bottom: 100px;
            .el-button {
                width: 130px;
                height: 46px;
                border-radius: 3px;
                span {
                    font-size: 18px;
                }
            }
        }
        
    }
    .mt10 {
        margin-top: 10px;
    }
}
</style>