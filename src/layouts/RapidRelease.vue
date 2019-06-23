<template>
    <!-- 快速发布弹框 -->
    <div class="work-dialog rapid-release">
        <el-dialog
        title="快速发布"
        :visible.sync="reapidReleaseVisible"
        width="630px"
        @close="closeDialog"
        :close-on-click-modal="onclickModal"
        center
        >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="发起新项目" prop="description">
                <el-input class="des-textarea" type="textarea" v-model="ruleForm.description" maxlength="300" placeholder="请输入您对项目的描述，字数在300字以内"></el-input>
            </el-form-item>
        </el-form>
        <div class="goRelease"><a href="javascript:void(0);" @click="goFullRelease">前往完整发布>>></a></div>
            <span slot="footer" class="dialog-footer1 ">
                <!-- <el-button type="primary" @click="confirm('ruleForm')"> 发起邀请</el-button> -->
                <el-button type="primary" @click="confirm('ruleForm')"> 发布项目</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Dialog, Form, FormItem, Input, Button, Message } from 'element-ui'
import { getSpeedrelease } from '@/serverApi/personalCenter'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message;

export default {
    name: 'Layout',
    data() {
        return {
            name: '首页内容',
            onclickModal:false,
            ruleForm:{
                description: ''
            },
            rules:{
                description: [
                    { required: true, message: '请输入项目描述', trigger: 'change' }  
                ]
            }
        }
    },
    created() {
        
    },
    methods: {
        confirm(formName) {
            let uid = ''
            let parmas = {description: this.ruleForm.description}
            if(uid) {
                parmas = Object.assign({appoint: uid},parmas)
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    getSpeedrelease(parmas).then(res => {
                        if(res.code ==200) {
                            this.$store.dispatch('hideReleaseDialog')
                            MessageAlert({title:'发布成功',content:'您已成功发布项目！我们将尽快对项目进行审核，审核结果将会以邮件和短信的形式通知您。',okText:'确定'}).then(res => {
                                this.$router.push({path:'/personalCenter/myProject'})
                            }).catch(text => {
                                this.$router.push({path:'/personalCenter/myProject'})
                            })
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 前往完整发布
        goFullRelease() {
            MessageConfirm({
                 title:'切换新的发布方式',
                 content:'切换发布方式之后，部分您已经填写的消息将不会被保存，确定继续前往吗？',
                 okText:'确认',
                 cancelText:'取消'
            }).then(res => {
                this.$store.dispatch('hideReleaseDialog')
                this.$router.push({path:'/PublishProject/0'})
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 关闭弹出框
        closeDialog() {
            this.$store.dispatch('hideReleaseDialog')
            this.$refs['ruleForm'].resetFields()
        }
    },
    watch: {
        
    },
    computed: {
        reapidReleaseVisible: {
            get: function () {
                return this.$store.state.project.reapidReleaseVisible
            },
            set: function () {
            }
        }
       
    }
}
</script>

<style lang='scss'>
.work-dialog {
    .el-dialog--center .el-dialog__body {
        padding: 25px 40px 0 20px;
    }
    .el-dialog__title {
        font-size: 20px;
        color: #333;
        font-weight: 600;
    }
    .el-textarea {
        width: 100%;
        .el-textarea__inner {
            height: 100px;
            padding: 5px 8px;
        }
    }
    .el-dialog__footer {
        padding-bottom: 40px;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color: #000;
        font-size: 20px;
        font-weight: 600;
    }
    .dialog-footer1 {
        .el-button {
            width: 120px;
            height: 32px;
            span {
                display: block;
                margin-top: -4px;
            }
        }
    }
    .goRelease {
        text-align: right;
        // padding-right: 90px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        a {
            color:rgba(255,137,95,1);
            line-height: 20px;
        }
    }  
}
.rapid-release {
    .el-form-item {
        margin-bottom: 6px;
    }
}



</style>
