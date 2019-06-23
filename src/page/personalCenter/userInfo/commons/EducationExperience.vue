<template>
<!-- 教育经历 -->
    <div class="education-content"  >
        <div class="recommend mt20 bt0">
            <div class="clearfix">
                <div class="consultant-title">教育经历</div>
                <div class="showlog">
                    <span class="f14" @click="setShow(0)" v-if="isShow == 1"><i class="el-icon-display"></i>
                        <span>已显示</span>
                    </span>
                    <span class="f14" @click="setShow(1)" v-if="isShow == 0"><i class="el-icon-hide"></i>
                        <span>已隐藏</span>
                    </span>
                </div>
            </div>
            <div class="educationInfo" v-for="(item,index) in educationItem" :key="index">
                <div class="showEditor">
                   <div>
                        <label class="label">学校</label>
                        <span class="label-text">{{item.schoolName}}</span>
                    </div>
                    <div class="work-Time">
                        <span class="label colorFF6536" @click="showDlog(item)"><i class="el-icon-bianji icon"></i>编辑</span>
                        <span class="label-text colorFF6536" @click="delEducation(item)"><i class="el-icon-delete icon"></i>删除</span>
                    </div> 
                </div>
                <div class="mt20">
                    <label class="label">起止日期</label>
                    <span class="label-text">{{item.startTime | moment}}</span>
                    <span> - </span>
                    <span class="label-text pl0">{{item.endTime | moment}}</span>
                </div>
                <div class="mt20">
                    <label class="label">专业名称</label>
                    <span class="label-text">{{item.profession}}</span>
                    <span class="label-text" v-if="!item.profession">未填写</span>
                </div>
                <div class="mt20">
                    <label class="label">学历</label>
                    <span class="label-text" v-if="item.degree == 0">博士</span>
                    <span class="label-text" v-if="item.degree == 1">硕士</span>
                    <span class="label-text" v-if="item.degree == 2">本科</span>
                </div>
            </div>
        </div>
        <div class="add" @click="showDlog(null)">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加教育经历</span>
        </div>
         <!-- 教育经历弹框 -->
        <div class="work-dialog">
                <el-dialog
                title="教育经历"
                :visible.sync="dialogVisible"
                width="630px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="学校名称" prop="schoolName">
                        <el-input v-model="ruleForm.schoolName" autocomplete="off" placeholder="请输入学校名称" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="起止日期" required >
                        <el-col :span="11">
                            <el-form-item prop="startTime">
                                <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="endTime">
                                <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="专业名称 " prop="profession">
                        <el-input v-model="ruleForm.profession" autocomplete="off" placeholder="请输入专业名称" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="学历" prop="degree" class="edurequird">
                        <el-select v-model="ruleForm.degree" placeholder="请选择学历" class="w200">
                            <el-option label="博士" value="0"></el-option>
                            <el-option label="硕士" value="1"></el-option>
                            <el-option label="本科" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isDisable">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 删除弹框 -->
        <div class="delete-dialog">
            <el-dialog
                title="提示"
                :visible.sync="deleteDialogShow"
                width="400px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <!-- <div class="backbor"></div> -->
                <div class="center">确认要删除吗？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteCancel" class="delete-cancel">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()">确 定</el-button>
                </span>
            </el-dialog>
        </div> 
    </div>
</template>

