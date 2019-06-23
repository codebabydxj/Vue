<template>
    <div class="footer-cont">
        <div class="footer-left">
            <img class="qrcode" src="static/image/qrcode.png"/>
            <div class="fonter-left-describe">
                <h4>关注麦盟微信公众号</h4>
                <p>关注我们，浏览顾问独到的战略意见！<br/>磨厉以须，掌控下一个商业变革浪潮！</p>
            </div>
        </div>
        <div class="footer-right">
            <h3>麦盟自由顾问平台</h3>
            <p>
                <!-- <a href="javascript:void(0);">加入我们</a> -->
                <router-link :to="{ path:'/aboutMa' }">
                    <a href="javascript:void(0);">关于麦盟</a>
                </router-link>
                <router-link :to="{ path:'/platformTerms' }">
                    <a href="javascript:void(0);" class="border">平台条款</a>
                </router-link>
            </p>
            <p>Copyright 2019 M&F Advisory. <a style="color:#fff;" href="http://www.miitbeian.gov.cn" target="view_window">粤ICP备18021991号</a></p>
            <p>联系邮箱：contact@mf-tal.com</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'nav-footer',
    components: {
    },
    data() {
        return {
            name: '底部内容',
            activeIndex: 'header-1'
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

.footer-cont {
    height: 100%;
    max-width: 980px;
    margin: 0 auto;
    // color: #fff !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .footer-left {
        display: flex;
        flex-direction: row;
        .fonter-left-describe {
            margin-left: 20px;
            text-align: left;
            h4,p {
                color: #fff;
            }
            h4 {
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 16px;
                margin-top: 8px;
            }
            p {
                line-height: 20px;
                font-size: 12px;
            }
        }
        
        .qrcode {
            width: 108px;
            height: 108px;
        }
    }
    .footer-right {
        text-align: right;
        h3,p,a {
            color: #fff;
        }
        h3 {
            font-size: 24px;
            font-weight:500;
            margin-bottom: 20px;
        }
        a {
            font-size: 12px;
            padding-left: 7px;
            &.border {
                border-left: 1px solid #FBFBFB
            }
        }
        p {
            font-size: 14px;
            margin-bottom: 8px;
        }
    }
}
</style>
