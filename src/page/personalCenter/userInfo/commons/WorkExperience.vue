<template>
     <!-- 工作经历 -->
    <div class="work-content">
        <div class="recommend mt20 bt0" >
            <div class="clearfix ">
                <div class="consultant-title">工作经历</div>
                <div class="showlog" >
                    <span class="f14" @click="setShow(0)" v-if="isShow==1"><i class="el-icon-display"></i>
                        <span>已显示</span>
                    </span>
                    <span class="f14" @click="setShow(1)" v-if="isShow==0"><i class="el-icon-hide"></i>
                        <span>已隐藏</span>
                    </span>
                </div>
            </div>
            <div class="work-decription"   v-for="(item,index) in workItem" :key="index" >
                <div class="show-botton">
                    <div class="person-Name">
                        <label class="label">公司名称</label>
                        <span class="label-text">{{item.companyName}}</span>
                    </div>
                    <div class="work-Time">
                        <span class="label colorFF6536" @click="showDlog(item)"><i class="el-icon-bianji icon"></i>编辑</span>
                        <span class="label-text colorFF6536" @click="deleItem(item)"><i class="el-icon-delete icon"></i>删除</span>
                    </div>
                </div>
                <div class="mt20">
                    <label class="label">起止日期</label>
                    <span class="label-text">{{item.startTime | moment}}</span>
                    <span> - </span>
                    <span class="label-text pl0">{{item.endTime | moment}}</span>
                </div>
                    <div class="mt20">
                    <label class="label">所在部门</label>
                    <span class="label-text">{{item.department}}</span>
                </div>
                <div class="mt20">
                    <label class="label">担任职位</label>
                    <span class="label-text">{{item.role}}</span>
                </div>
                <div class="mt20 labelName">
                    <label class="label">职责描述</label>
                    <span class="label-text pl25" v-html="item.workDescription"></span>
                </div>
            </div> 
        </div>
        <div class="add" @click="showDlog(null)">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加工作经验</span>
        </div>
        <!-- 工作经历弹框 -->
        <div class="work-dialog">
                <el-dialog
                title="工作经历"
                :visible.sync="dialogVisible"
                width="630px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="ruleForm.companyName" autocomplete="off" placeholder="请输入公司名称" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="起止日期" required>
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
                    <el-form-item label="所在部门" prop="department">
                        <el-input v-model="ruleForm.department" autocomplete="off" placeholder="请输入所在部门" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="担任职务" prop="role">
                        <el-input v-model="ruleForm.role" autocomplete="off" placeholder="请输入担任职务" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="职责描述" prop="workDescription">
                        <el-input type="textarea" v-model="ruleForm.workDescription" maxlength="300" placeholder="请输入您对项目的初步规划，字数在300字以内"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
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
                    <el-button type="primary" @click="deleteSubmit()" :disabled="isDisable">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { getAdviserDetailUrl, addOrEditWorkExpUrl, delWorkExpUrl } from '@/serverApi/personalCenter';
