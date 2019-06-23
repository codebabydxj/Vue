<template>
    <div class="about-content">
        <div class="about-title">
            <div class="main-cont tlf">
                <h4>关于麦盟</h4>
                <div class="bord"></div>
                <p>ABOUT M&F</p>
                <p class="p16">麦盟致力于为企业客户与自由顾问之间创造一个可以实现双方影响力的价值平台 !</p>
            </div>
        </div>
        <div class="about-center main-cont">
            <div class="about-center-top">
                <p><span class="fbold">「麦盟咨询」</span>旗下的麦盟自由顾问平台（简称MF麦盟）由一群深耕中国市场20年+的专业企业管理咨询顾问共同发起并建立。
                    依靠丰富的专业知识结构，完善的顾问认证体系与项目全过程品质管控，
                    麦盟一直致力于为企业与自由顾问创造一个实现影响力的双向价值平台，
                    通过简洁的流程实现项目供需端的精准对接，帮助企业客户实现可持续的竞争优势。 
                </p>
                <p class="pt30">自创立以来，已有300多位优秀的自由顾问活跃在麦盟平台上，为中国企业提供优质的咨询服务。</p>
            </div>
            <div class="about-center-footer">
                <div class="footer-image">
                    <img src="../../../static/image/about1.png" alt="">
                    <div class="ftext">
                        <h4>我们的愿景</h4>
                        <div class="bord"></div>
                        <p>Our Vision</p>
                        <p class="cf">打造中国最具影响力的管理咨询 <br>自由顾问服务平台</p>
                    </div>
                </div>
                <div class="footer-image">
                    <img src="../../../static/image/about2.png" alt="">
                    <div class="ftext">
                        <h4>我们的价值观</h4>
                        <div class="bord"></div>
                        <p>Our Value</p>
                        <p class="cf">专业+开放+伙伴</p>
                    </div>
                </div>
                <div class="footer-image">
                    <img src="../../../static/image/about3.png" alt="">
                    <div class="ftext">
                        <h4>我们的使命</h4>
                        <div class="bord"></div>
                        <p>Our Mission</p>
                        <p class="cf">分享全球领先实践 <br> 成就客户企业价值</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="about-fotter main-cont">
            <p class="dsy">
                <span>
                    <img src="../../../static/image/Logo.svg" alt="">
                </span>
                <span class="imgpt">联系我们</span>
            </p>
            <p>联系电话：(0755) 8695 9936</p>
            <p>联系邮箱：contact@mf-tal.com</p>
            <p>办公地点：广东省深圳市南山区香港中文大学深圳研究院</p>
            <p>服务时间：周一至周五 9:00 a.m. - 6:00 p.m.</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    data() {
        return {
            title:'关于麦盟'
        }
    }
}
</script>

<style lang="scss">
.about-content {
    background: #fff;
    margin-top: 80px;
    .main-cont {
        max-width: 960px;
    }
    .about-title {
        width: 100%;
        height: 250px;
        background-image: url('../../../static/image/about.png');
        .tlf {
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
                border: 2px solid #FF6536;
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
            }
        }
    }
    .about-center {
        margin-top: 20px;
        .about-center-top {
            height: 100px;
            text-align: left;
            p {
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:20px;
                .fbold {
                    font-weight: 600 !important;
                }
            }
            .pt30 {
                padding-top: 20px;
            }
        }
        .about-center-footer {
            display: flex;
            justify-content: space-around;
            margin: 80px 0;
            height: 280px;
            .footer-image {
                width: 280px;
                height: 100%;
                margin-left: -55px;
                img {
                    width: 100%;
                    height: 100%;
                }
                .ftext {
                    text-align: left;
                    position: relative;
                    top: -230px;
                    left: 20px;
                    h4 {
                        font-size:16px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height:22px;
                    }
                    .bord{
                        width: 14px;
                        border: 2px solid #FF6536;
                        // margin-top: 12px;
                    }
                    p {
                        font-size:12px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        line-height:17px;
                    }
                    .cf {
                        // width: 224px;
                        // height: 44px;
                        font-size:16px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height:22px;
                        margin-top: 28px;
                    }
                }
            }
        }
    }
    .about-fotter {
        height: 110px;
        text-align: left;
        padding-bottom: 67px;
        p {
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:22px;
        }
        .dsy {
            display: flex;
            align-items: center;
            span {
                display: inline-block;
                height: 15px;
                img {
                    height: 100%;
                }
            }
            .imgpt {
                margin-top: -10px;
                margin-left: 2px;
            }
        }
    }
}
</style>


