<template>
    <div class="resou-box">
        <!-- <img :src="'static/image/'+ (id == 1 ? 'word-1.png' : 'word-2.png')"/> -->
        <img :src="'static/image/' + 'word-1.png'" alt="" v-if="id == 1">
        <img :src="'static/image/' + 'word-2.png'" alt="" v-if="id == 2">
        <img :src="'static/image/' + 'word-3.png'" alt="" v-if="id == 3">
        <img :src="'static/image/' + 'word-4.png'" alt="" v-if="id == 4">
        <div class="resou-box-cont" v-if="id == 1">
            <h4>一边是忙碌的工作，一边是更有趣的生活</h4>
            <p class="time">{{this.currentdate}}</p>
            <p class="line-row3">“斜杠青年”来源于英文Slash，出自《纽约时报》专栏作家麦瑞克•阿尔伯撰写的书籍《双重职业…</p>
        </div>
        <div class="resou-box-cont" v-if="id == 2">
            <h4>顾问之路高大上？其实很简单！</h4>
            <p class="time">{{this.currentdate}}</p>
            <p class="line-row3">我没有咨询的工作背景也可以申请吗? 我注册顾问后为什么没有被审核…</p>
        </div>
        <div class="resou-box-cont" v-if="id == 3">
            <h4>“麦盟趣镜”工作，更自由！</h4>
            <p class="time">{{this.currentdate}}</p>
            <p class="line-row3">Hi there! 我们精心策划了两期自由顾问的“麦盟趣镜”活动：…</p>
        </div>
        <div class="resou-box-cont" v-if="id == 4">
            <h4>“麦盟趣镜”自由，更挑战！</h4>
            <p class="time">{{this.currentdate}}</p>
            <p class="line-row3">这一期的“麦盟趣镜”，我们继续为大家带来自由顾问的快速问答分享。 帮助大家近距离了解自由顾问转…</p>
        </div>
        <div class="view-details">
            <span>查看详情</span>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { demandListUrl } from '@/serverApi/common';
export default {
    props: {
        id: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            title: '项目市场',
            currentdate:''
        }
    },
    created() {
        this.getNowFormatDate();
    },
    methods: {
        getNowFormatDate() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.currentdate = year + "年" + month + "月" + strDate + "日";
            return this.currentdate;
        }
    },
    
    computed: {
        
    }
}
</script>

<style lang='scss'>
.resou-box {
    width: 224px;
    height: 310px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius:3px;
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
    .resou-box-cont {
        flex: 1;
        padding: 0 10px;
        h4 {
            line-height: 22px;
            font-size: 16px;
            color: #666666;
            margin-top: 15px;
            max-height: 44px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .time, .line-row3 {
            line-height: 17px;
            font-size: 12px;
            color: #999999;
            margin-top: 5px;
        }
        .line-row3{
            color: #666666;
            margin-top: 10px;
            max-height: 54px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
    }
    
    .view-details {
        line-height: 29px;
        border-top: 1px solid #E0E0E0;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        span,i {
            font-size: 12px;
            color: #FF6536;
        }
        i {
            font-weight: 600;
        }
    }
}
</style>