<script>
import Vue from 'vue'
import { getAdviserDetailUrl, addOrEditEducationalExpUrl, delEducationalExpUrl } from '@/serverApi/personalCenter';
import {  Card, Button, Icon, Dialog, Input, Checkbox, Col, DatePicker,Form, FormItem, Option, Select, Upload  } from 'element-ui';
import { setTimeout } from 'timers';
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
export default {
    props:['educationItem', 'isShow', 'getUpdateDisplayProperty', 'release'],
    data() {
        let endTimeValidate = (rule, value, callback) => {
            if(Date.parse(this.ruleForm.endTime)<= Date.parse(this.ruleForm.startTime)){
                callback(new Error('选择的时间期间不正确'))
            }else{
                callback();
            }
        };
        return {
            dialogVisible: false,
            showClos:false,
            editShow:false,
            educationalData:{},
            degreeType:'',
            deleteDialogShow:false,
            aeeid:'',
            onclickModal:false,
            isDisable:false,
            ruleForm:{
                schoolName:'',
                startTime:'',
                endTime:'',
                profession:'',
                degree:''
            },
            rules:{
                schoolName:[
                    { required: true, message: '请输入学校名称' }
                ],
                startTime: [
                    {  required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, validator:endTimeValidate, trigger: 'change' }
                ],
                profession: [
                    { required: true, message: '请输入专业名称', trigger: 'change' }
                ],
                degree: [
                    { required: true, message: '请选择学历', trigger: 'change' }
                ],
            }
        }
    },
    created() {
    },
    computed:{},
    methods:{
        showDlog(data) {
            this.educationalData = (data ? data : {});
            this.ruleForm = JSON.parse(JSON.stringify(this.educationalData));
            this.dialogVisible = true; 
            if(data) {
                this.ruleForm = Object.assign({},this.ruleForm,{
                    degree:String(data.degree)
                })
            }
            
        },
        // 删除 
        delEducation(data) {
            this.aeeid = data.aeeid;
            this.deleteDialogShow = true;
        },
        //添加编辑确认事件
        submitForm(formName) {
             let educationList = this.ruleForm;
             let aeeid = educationList.aeeid || 0;
            let time = new Date(educationList.startTime);
            let y = time.getFullYear(); 
            let m = time.getMonth()+1;
            let d = time.getDate();
            let startTime = y+'-'+ m +'-'+ d 
            let lastTime = new Date(educationList.endTime);
            let y1 = lastTime.getFullYear(); 
            let m1 = lastTime.getMonth()+1;
            let d1 = lastTime.getDate();
            let endTime = y1+'-'+ m1 +'-'+ d1 
            let parms = {schoolName:educationList.schoolName,startTime:startTime,
            endTime:endTime,profession:educationList.profession,degree:educationList.degree}
            if(aeeid) {
                parms = Object.assign({aeeid:aeeid},parms)
                // parms = {schoolName:educationList.schoolName,startTime:startTime,
                // endTime:endTime,profession:educationList.profession,degree:educationList.degree,aeeid:aeeid}
            }
             // 默认校验
            this.$refs[formName].validate((valid) => {
                if (valid) {
                     addOrEditEducationalExpUrl(parms).then(res => {
                        if(res.code == 200 ){
                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                            setTimeout(() => {
                                this.isDisable = false;
                            },500)
                            this.release();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
           
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        // 删除取消确认事件
        deleteCancel(){
            this.deleteDialogShow = false;
        },
        deleteSubmit() {
            let parmas = {aeeid:this.aeeid}
            delEducationalExpUrl(parmas).then(res => {
                if(res.code == 200) {
                    this.deleteDialogShow = false;
                    this.release();
                }
            })
        },
        setShow(type) {
            this.getUpdateDisplayProperty('educationalExp',type)
        }
    }
}
</script>

<style lang="scss">
    .education-content {
        .recommend {
            border-top: 1px solid #E0E0E0;
            border-bottom: 1px solid #E0E0E0;
            padding-top: 20px;
            padding-bottom: 20px;
            .clearfix {
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
            }
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
            .showlog {
                cursor:pointer;
                span {
                    color: #FF6536;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                }
                .f14 {
                    font-size: 10px;
                }
            }
            .line2 {
                display: -webkit-box;
                height: 36px;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-left: 58px;
                margin-top: -17px;
                line-height: 20px;
            }
            .showEditor {
                display: flex;
                justify-content: space-between;
                .work-Time {
                    cursor:pointer;
                }
                .colorFF6536 {
                    color: #FF6536;
                }  
            }
            .educationInfo {
                margin-top:10px;
                padding: 10px 30px;
                border-bottom: 1px dashed #E0E0E0;
                padding-bottom: 20px;
                &:last-child {
                    border-bottom: none;
                }
                .work-Time {
                    display: none;
                }
                &:hover {
                    background:rgba(248,248,248,1);
                    .work-Time {
                        display: block;
                    }
                }
            }
        }
        .add {
            cursor:pointer;
            margin-top: -20px;
            text-align: center;
            span {
                color:  #FF895F;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
            }
        }
        .bt0 {
            border-bottom: 0;
        }
        .pl0 {
            padding-left: 0 !important;
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
        .w200 {
            width: 200px;
        }
        .el-popper[x-placement^=bottom] {
            width: 200px !important;
        }
         // 弹框
        .backbor {
            height:1px;
            background:rgba(224,224,224,1);
            // margin: 20px 0;
        }
        .el-dialog__body {
            padding: 0 0 20px;
        }
        .el-dialog__header {
            text-align: left;
            .el-dialog__title {
                border-left: 2px solid #FF6536;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(64,64,64,1);
                padding-left: 5px;
            }
        }
        .el-button  {
            width: 120px;
            height: 25px;
            span {
                display: block;
                // margin-top: -6px;
            }
        }
        .bdf36 {
            border: 1px solid #FF6536;
            span {
                color: #FF6536;
            }
        }
        .icon {
            padding-right: 5px;
        }
        // .edurequird.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        //     margin-right: -35px;
        //     color: #333333;
        // }
        .delete-dialog {
            .el-dialog {
                margin-top: 30vh !important;
            }
            .el-dialog__header {
                text-align: center ;
                .el-dialog__title {
                    border-left: none;
                }
            }
            .center {
                text-align: center;
                font-size: 16px;
                line-height: 30px;
                margin: 0 0 20px;
            }
            .dialog-footer {
                display: flex;
                // padding: 0 90px;
                justify-content: center;
                .el-button {
                    width: 80px;
                    height: 25px;
                    padding: 0;
                    line-height: 25px;  
                }
                .delete-cancel {
                    border: 1px solid #FF6536;
                    background: #fff;
                    span {
                        color: #FF6536;
                    }
                }
            }
            .el-dialog__body {
                 padding:0 !important;
            }  
            .icon {
                padding-right: 5px;
            }
            .el-button  {
                line-height: 0 !important;
            }
        }
    }
</style>