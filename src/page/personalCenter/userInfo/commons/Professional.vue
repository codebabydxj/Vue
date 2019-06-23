<template>
    <!-- 专业认证 -->
    <div class="profession-content">
        <div class="recommend mt20 bt0">
            <div class="clearfix">
                <div class="consultant-title">专业认证</div>
                <div class="showlog">
                    <span class="f14" @click="setShow(0)" v-if="isShow == 1"><i class="el-icon-display"></i>
                        <span>已显示</span>
                    </span>
                    <span class="f14" @click="setShow(1)" v-if="isShow == 0"><i class="el-icon-hide"></i>
                        <span>已隐藏</span>
                    </span>
                </div>
            </div>
            <div class="professionInfo" v-for="(item,index) in professionItem" :key="index">
                <div class="showEdtor">
                    <div>
                        <label class="label">认证名称</label>
                        <span class="label-text">{{item.certifiedTitle}}</span>
                    </div>
                    <div class="work-Time">
                        <span class="label colorFF6536" @click="showDlog(item)"><i class="el-icon-bianji icon"></i>编辑</span>
                        <span class="label-text colorFF6536" @click="delProfess(item)"><i class="el-icon-delete icon"></i>删除</span>
                    </div> 
                </div>
                
                <div class="mt20">
                    <label class="label">颁发机构</label>
                    <span class="label-text">{{item.issuingAgency}}</span>
                </div>
                <div class="mt20">
                    <label class="label">颁发时间</label>
                    <span class="label-text">{{item.issuedTime | moment}}</span>
                </div>
                <div class="prompt mt20">（证书附件仅平台与本人可见）</div>
                <div class="file mt20">
                    <img :src="item.certifiedUrl" alt="">
                </div>
            </div>
        </div>
        <div class="add" @click="showDlog(null)">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加专业认证</span>
        </div>
        <!-- 专业认证弹框-->
        <div class="work-dialog">
                <el-dialog
                title="专业认证"
                :visible.sync="dialogVisible"
                width="630px"
                center
                :show-close="showClos"
                @close="closeDialog('ruleForm')"
                :close-on-click-modal="onclickModal"
                >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="认证名称" prop="certifiedTitle">
                        <el-input v-model.number="ruleForm.certifiedTitle" autocomplete="off" placeholder="请输入认证名称" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="颁发机构" prop="issuingAgency">
                        <el-input v-model="ruleForm.issuingAgency" autocomplete="off" placeholder="请输入颁发机构" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="认证时间" class="right135">
                        <el-col :span="11">
                            <el-form-item prop="issuedTime">
                                <el-date-picker type="date" placeholder="请选择认证时间" v-model="ruleForm.issuedTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item :class="classArray"
                    prop="certifiedUrl">
                        <el-upload
                            :action="filesUploadUrl"
                            list-type="picture-card" 
                            :multiple="multiple"
                            :on-success="handSuccess"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload">
                            <!-- <img v-if="ruleForm.certifiedUrl" :src="ruleForm.certifiedUrl" class="avatar"> -->
                            <!-- <div v-else> -->
                            <div>
                                <div slot="tip" class="el-upload__tip transfer-label">
                                    <p>请上传认证附件</p>
                                    <p class="fmt20">仅支持JPG、PNG格式</p>
                                </div>
                                <el-button size="small" type="primary" class="transfer-button">上传</el-button>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="uploadVisible">
                            <img width="100%" :src="ruleForm.certifiedUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <div class="prompt mt10 ml108">（证书附件仅平台与本人可见）</div>
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
                <div class="backbor"></div>
                <div class="center">确认要删除吗？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteCancel()" class="bdf36">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { getAdviserDetailUrl, addOrEditCertificationUrl, delCertificationUrl, getSpeedrelease } from '@/serverApi/personalCenter';
