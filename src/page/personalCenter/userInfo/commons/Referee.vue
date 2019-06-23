<template>
    <!-- 推荐人资料 -->
    <div class="Referee-content">
        <div class="RefereeItem mt20">
            <div class="showEditor">
                <div class="consultant-title">推荐人资料</div>
                <div class="work-Time referShow" v-if="!userInfo.recommenderName && !userInfo.recommenderPhone">
                    <span class="label colorFF6536" @click="referEdit(refereeItem)"><i class="el-icon-bianji icon"></i>编辑</span>
                    <!-- <span class="label-text colorFF6536" @click="referDle()"><i class="el-icon-delete"></i>删除</span> -->
                </div>
            </div>
            <div class="NameTime">
                <div class="person-Name">
                    <label class="label">推荐人</label>
                    <span class="label-text">{{userInfo.recommenderName}}</span>
                </div>
                <div class="person-phone">
                    <label class="label w70">推荐人电话</label>
                    <span class="label-text">{{userInfo.recommenderPhone}}</span> 
                </div>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="addPlayInfo-dialog">
            <el-dialog
                title="推荐人资料"
                :visible.sync="RecommenderInfoDlog"
                width="630px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="推荐人" prop="recommenderName" class="recommendInfo">
                        <el-input v-model="ruleForm.recommenderName" autocomplete="off" placeholder="请输入推荐人" class="w200"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人电话" prop="recommenderPhone" class="recommenderPhoneInfo">
                        <el-input v-model.number="ruleForm.recommenderPhone" autocomplete="off" placeholder="请输入推荐人电话" class="w200"></el-input>
                    </el-form-item>
                    <div class="text">（推荐人信息提交后不可修改）</div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="referCancel('ruleForm')" class="bdf37">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm') " class="bdf36">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    
</template>

<script>
import Vue from 'vue'
import { editUserUrl, bindRecommenderUrl, getUserByTokenUrl } from '@/serverApi/personalCenter';
export default {
    props:['refereeItem'],
    data() {
        var validateNickName = (rule, value, callback) =>{
            let strs=value.replace(/(^\s+)|(\s+$)/g, ""),
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
                regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
            if(!value) {
                callback(new Error('请输入推荐人'));
            } else if(!strs.match(/^[\u4e00-\u9fa5a-zA-Z]{2,4}$/)) {
                callback(new Error('推荐人只能输入2到4个字'));
            }else if(regCn.test(value) || regEn.test(value)) {
                callback(new Error('推荐人不能带有特殊字符'));
            }else {
                callback();
            }
        };
        var validatePhone = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[357894]\d{9}))$/;
            if(!value) {
                callback(new Error('请输入电话号码'));
            }else if (!regPhone.test(value)) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        return {
            // editShow:false,
            RecommenderInfoDlog:false,
            showClos:false,
            userInfo:{},
            onclickModal:false,
            ruleForm:{
                recommenderName:'',
                recommenderPhone:''
            },
            rules:{
                recommenderName:[
                    { required: true, validator: validateNickName, trigger: 'change' }
                ],
                recommenderPhone:[
                    { required: true, validator: validatePhone, trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.getUserByTokenData();
    },
    methods:{
        // onEditShow() {
        //     this.editShow = true;
        // },
        // offEditShow() {
        //     this.editShow = false;
        // },
        referEdit(data) {
            this.RecommenderInfoDlog =true;
        },
        referCancel(formName) {
            this.$refs[formName].resetFields();
            this.RecommenderInfoDlog =false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    bindRecommenderUrl(this.ruleForm).then(res => {
                        if(res.code == 200 ) {
                            this.RecommenderInfoDlog = false;
                            this.getUserByTokenData()
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 获取用户信息
        getUserByTokenData() {
            getUserByTokenUrl().then(res => {
                if(res.code == 200) {
                    this.userInfo = res.data;
                }
            }) 
        }
    }
}
</script>

<style lang="scss">
    .Referee-content {
        .RefereeItem {
            // padding:0 30px;
            border-top: 1px solid #E0E0E0;
            // padding-top: 20px;
            padding-bottom: 0 !important;
            border-bottom: none;
            .consultant-title {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                padding-left: 8px;
            }
            .NameTime {
                display: flex;
                padding:0 30px;
                align-items: center;
                .person-Name {
                    width: 250px;
                }
                .person-phone {
                    margin-left: 120px;
                    margin-right: -70px;
                    padding-top: 20px;
                }
            }
            .work-Time {
                display: none;
            }
            &:hover {
                .NameTime {
                    background:rgba(248,248,248,1);
                }
                .work-Time {
                    display: block;
                     padding-right: 40px;
                     cursor:pointer;
                }
            }
            .showEditor {
                padding:10px 30px 0;
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .colorFF6536 {
                    color: #FF6536;
                }
                // .referShow {
                   
                // }
            }
        }
        .label {
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            width: 57px;
            display: inline-block;
        }
        .label-text {
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            padding-left: 20px;
        }
        .w70 {
            width: 70px;
        }
        .mt20 {
            margin-top: 20px;
        }
        .addPlayInfo-dialog {
             .el-dialog__header {
                text-align: left;
                .el-dialog__title {
                    border-left: 2px solid #FF6536;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(64,64,64,1);
                    padding-left: 5px;
                    display: inline-block;
                    height: 15px;
                    line-height: 15px;
                }
            }
            .backbor {
                height:1px;
                background:rgba(224,224,224,1);
            }
            .el-button  {
                width:120px;
                height:32px;;
                border-radius:4px;
                background: #fff;
                margin-bottom: 40px;
                span {
                    display: block;
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    letter-spacing:2px;
                    // margin-top: -4px;
                }
            }
            .bdf37 {
                border: 1px solid #FF6536;
                span {
                    color: #FF6536;
                }
            }
            .bdf36 {
                background: #ff6536;
                border: 1px solid #FF6536;
                margin-left: 30px;
            }
            .el-dialog__body {
                padding: 0px 0px 0px;
            }
            .el-form {
                margin: 20px 60px 0 30px;
            }
            .el-form-item__label {
                text-align: left;
            }
            .el-input {
                left: 0 !important;
            }
            .el-input__inner {
                height: 30px;
            }
            .text {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(191,191,191,1);
                padding-left:96px;
                padding-bottom: 10px;
                // margin-top: -15px;
            }
            .mf20 {
                margin-left: 20px;
                border-left: 1px solid #dcdfe6;
            }
            .w200 {
                width: 200px;
            }
            .icon {
                padding-right: 5px;
            }
            // .recommendInfo.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right:-47px;
            // }
            // .recommenderPhoneInfo.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right:-75px;
            // }
        }
    }
</style>
