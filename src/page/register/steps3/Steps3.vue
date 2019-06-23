<template>
    <div class="regist-cont">
        <div class="success-cont">
            <h4 class="form-title">欢迎加入麦盟咨询</h4>
            <p class="rich-title">已成为{{$route.params.type == 1 ? '顾问':'客户'}}</p>
            <div class="line"></div>
            <p class="focus-on-tips" v-if="$route.params.type == 1">关注麦盟微信公众号，随时随地查看新项目</p>
            <p class="focus-on-tips" v-else>关注麦盟微信公众号，灵活预约顾问专家！</p>
            <div class="qr-code">
                <img src="static/image/qrcode.png">
            </div>
            <el-button type="primary" @click="goHome">进入麦盟</el-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
Vue.use(Button)

export default {
    data() {
        return {
            title: '注册-3',
            checked: false,
            
        }
    },
    created() {
        // console.log(this.$route.params.type, '------------')
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'home', params: { type: this.$route.params.type }})
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.regist-cont {
    max-width: 940px;
    margin: 0 auto;
    padding-top: 40px;
    margin-top: 80px;
    .success-cont {
        width: 460px;
        height: 507px;
        background: rgba(255,255,255,1);
        box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.2);
        border-radius: 3px;
        padding: 40px 50px;
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .form-title {
            text-align: center;
            font-size: 24px;
            color: #333333;
        }
        .rich-title {
            font-size: 16px;
            color: #666666;
            margin-top: 14px;
        }
        .line {
            width: 100%;
            height: 1px;
            background: rgba(224,224,224,1);
            margin-top: 25px;
            margin-bottom: 16px;
        }
        .focus-on-tips {
            font-size: 14px;
            color: #333333;
        }
        .qr-code {
            width: 180px;
            height: 180px;
            margin-top: 15px;
            box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.2);
            img {
                width: 100%;
            }
        }
        .el-button {
            width: 100%;
            height: 46px;
            margin-top: 60px;
            span {
                font-size: 18px;
                color: #FBFBFB;
            }
        }
    }
    
}
</style>    