import { filesUpload } from '@/serverApi/common';
import { Button, Icon, Dialog, Input, Checkbox, Col, DatePicker,Form, FormItem, Option, Select, Upload  } from 'element-ui';
import { setTimeout } from 'timers';
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
    props:['professionItem', 'isShow', 'getUpdateDisplayProperty', 'release'],
    data() {
        return {
            multiple:false,//是否支持多选
            dialogVisible:false,
            showClos:false,
            uploadVisible:false,
            deleteDialogShow:false,
            fileList:[],
            professData:{},
            editShow:false,
            classArray: ["transfer",'disabled'],
            acid:"",
            fidUrl:{},
            filesUploadUrl: filesUpload,
            onclickModal:false,
            isDisable:false,
            ruleForm:{
                certifiedTitle:'',
                issuingAgency:'',
                issuedTime:'',
                fid:'',
                certifiedUrl: ''
            },
            rules:{
                certifiedTitle:[
                    { required: true, message: '请输入认证名称', trigger: 'change' }
                ],
                issuingAgency:[
                    { required: true, message: '请输入颁发机构', trigger: 'change' }
                ],
            }
        }
    },
    created() {
        // console.log(filesUpload,'filesUploadfilesUpload')
    },
   computed: {
        // uploadDisabled: function() {
        //     return this.fileList.length>0
        // }
    },
    methods:{
        // 编辑弹框显示隐藏
        showDlog(data) {
            this.professData = (data ? data : {});
            this.ruleForm = JSON.parse(JSON.stringify(this.professData)) ;
            this.dialogVisible = true;
            if(data) {
                this.ruleForm = Object.assign({},this.ruleForm,{
                    certifiedUrl:data.certifiedUrl
                })
                this.fileList = [{
                    name: data.sourceName, 
                    url: data.certifiedUrl
                }]
                this.fileList.length<1 && this.classArray.length == 2 && this.classArray.pop();
            }else{
                this.classArray.pop()
            }
        },
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            // TODO 清空图片
        },
        clearFilesFun() {
            // alert(12)
        },
        // 删除
        delProfess(data) {
            this.acid = data.acid;
            this.deleteDialogShow = true;
        },
        // 弹框确认取消时间
        submitForm(formName) {
            this.isDisable = true;
             let  professDataList = this.ruleForm;
             let acid = professDataList.acid || 0;
             let fidList = this.fidUrl;
             let fid = fidList.fid;
            //  let certifiedUrl = fidList.url;
             let time = new Date(professDataList.issuedTime);
             let y = time.getFullYear(); 
             let m = time.getMonth()+1;
             let d = time.getDate();
             let issuedTime = y+'-'+ m +'-'+ d 
             let parmas = {certifiedTitle:professDataList.certifiedTitle,issuingAgency:professDataList.issuingAgency,
             issuedTime:issuedTime,fid:fid,certifiedUrl:professDataList.certifiedUrl}
             if(acid) {
                 parmas = Object.assign({acid:acid},parmas)
                //  parmas = {certifiedTitle:professDataList.certifiedTitle,issuingAgency:professDataList.issuingAgency,
                // issuedTime:issuedTime,fid:fid,certifiedUrl:certifiedUrl,acid:acid}
             }
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    addOrEditCertificationUrl(parmas).then(res => {
                        if(res.code == 200) {
                            this.dialogVisible = false;
                            setTimeout( () => {
                                this.isDisable = false;
                            })
                            this.release();
                            this.$refs[formName].resetFields();
                            // this.ruleForm.certifiedUrl = '';
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
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
            this.fileList = [];
            this.classArray = ["transfer",'disabled']
        },
        // 上传图片删除函数
        handleRemove(file, fileList) {
            if(file.status == 'success'){
                if(this.classArray.includes('disabled')){
                    this.classArray.pop()
                }
            }
        },
        // 点击查看图片时
        handlePictureCardPreview(file) {
            this.ruleForm.certifiedUrl = file.url;
            this.uploadVisible = true;
        },
        // 状态改变时
        handleChange(file, fileList) {
            this.fileList = fileList
        },
        // 上传成功
        handSuccess(res,file,fileList) {
            if(res.code == 200) {
                this.fidUrl = res.data;
                this.ruleForm.certifiedUrl = res.data.url;
                if(!this.classArray.includes('disabled')){
                    this.classArray.push('disabled')
                }
            }
        },
        // 限制上传图片格式
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG png格式!');
                return;
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return;
            }
        },
        // 设置列表显示隐藏
        setShow(type) {
            this.getUpdateDisplayProperty('certification',type)
        },
        // 弹框删除确认取消时间
        deleteSubmit() {
            let parmas = {acid:this.acid}
            delCertificationUrl(parmas).then(res => {
                this.release();
                this.deleteDialogShow = false;
            })
        },
        deleteCancel() {
            this.deleteDialogShow = false;
        }
    }
}
</script>