import { Button, Icon, Dialog, Input, Checkbox, Col,Form, FormItem, DatePicker  } from 'element-ui';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
export default {
    props:{
        workItem:{
            type: Array,
            default: []
        },
        isShow:{
            type: Number,
            // default:{} 
        },
        getUpdateDisplayProperty: {
            type: Function,
            // default:{}
        },
        release:{
            type:Function
        }
    },
    // props:['workItem', 'isShow','getUpdateDisplayProperty','release'],
    data() {
        let endTimeValidate = (rule, value, callback) => {
            if(!value){
                callback(new Error('请选择结束日期'))
            }else {
                if(Date.parse(this.ruleForm.endTime)<= Date.parse(this.ruleForm.startTime) ){
                    callback(new Error('选择的时间期间不正确'))
                }else{
                    callback();
                }
            }
        };
        return {
            dialogVisible:false,
            showClos:false,
            editShow:false,
            workdata:{},
            deleteDialogShow:false,
            aweid:'',
            workItemData:'',
            onclickModal:false,
            isDisable:false,
            ruleForm:{
                companyName:'',
                startTime: '',
                endTime: '',
                department:'',
                role:'',
                workDescription:'',
            },
            rules:{
                companyName: [
                    { required: true, message: '请输入公司名称' },
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                endTime: [
                    { type: 'date',  required: true,validator:endTimeValidate, trigger: 'change' }
                ],
                department: [
                    {  required: true, message: '请输入所在部门', trigger: 'change' }
                ],
                role: [
                    { required: true, message: '请输入担任职务', trigger: 'change' }
                ],
                workDescription: [
                    { required: true, message: '请输入职责描述', trigger: 'change' }
                ],
            }
        }
    },
    created() {
    },
    computed:{
    },
    methods:{
        // 弹框显示隐藏
        showDlog(data) {
            this.workdata = (data ? data : {})
            this.ruleForm = JSON.parse(JSON.stringify(this.workdata));
            this.dialogVisible = true;
            if(data) {
                this.ruleForm = Object.assign({},this.ruleForm,{
                    workDescription:this.workdata.workDescription.replace(/<br>/g, "\n")
                })
            }
            
            // this.workdata.workDescription = this.workdata.workDescription.replace(/<br>/g, "\n");

            // this.ruleForm.workDescription.replace(/<br>/g, "\n");
        },
        // 删除
        deleItem(data) {
            this.aweid = data.aweid;
            this.deleteDialogShow = true;
        },
        // 删除取消确认事件
        deleteCancel(){
            this.deleteDialogShow = false;
        },
        deleteSubmit() {
            let parmas = {aweid:this.aweid}
            delWorkExpUrl(parmas).then(res => {
                if(res.code == 200) {
                    this.deleteDialogShow = false;
                    this.release();
                }
            })
        },
        // 确认提交数据
        confirm(formName) {
            let workdataList = this.ruleForm
            let startTime = this.getMyDate(workdataList.startTime);
            let endTime =  this.getMyDate(workdataList.endTime);
            let aweid = workdataList.aweid || 0;
            if (new Date(workdataList.endTime) < new Date(workdataList.startTime)) {
                alert('开始时间不能大于结束时间')
                return
            }
            let reg = new RegExp("\n", "g");
            let workDescription = workdataList.workDescription ? workdataList.workDescription.replace(reg, "<br>"):'';
            let parmas = {companyName:workdataList.companyName,startTime:startTime,
            endTime:endTime,department:workdataList.department,role:workdataList.role,workDescription:workDescription}
            if(aweid) {
                parmas = Object.assign({aweid:aweid},parmas)
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addOrEditWorkExpUrl(parmas).then(res => {
                        if(res.code == 200 ) {
                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                            this.release();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        // 列表显示隐藏
        setShow(type) {
            this.getUpdateDisplayProperty('workExp',type)
        },
        /*时间格式转换*/
        getMyDate(date) {
            let myDate = new Date(date);
            let myYear = myDate.getFullYear();
            var myMonth = myDate.getMonth() + 1;
            let newMyMonth = myMonth >= 10 ? myMonth : '0' + myMonth;
            let myDay = myDate.getDate();
            let newMyDay = myDay >= 10 ? myDay : '0' + myDay;
            return myYear + '-' + newMyMonth + '-' + newMyDay;
        }
    }
}
</script>

<style lang="scss">
    .work-content {
        .recommend {
            border-top: 1px solid #E0E0E0;
            border-bottom: 1px solid #E0E0E0;
            padding-top: 20px;
            padding-bottom: 0 !important;
            .clearfix {
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
            }
            .work-decription {
                padding: 10px 30px 20px;
                margin-top:10px;
                border-bottom: 1px dashed #E0E0E0;
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
                .show-botton {
                    display: flex;
                    justify-content: space-between;
                    .colorFF6536 {
                        color: #FF6536;
                    }
                    .work-Time {
                        cursor:pointer;
                        margin-right: 0;
                    }
                }
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
                // display: -webkit-box;
                height: 36px;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 2;
                // overflow: hidden;
                margin-left: 58px;
                margin-top: -17px;
                line-height: 20px;
            }
            .add {
                text-align: center;
                margin: 20px 0;
                cursor:pointer;
               span {
                    color:  #FF895F;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
               }
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
        .pl0 {
            padding-left: 0 !important;
        }
        .pr20 {
            padding-right: 20px;
        }
        .labelName {
            display: flex;
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
            flex: 1;
            line-height: 20px;
        }
        .pl25 {
            padding-left: 25px !important;
            line-height: 20px;
            margin-top: -3px;
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
            vertical-align: middle;
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
        }
    }
</style>