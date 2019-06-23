<template>
    <div class="attach-content">
        <div class="recommend mt20 bt0 pl20">
            <div class="clearfix pr20">
                <div class="consultant-title">附件简历</div>
                <!-- <div class="showlog">
                    <span class="f14" @click="setShow(0)" v-if="isShow==1"><i class="el-icon-display"></i>
                        <span>已显示</span>
                    </span>
                    <span class="f14" @click="setShow(1)" v-if="isShow==0"><i class="el-icon-hide"></i>
                        <span>已隐藏</span>
                    </span>
                </div> -->
            </div>
            <div class="mt20">李管舟附件简历</div>
            <div class="add mt20">
                <span><i class="el-icon-circle-plus"></i></span>
                <span>添加附件简历</span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { getAdviserDetailUrl } from '@/serverApi/personalCenter';
import {  Card, Button, Icon, Dialog, Input, Checkbox, Col, DatePicker,Form, FormItem, Option, Select, Upload  } from 'element-ui';
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Select);
Vue.use(Upload);
export default {
    props:['isShow'],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
    .attach-content {
        .recommend {
            border-top: 1px solid #E0E0E0;
            border-bottom: 1px solid #E0E0E0;
            padding-top: 20px;  
            padding-bottom: 20px;
            .consultant-title {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                padding-left: 5px;
            }
            .NameTime {
                display: flex;
                .person-Name {
                    width: 250px;
                }
                .work-Time {
                    margin-left: 120px;
                    margin-right: -70px;
                }
            }
            .add {
                text-align: center;
               span {
                    color:  #FF895F;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
               }
            }
        }
        .showlog {
            span {
                color: #FF6536;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
            }
            .f14 {
                font-size:10px !important;
            }
        }
        .bt0 {
            border-bottom: 0;
        }
        .mt20 {
            margin-top: 20px;
        }
        .pl20 {
            padding-left: 20px;
        }
        .pr20 {
            padding-right: 20px;
        }
    }
</style>