<template>
    <div class="stage-cont">
        <div class="stage-title mt20">
            <DTitle :name="'文档列表'" :fontSize="18"/>
        </div>
        <div class="no-content" v-if="isContent == false">
            <img src="static/image/no-content.png"/>
            <p v-if="isAddDocument>3">当前分类暂时为空，点击下方按钮添加文档。</p>
            <p v-if="isAddDocument<4" class="mb100">该分类暂无内容，项目发展到不同阶段<br>时，不同的分类下会有对应的新增内容</p>
        </div>
        <div>
            <div class="stage-list-box" v-for="(itemData,i) of documentData" :key="i">
                <!-- <router-link :to="{path: '/customerProject/stage/stageDetails/'+(i+1)}" > -->
                    <DocumentList :itemData="itemData"/>
                <!-- </router-link> -->
            </div>
        </div>
        <p class="status-btn mt20" v-if="isAddDocument > 3" @click="deliverablesDialogVisible=true">
            <el-button type="primary">上传附件文档</el-button>
        </p>
        <!--添加交付物内容框-->
        <el-dialog
            class="deliverables-dialog-model header-border-b"
            :visible.sync="deliverablesDialogVisible"
            @close="closeDialog('ruleForm')"
            width="630px">
            <h4 slot="title" class="dialog-title"><DTitle :name="'交付物'" :fontSize="18"/></h4>
            <div>
                <el-form :model="deliverablesForm" :rules="rules" ref="ruleForm" label-width="100px" class="program-ruleForm">
                    <el-form-item label="文档名称*" prop="name">
                        <el-input v-model="deliverablesForm.name" placeholder="请输入文档名称"></el-input>
                    </el-form-item>
                    <el-form-item label="文档描述*" prop="introduction">
                        <el-input type="textarea" 
                                  v-model="deliverablesForm.introduction" 
                                  :autosize="{ minRows: 4, maxRows: 6}"
                                  placeholder="请输入您对项目的描述，字数在300字以内"
                                  maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="交付物*" prop="deliverableUrl">
                        <el-upload
                            class="upload-demo"
                            :action="deliverablesActiionUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleAvatarSuccess"
                            :on-exceed="handleExceed"
                            :show-file-list="false"
                        >
                            <span>{{deliverablesForm.planName}}</span>
                            <el-button type="primary" class="btn-w60">{{isUpload ? '重新上传':'上传'}}</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-centerr">
                <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="solid">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Upload } from 'element-ui'
import DTitle from '@/components/DTitle'
import DocumentList from './common/DocumentList'
import { getAdviserDocumentList, getDemandDeatil, submitDocument } from '@/serverApi/project'
import { MessageAlert } from '@/importElement/messageBox'
import { filesUpload } from '@/serverApi/common'

Vue.use(Upload)

export default {
    components: {
        DTitle,
        DocumentList
    },
    data() {
        let planUrlValidate = (rule, value, callback) => {
            if(!this.deliverablesForm.fid){
                callback(new Error('请上传方案书'));
            }else {
                callback();
            }
        };
        return {
            title: '我的项目',
            documentData: [],
            deliverablesActiionUrl: filesUpload,
            ProjectdetailsData: {},
            deliverablesDialogVisible: false,
            fileList: [],
            isUpload: false,
            isAddDocument: 0,
            isContent: null,
            rules: {
                name: [
                    { required: true, message: '请输入文档名称' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符'}
                ],
                introduction: [
                    { required: true, message: '请输入文档描述内容' },
                ],
                deliverableUrl: [
                    { validator: planUrlValidate, trigger: 'blur' }
                ]
            },
            deliverablesForm: {
                name: '',
                introduction: '',
                deliverableUrl: '',
                planName: '',
                fid: ''
            },
        }
    },
    created() {
        this.getAdviserDocumentData()
        this.getProjectDetailsData()
    },
    methods: {
        // 文档列表数据请求
        getAdviserDocumentData() {
            let params = {pid: this.$route.params.pid, type: -1}
            getAdviserDocumentList(params).then(response => {
                if(response.code == 200) {
                    this.documentData = response.data
                    this.isContent = this.documentData && this.documentData.length>0 ? true:false
                }
            })
        },
        // 项目详情请求
        getProjectDetailsData() {
            getDemandDeatil({pid: this.$route.params.pid}).then(response => {
                if(response.code == 200){
                    this.ProjectdetailsData = response.data
                    this.isAddDocument = this.ProjectdetailsData ? this.ProjectdetailsData.appStatus : 0
                }
            })
        },
        handleRemove(file, fileList) {
            if(fileList.length<1) {
                this.isUpload = false
            }
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleExceed(files, fileList) {
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 上传成功时调用
        handleAvatarSuccess(res, file) {
            if(res.code == 200){
                this.deliverablesForm.planName = file.name;
                this.deliverablesForm.fid = res.data.fid
                this.isUpload = true
            }
        },
        // 关闭时回调
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.fileList = [];
            this.isUpload = false
        },
        // 表单取消时执行
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.deliverablesForm = {};
            this.deliverablesDialogVisible = false
        },
        // 交付物新增、编辑提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.deliverablesForm;
                    let reg = new RegExp("\n", "g");
                    this.deliverablesForm.introduction = this.deliverablesForm.introduction ? this.deliverablesForm.introduction.replace(reg, "<br>"):'';
                    params = Object.assign({pid: this.$route.params.pid,type: 0},params)
                    submitDocument(params).then(response => {
                        if(response.code == 200){
                            this.deliverablesDialogVisible = false
                            MessageAlert({title:'提交成功',content:'您已成功提交其他附件文档！',okText:'确定',textAlign:'center'}).then(res => {
                                this.getAdviserDocumentData()
                            });
                            this.$refs[formName].resetFields();
                            this.deliverablesForm = {};
                        }
                    })
                } else {
                    return false;
                }
            });
        },
    },
    computed: {
    }
}
</script>

<style lang='scss' scope>
.stage-cont {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    overflow: hidden;
    .stage-title {
        margin-left: 30px;
        margin-bottom: 4px;
    }
    .stage-list-box {
        padding: 20px 30px;
        border-bottom: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: none;
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
    .deliverables-dialog-model {
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
            display: flex;
            justify-content: space-between;
            .el-upload--text {
                order: 1;
            }
        }
    }
}
</style>