<style lang="scss">
    .profession-content {
        padding-bottom: 40px;
        .recommend {
            border-top: 1px solid #E0E0E0;
            border-bottom: 1px solid #E0E0E0;
            padding-top: 20px;
            padding-bottom: 0 !important;
            .clearfix {
                padding: 0 30px;
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
                cursor:pointer;
                text-align: center;
               span {
                    color:  #FF895F;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
               }
            }
            .showEdtor {
                .work-Time {
                    cursor:pointer;
                }
                display: flex;
                justify-content: space-between;
                .colorFF6536 {
                    color: #FF6536;
                }
            }
            .professionInfo {
                margin-top:10px;
                padding: 10px 30px;
                // padding-bottom: 20px;
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
            }
            .file {
                width:191px;
                height:122px;
                border:1px solid rgba(151,151,151,1);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .prompt {
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:20px;
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
                font-size:10px !important;
            }
        }
        .bt0 {
            border-bottom: 0;
        }
        .mt20 {
            margin-top: 20px;
        }
        .fmt20 {
            margin-top: -20px;
        }
        .mt10 {
            margin-top: 10px;
        }
        .ml108 {
            margin-left: 108px;
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
        .disabled {
            div {
                &.el-upload--picture-card {
                    display: none;
                }
            }
            
        }
         .transfer {
            width:206px;
            height:150px;
            border-radius:2px;
            border:1px solid rgba(217,217,217,1);
            margin-left: 108px;
            text-align: center;
            .avatar {
                width: 100%;
                height: 100%;
            }
            .el-upload--picture-card {
                width: 204px;
                height: 150px;
                border: none;
            }
            
            .el-upload-list--picture-card .el-upload-list__item {
                    width: 204px;
                    height: 150px;
                    border: 0;
                    border-radius: 0;
            }
            .el-upload-list__item-actions span {
                color: #fff;
            }
            p {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(191,191,191,1);
                height: 0px;
            }
            .transfer-label {
                margin-top: -8px;
                margin-bottom: 15px;
            }
            .transfer-button {
                width:60px;
                height:24px;
                position: relative;
                top:20px;
                bottom: 30px;
                span {
                    // margin-left: -10px;
                    line-height: 23px;
                    margin: 0;
                    font-size: 12px;
                }
            }
            .el-form-item__content {
                margin-left: 0 !important;
            }
            
        }
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
        // .disabled .el-upload--picture-card {
        //     display: none;
        // }
        // .el-upload--picture-card {
        //     display: none;
        // }
        .el-input__inner {
            border-radius: 2px;
            border: 1px solid #D9D9D9;
            height: 30px !important;
        }
        .right135 {
            .el-input__prefix {
                right: -140px;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 15px;
                border-radius: 2px;
            }
        }
        .delete-dialog {
            .el-dialog__header {
                text-align: center;
                .el-dialog__title {
                    border-left: none;
                }
            }
            .center {
                text-align: center;
                font-size: 16px;
                padding: 20px 0;
            }
            .dialog-footer {
                display: flex;
                padding: 0 40px;
                .el-button {
                    width: 80px;
                    height: 25px;
                    padding: 0;
                    line-height: 25px;  
                }
            }
            .icon {
                padding-right: 5px;
            }
        }
    }
</style>