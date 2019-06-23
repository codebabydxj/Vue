<template>
    <div class="program-cont">
        <div class="program-title mt20 mr30">
            <div class="flex-row">
                <DTitle :name="'方案详情'" :fontSize="18"/>
                <a class="project-edit" href="javascript:void(0);" v-if="detailsData && (detailsData.status == 5 || detailsData.status == 4 || detailsData.status == -2)" @click="onEditProgram">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                </a>
            </div>
        </div>
        <div class="no-content" v-if="!detailsData">
            <img src="static/image/no-content.png"/>
            <p v-if="isAddProgram>3">当前分类暂时为空，点击下方按钮添加项目方案！</p>
            <p v-if="isAddProgram<4" class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
            <el-button type="primary" @click="programDialogVisible=true" v-if="isAddProgram>3">添加项目方案</el-button>
        </div>
        <div v-if="detailsData">
            <div class="detail-cont-box" v-if="detailsData">
                <div class="flex-row project-name">
                    <h4>{{detailsData.programName}}</h4>
                </div>
                <div class="flex-start mt20">
                    <label>方案描述</label>
                    <p class="flex-1" v-html="detailsData.programDescription"></p>
                </div>
                <div class="flex-start mt20">
                    <label>项目规划<br>与交付物</label>
                    <p class="flex-1" v-html="detailsData.deliverable"></p>
                </div>
                
                <div class="flex-start mt20">
                    <p>
                        <label>项目周期</label>
                        <span>{{detailsData.workload}}
                            <span v-if="detailsData.workloadUnit == 0">天</span>
                            <span v-if="detailsData.workloadUnit == 1">个月</span>
                            <span v-if="detailsData.workloadUnit == 2">年</span>
                        </span>
                    </p>
                </div>
                <div class="flex-start mt20">
                    <p>
                        <label>项目总价</label>
                        <span>{{detailsData.price | ExtenSion }} 元</span>
                    </p>
                </div>
                <div class="flex-start mt20" v-if="detailsData.planUrl">
                    <div class="flex-items-center flex-1">
                        <label>计划书</label>
                        <span>{{detailsData.planName}}</span>
                        <p class="flex-1 text-right"><el-button class="btn-w60" type="primary" @click="onDownUrl(detailsData.planUrl)">下载</el-button></p>
                    </div>
                </div>
            </div>
            <div class="detail-cont-box" v-if="detailsData.proposal && detailsData.proposal.length>0">
                <DTitle :name="'修改意见'" :fontSize="18"/>
                <div v-for="(proposalItem,key) in detailsData.proposal" :key="key">
                    <div class="flex-start mt20">
                        <label>修改意见</label>
                        <p class="flex-1">{{proposalItem.opinion}}</p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>提出时间</label>
                            <span>{{proposalItem.createTime | moment}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p class="status-btn mt20" v-if="detailsData && (detailsData.status == -1 || detailsData.status == 1 
        || detailsData.status == 5 || detailsData.status == 4 || detailsData.status == -2)">
            <el-button type="primary" v-if="detailsData.status == 5 || detailsData.status == 4 || detailsData.status == -2" @click="onSubmitProgram">提交方案</el-button>
            <el-button type="primary" class="disable" v-if="detailsData.status == -1 || detailsData.status == 1">等待审核中</el-button>
        </p>
        <!--添加、编辑方案内容框-->
        <el-dialog
            class="program-dialog-model header-border-b"
            :visible.sync="programDialogVisible"
            @close="closeDialog('ruleForm')"
            :close-on-click-modal="onclickModal"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'方案计划书'" :fontSize="18"/></h4>
            <div>
                <el-form :model="programForm" :rules="rules" ref="ruleForm" label-width="100px" class="program-ruleForm">
                    <el-form-item label="方案名称" prop="programName">
                        <el-input v-model="programForm.programName" placeholder="请输入方案名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述" prop="programDescription">
                        <el-input type="textarea" 
                                  v-model="programForm.programDescription" 
                                  :autosize="{ minRows: 4, maxRows: 6}"
                                  placeholder="请输入您对项目的描述，字数在300字以内"
                                  maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="职责描述" prop="deliverable">
                        <el-input type="textarea" 
                                  v-model="programForm.deliverable" 
                                  placeholder="请输入您对项目交付标的，字数在300字以内"
                                  maxlength="300"
                                  :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </el-form-item>
                    <el-form-item label="项目周期" required>
                        <el-col :span="8">
                            <el-form-item prop="workload">
                                <el-input v-model.number="programForm.workload" placeholder="请输入项目周期"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-form-item prop="workloadUnit">
                                <el-select v-model="programForm.workloadUnit" placeholder="请选择">
                                    <el-option label="日" value="0"></el-option>
                                    <el-option label="月" value="1"></el-option>
                                    <el-option label="年" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="项目总价" prop="price">
                        <el-col :span="8">
                            <el-form-item prop="price">
                                <el-input v-model="programForm.price" placeholder="请输入项目总价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <span class="ml10">元</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="方案计划书" prop="planUrl">
                        <el-upload
                            class="upload-demo"
                            :action.sync="actionUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleAvatarSuccess"
                            :on-exceed="handleExceed"
                            :show-file-list="false"
                        >
                            <span>{{this.programForm.planName}}</span>
                            <el-button type="primary" class="btn-w60">{{isUpload == true?'重新上传':'上传'}}</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="solid">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import { getAdviserProgramDetail, getDemandDeatil, addOrEditProgram } from '@/serverApi/project'
import { filesUpload } from '@/serverApi/common'
import { Button, Upload, Col, Select, Option } from 'element-ui'
import { MessageConfirm, MessageAlert } from '@/importElement/messageBox'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)

export default {
    components: {
        DTitle,
    },
    data() {
        let planUrlValidate = (rule, value, callback) => {
            if(!value){
                callback(new Error('请上传方案书'));
            }else {
                callback();
            }
        };
        let workloadValidate = (rule, value, callback) => {
            if(!value){
                callback(new Error('请输入项目周期'));
            }else {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }
        };
        let priceValidate = (rule, value, callback) => {
            let numberReg =  /[^0-9]/g;
            if(!value){
                callback(new Error('请输入项目总价'));
            }else if (numberReg.test(value)){
                callback(new Error('请输入数字值'));
            }else if(value > 999999999){
                callback(new Error('项目总价不能超过9位数'));
            }else {
                callback();
            }
        };
        return {
            title: '项目详情',
            detailsData: {},
            ProjectdetailsData: {},
            isAddProgram: 0,
            programDialogVisible: false,
            onclickModal:false,
            programForm: {
                programName: '',
                programDescription: '',
                deliverable: '',
                workload: '',
                workloadUnit: '',
                price: null,
                planUrl: '',
                planName: '',
                fid: ''
            },
            actionUrl: filesUpload,
            rules: {
                programName: [
                    { required: true, message: '请输入方案名称' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符'}
                ],
                programDescription: [
                    { required: true, message: '请输入项目描述内容' },
                ],
                deliverable: [
                    { required: true, message: '请输入职责描述内容' },
                ],
                workload: [
                    { required: true, validator: workloadValidate},
                ],
                workloadUnit: [
                    { required: true, message: '请选择周期单位' },
                ],
                price: [
                    // { required: true, message: '请输入项目总价' },
                    { required: true,validator: priceValidate}
                ],
                planUrl: [
                    { required: true,validator: planUrlValidate, trigger: 'blur' } 
                ]
                
            },
            fileList: [],
            isUpload: false
        }
    },
    created() {
        this.getProjectDetailsData()
        this.getProgramDetailsData()
    },
    methods: {
        // 顾问方案详情数据请求
        getProgramDetailsData() {
            getAdviserProgramDetail({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200) {
                    this.detailsData = response.data
                }
            })
        },
        // 项目详情请求
        getProjectDetailsData() {
            getDemandDeatil({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.ProjectdetailsData = response.data
                    this.isAddProgram = this.ProjectdetailsData ? this.ProjectdetailsData.appStatus : 0
                }
            })
        },
        // 编辑操作
        onEditProgram() {
            this.detailsData.workloadUnit = this.detailsData.workloadUnit.toString()
            this.programForm = JSON.parse(JSON.stringify(this.detailsData));
            this.programDialogVisible = true
            // this.ruleForm = Object.assign({},this.ruleForm,{
            //     programDescription:this.workdata.workDescription.replace(/<br>/g, "\n")
            // })
            this.programForm.programDescription = this.programForm.programDescription.replace(/<br>/g, "\n");
            this.programForm.deliverable = this.programForm.deliverable.replace(/<br>/g, "\n");
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 上传成功时调用
        handleAvatarSuccess(res, file) {
            if(res.code == 200){
                // this.programForm.planUrl = URL.createObjectURL(file.raw);
                this.programForm.planUrl = res.data.url;
                this.programForm.planName = file.name;
                this.programForm.fid = res.data.fid;
                this.isUpload = true;
            }
        },
        // 关闭时回调
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.isUpload = false;
            this.programForm.planUrl = '';
            this.programForm.planName = '';
            this.programForm.fid = '';
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.programDialogVisible = false
        },
        // 方案新增、编辑提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                let reg = new RegExp("\n", "g");
                this.programForm.programDescription = this.programForm.programDescription.replace(reg, "<br>")
                this.programForm.deliverable = this.programForm.deliverable.replace(reg, "<br>");
                if (valid) {
                    let params = Object.assign({pid: this.$route.params.pid,status: -2},this.programForm);
                    if(this.detailsData && this.detailsData.ppid){
                        params = Object.assign({ppid: this.detailsData.ppid},params)
                    }
                    addOrEditProgram(params).then(response => {
                        if(response.code == 200){
                            this.programDialogVisible = false;
                            this.getProgramDetailsData()  //更新数据
                            this.$message.success('保存成功！')
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 提交方案操作
        onSubmitProgram() {
             MessageConfirm({
                 title:'提交方案',
                 content:'方案提交后将不可修改，请确认是否提交？如有疑问请联系麦盟客服：0755-8695-9936',
                 okText:'提交方案',
                 cancelText:'取消'
            }).then(res => {
                let params = {pid: this.$route.params.pid, ppid: this.detailsData.ppid, status: -1}
                addOrEditProgram(params).then(response => {
                    if(response.code == 200) {
                        MessageAlert({title:'提交成功',content:'请耐心等候客户对方案进行反馈！',okText:'确定', textAlign: 'center'}).then(res => {
                            this.getProgramDetailsData()  //更新数据
                        })
                    }
                })
            }).catch(text => {
                console.log('取消操作')
            })
        },
        // 下载文件
        onDownUrl(url) {
            if(!url || url.substr(0,4) != "http"){
                this.$message.warning('下载的文件为空');
                return;
            }
            window.location.href = url;
        }
    },
    // 将数字转换成货币格式过滤器
    filters:{
        ExtenSion(value) {
            if (value && value != null) {
                value = String(value);
                var left = value.split('.')[0], right = value.split('.')[1];
                // right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                // return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('');
            } else if (value === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            } else {
                return '';
            }
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.program-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .program-title {
        margin-left: 30px;
        margin-bottom: 4px;
        .project-edit {
            font-size: 14px;
            color: #FF895F;
            i {
                font-size: 16px;
            }
            span {
                color: #FF895F;
            }
        }
    }
    .mr30 {
        margin-right: 30px;
    }
    p, span{
        font-size: 14px;
        color: #666666;
    }
    label {
        width: 57px;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        color: #333333;
    }
    .border-b-1 {
        border-bottom: 1px solid #E0E0E0;
    }
    .detail-cont-box {
        padding: 20px 35px 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
        }
        .project-name {
            h4 {
                line-height: 22px;
                font-size: 16px;
                color: #404040;
                font-weight: 600;
                text-align: left;
            }
        }
        
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .text-right {
        text-align: right;
    }
    .flex-items-center {
        display: flex;
        align-items: center;
    }
    .btn-w60 {
        width: 60px;
        height: 24px;
        line-height: 22px;
        border-radius: 3px;
        padding: 0;
        margin-left: 20px;
        span {
            font-size: 12px;
            color: #fff;
        }
    }
    .status-btn {
        padding-bottom: 60px;
        .el-button {
            width:260px;
            height:45px;
            border-radius:3px;
            span {
                font-size: 18px;
                color: #fff;
            }
            &.disable {
                background:rgba(217,217,217,1);
                border-color: #d9d9d9;
                cursor: auto;
            }
            &.btn-border {
                border: 1px solid rgba(255,101,54,1);
                span {
                    color: #FF6536;
                }
            }
            
        }
    }
    .program-dialog-model {
        &.header-border-b {
            .el-dialog__header {
                border-bottom: 1px solid #E0E0E0;
            }
        }
        .dialog-title, .el-dialog__headerbtn .el-dialog__close {
            font-size: 20px;
            color: #000000;
            font-weight: 600;
        }
        .dialog-title {
            color: #333333;
        }
        
        .el-dialog__body {
            padding: 20px 50px 25px 26px;
            .dialog-cont {
                font-size: 16px;
                line-height: 22px;
                text-align: left;
            }
            .el-textarea {
                max-width: 460px;
            }
        }
        .dialog-footer {
            padding-bottom: 20px;
            .el-button {
                width: 120px;
                height: 32px;
                line-height: 32px;
                border-radius: 4px;
                padding: 0;
                &.border {
                    border:1px solid rgba(255,101,54,1);
                    span {
                        color: #FF6536;
                    }
                }
                &.solid {
                    span {
                        color: #fff;
                    }
                }
            }
            .el-button + .el-button {
                margin-left: 0;
            }
        }
    }
    .program-ruleForm {
        label {
            margin-right: 0;
        }
        .upload-demo {
            height: 40px;
            width: max-content;
            display: flex;
            justify-content: space-between;
            .el-upload--text {
                order: 1;
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .el-form-item.is-success .el-input__inner {
        border-color: #d9d9d9;
    }
}


</style>