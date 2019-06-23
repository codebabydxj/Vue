<template>
   <div class="consultant-personal">
       <el-card class="box-card">
           <div class="mt20">
               <div slot="header" class="clearfix">
                    <div class="consultant-title">基本资料</div>
                    <div class="preview pr20" @click="goPreviewPage">预览个人主页>>></div>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div class="consultant-content">
                    <div class="NameTime">
                        <div class="person-Name">
                            <span class="label">用户名</span>
                            <span class="label-text">{{consultantList.nickName}}</span>
                            <span v-if="consultantList.gender == 1" class="blue"><i class="el-icon-male"></i></span>
                            <span v-if="consultantList.gender == 2" class="origin"><i class="el-icon-woman"></i></span>
                            <span v-if="consultantList.gender == 0"><i class="el-icon-Privacy"></i></span>
                        </div>
                        <div class="work-Time">
                            <span class="label">工作年限</span>
                            <span class="label-text">{{consultantList.years}}</span>
                            <span class="label-text">年</span>
                        </div>
                        <div class="work-Time edit">
                            <span class="label colorFF6536 ml27" @click="clientEdut(consultantList)"><i class="el-icon-bianji icon"></i>编辑</span>
                            <!-- <span class="label-text colorFF6536" @click="clientDelete"><i class="el-icon-delete"></i>删除</span> -->
                        </div>
                    </div>
                    <div class="mt20">
                        <span class="label">账户状态</span>
                        <span class="label-text" v-if= "consultantList.status == 4">已审核</span>
                        <span class="label-text" v-if= "consultantList.status == 0">未审核</span>
                        <span class="label-text" v-if= "consultantList.status == 5">面试通过</span>
                        <span class="label-text" v-if= "consultantList.status == 6">项目通过</span>
                    </div>
                    <div class="label-text line3 mt20" v-html="consultantList.introduction || '该顾问暂未填写个人简介'"></div>
                    <div class="mt20 tags">
                        <label class="label">所在行业</label>
                        <span class="label-text" v-for="(industryList_item,index) in consultantList.industryList" :key="index">{{industryList_item.alName}}</span>
                    </div>
                    <div class="mt20 tags">
                        <label class="label">专业技能</label>
                        <span class="label-text bl" v-for="(skillList_item,index) in consultantList.skillList" :key="index">{{skillList_item.asName}}</span>
                    </div>
                        <div class="prompt mt20">(以下内容仅个人可见)</div>
                        <div class="personalShow">
                            <div class="NameTime mt20">
                                <div class="person-Name">
                                    <label class="label">真实姓名</label>
                                    <span class="label-text">{{consultantList.uname}}</span>
                                </div>
                                <div class="work-Time">
                                    <label class="label">日薪范围</label>
                                    <span class="label-text" v-if="consultantList">{{consultantList.salaryUp }}-{{consultantList.salaryDown}} 元</span>
                                </div>
                            </div>  
                            <div class="NameTime mt20">
                                <div class="person-Name">
                                    <label class="label">个人邮箱</label>
                                    <span class="label-text">{{consultantList.email}}</span>
                                </div>
                                <div class="work-Time">
                                    <span class="label">手机号</span>
                                    <span class="label-text">{{consultantList.uphone}}</span>
                                </div>
                            </div>
                            <div class="">
                                <span class="label mt20">联系地址</span>
                                <span class="label-text">
                                    {{(consultantList.country || '')+(consultantList.province ||
                                    '')+(consultantList.city || '')+(consultantList.address||'')}}
                                </span>
                            </div>
                        </div>  
                </div>
                <!-- 基本资料编辑弹框 -->
                <div class="work-dialog">
                    <el-dialog
                    title="基本资料"
                    :visible.sync="BasicdataShow"
                    width="700px"
                    center
                    :show-close="showClos"
                    :close-on-click-modal="onclickModal"
                    >
                        <div class="backbor mb15"></div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="用户名" prop="nickName" class="w200">
                                <el-input v-model="ruleForm.nickName" autocomplete="off" placeholder="请输入用户名" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="uname" class="w200">
                                <el-input v-model="ruleForm.uname" autocomplete="off" placeholder="请输入真实姓名" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="ruleForm.gender">
                                    <el-radio-button label="1">男</el-radio-button>
                                    <el-radio-button label="2" class="mf20">女</el-radio-button>
                                    <el-radio-button label="0" class="mf20">保密</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-form-item label="个人邮箱" prop="email">
                                <el-input v-model="ruleForm.email" :disabled="true" autocomplete="off" placeholder="请输入个人邮箱" class="company-input"></el-input>
                            </el-form-item> -->
                            <el-form-item label="工作年限" prop="years" class="w200">
                                <el-input v-model.number="ruleForm.years" autocomplete="off" placeholder="请输入工作年限" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="所在行业" prop="industryIds">
                                <el-select 
                                    v-model="ruleForm.industryIds" 
                                    multiple 
                                    :multiple-limit="3"
                                    allow-create
                                    filterable
                                    placeholder="请选择"
                                    class="item-select">
                                    <el-option
                                        v-for="item in industryListData"
                                        :key="item.ilid"
                                        :label="item.industryName"
                                        :value="item.ilid"
                                        :change="change">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业技能" prop="skillList">
                                <el-cascader
                                    :options="skillData"
                                    :show-all-levels="false"
                                    v-model="ruleForm.skillList"
                                    @change="addOption"
                                    filterable
                                    @active-item-change="handleItemChange"
                                    :props="props"
                                ></el-cascader>
                                <div class="item-tags">
                                    <el-tag
                                        :key="tag.id"
                                        v-for="tag in skillTags"
                                        closable
                                        :disable-transitions="false"
                                        @close="handleClose(tag)">
                                        {{tag.text}}
                                    </el-tag>
                                </div>
                            </el-form-item>
                            <el-form-item label="日薪范围">
                                <el-col :span="10">
                                    <el-form-item prop="salaryUp">
                                        <el-input v-model.number="ruleForm.salaryUp" autocomplete="off" placeholder="最少日薪" class="company-input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="4">-</el-col>
                                <el-col :span="10">
                                    <el-form-item prop="salaryDown">
                                        <el-input v-model.number="ruleForm.salaryDown" autocomplete="off" placeholder="最多日薪" class="company-input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="联系地址" prop="address">
                                <el-input v-model="ruleForm.address" autocomplete="off" placeholder="请输入联系地址" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="个人简介" prop="introduction">
                                <el-input type="textarea" v-model="ruleForm.introduction" maxlength="300" placeholder="请输入个人简介，字数在300字以内"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancel('ruleForm')" class="bdf36">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
           </div>
            <div>
                <Referee :refereeItem="consultantList"></Referee>
            </div>
            <div>
                <AccountNumber :release="release" :accountItem="consultantList.bankList" :getUpdateDisplayProperty="getUpdateDisplayProperty" 
                ></AccountNumber>
            </div>
            <div>
                <WorkExperience :release="release" :workItem="consultantList.workList ? consultantList.workList : []" :isShow="consultantList.display && consultantList.display.workExp" 
                    :getUpdateDisplayProperty="getUpdateDisplayProperty">
                </WorkExperience>
            </div>
            <div>
                <ProjectExperience :release="release" :projectItem="consultantList.projectList" :isShow="consultantList.display && consultantList.display.projectExp" 
                    :getUpdateDisplayProperty="getUpdateDisplayProperty">
                </ProjectExperience>
            </div>
            <div>
                <EducationExperience :release="release" :educationItem="consultantList.educationalList" :isShow="consultantList.display && consultantList.display.educationalExp" 
                :getUpdateDisplayProperty="getUpdateDisplayProperty"></EducationExperience>
            </div>
            <div>
                <Languages :release="release" :languageItem="consultantList.languageList" :isShow="consultantList.display && consultantList.display.language"
                :getUpdateDisplayProperty="getUpdateDisplayProperty"></Languages>
            </div>
            <div>
                <Professional :release="release" :professionItem="consultantList.certificationList" :isShow="consultantList.display && consultantList.display.certification"
                :getUpdateDisplayProperty="getUpdateDisplayProperty"></Professional>
            </div>
       </el-card>
       <!-- 邮箱提示弹框 -->
        <div class="delete-dialog">
            <el-dialog
                title="绑定邮箱"
                :visible.sync="emailDialogShow"
                width="400px"
                center
                :show-close="showClos"
                :close-on-click-modal="onclickModal"
                >
                <!-- <div class="backbor"></div> -->
                <div class="center">
                    个人基本资料已提交成功，在绑定邮箱后您将实时收到平台根据您设定标签所推荐的项目信息。请前往
                    <span>账号设置-绑定邮箱</span>进行填写。
                </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="deleteCancel" class="delete-cancel">取 消</el-button> -->
                    <el-button type="primary" @click="emailShow()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
   </div>
</template>

<script>
import Vue from 'vue'
import Referee from './commons/Referee'
import AccountNumber from './commons/AccountNumber'
import WorkExperience from './commons/WorkExperience'
import ProjectExperience from './commons/ProjectExperience'
import EducationExperience from './commons/EducationExperience'
import Languages from './commons/Languages'
import Professional from './commons/Professional'
import AttachmentResume from './commons/AttachmentResume'
import { getAdviserInfolUrl, getAdviserDetailUrl,updateDisplayPropertyUrl, editAdviserUrl,
 getIndustryListUrl,getSkillSecondaryUrl,getSkillUrl, getUserByTokenUrl  } from '@/serverApi/personalCenter';
import {  Card, Button, Icon, Radio, RadioGroup, RadioButton,Select, Option, Form, FormItem, Cascader,Tag  } from 'element-ui';
import { mapGetters } from 'vuex';
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Cascader);
Vue.use(Tag);

export default {
    data() {
        var validateArray = (rule, value, callback) => {
            if(this.skillTags.length<1) {
                callback(new Error('请输入专业技能'));
            }else if(this.skillTags.length >3){
                callback(new Error("专业技能不能超过3个"));
            }else {
                 callback();
            }
        };
        var validateNickName = (rule, value, callback) =>{
            let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if(regEn.test(value) || regCn.test(value)) {
                callback(new Error('用户名不能带有特殊字符'));
            }else {
                callback();
            }
        };
        var validateSalaryUp = (rule, value, callback) => {
            if(value > 999999999){
                 callback(new Error('最少日薪不能超过9位数'));
            }else {
                callback();
            }
        };
        var validatesSalaryDown = (rule, value, callback) => {
            if(value > 999999999){
                 callback(new Error('最多日薪不能超过9位数'));
            }else if (value <= this.ruleForm.salaryUp){
                callback(new Error('最少日薪不能大于或等于最多日薪'));
            }else {
                callback();
            }
        };
        return {
            title: '个人资料',
            consultantList:{},
            // editShow:false,
            BasicdataShow:false,
            showClos:false,
            industryListData:[],
            userInfo:{},
            onclickModal:false,
            emailDialogShow:false,
            ruleForm:{
                nickName:'',
                uname:'',
                gender:'0',
                // email:'',
                years:'',
                industryIds:[],
                skillList:[],
                salaryUp:'',
                salaryDown:'',
                address:'',
                introduction:'',
                otherIndustrys:'',
                otherSkills:''
            },
            rules:{
                nickName:[
                    { validator: validateNickName, trigger: 'change' }
                ],
                uname:[
                    { required: true, message: '请输入真实姓名', trigger: 'change' }
                ],
                // email:[
                //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                //     { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                // ],
                years:[
                    { required: true, message: '请输入工作年限', trigger: 'change' }
                ],
                skillList:[
                    {required: true, validator: validateArray,trigger: 'change'}
                ],
                introduction:[
                    { required: true, message: '请输入个人简介', trigger: 'change' }
                ],
                salaryUp:[
                    { validator: validateSalaryUp, trigger: 'change' }
                ],
                salaryDown:[
                    { validator:validatesSalaryDown, trigger: 'change' }
                ]
            },
            skillData: [{
                value: '',
                label: '',
                children: []
            }],
            props: {
                value: 'value',
                children: 'children'
            },
            skillTags: [],
        }
    },
    components:{
        Referee,
        AccountNumber,
        WorkExperience,
        ProjectExperience,
        EducationExperience,
        Languages,
        Professional,
        AttachmentResume
    },
    created() {
        this.getConsultantData();
        this.getIndustryList();
        this.getSkillData();
        getUserByTokenUrl().then(res => {
            if(res.code == 200) {
                this.userInfo = res.data;
                console.log(this.userInfo,'this.userInfothis.userInfo')
            }
        }) 
    },
    computed: {
       ...mapGetters(['token', 'userObj'])
    },
    methods: {
        // 个人基本信息数据请求
        getConsultantData() {
            getAdviserDetailUrl().then(res => {
                if(res.code == 200) {
                    let userObj = this.userObj;
                    this.consultantList = res.data
                    userObj.nickName = res.data.nickName
                    userObj.status = res.data.status
                    this.$store.dispatch('setUserObj',{userInfo:userObj, pCWebLoginToken: this.token})
                }
            })
        },
        // 传给子组件函数
        release(){
            this.getConsultantData()
        },
        // 基本资料编辑
        clientEdut(data) {
            let userData = (data ? data : {});
            this.ruleForm = userData;
            this.BasicdataShow = true;
            this.ruleForm.industryIds = this.ruleForm.industryList ? this.ruleForm.industryList.map(f=>{
                if(f.ilid >0){
                   return f.ilid 
                }else{
                    return f.alName
                }
            }):[]
            this.skillTags = this.ruleForm.skillList ? this.ruleForm.skillList.map(f=>({id: f.ssid, text: f.asName})):[]
            this.ruleForm = Object.assign({},this.ruleForm)
            // 重置表单
            // this.$refs[formName].resetFields();
        },
        // 基本资料删除
        clientDelete() {
        },
        // 行业列表请求
        getIndustryList() {
            getIndustryListUrl().then(res => {
                if(res.code == 200 ) {
                    this.industryListData = res.data;
                }
            })
        },
        /*获取行业其他值(行业：1，其他行业：-1)*/
        getOtherIndustrys(type, data) {
            if(!data) { 
                return ''
            }else {
                return data.map(d=>{
                    if(typeof d == 'number') {
                        return type==1 ? d : 1;
                    }else {
                        return type==1 ? -1 : d;
                    }
                })
            }
            
        },
        // 专业技能请求
        getSkillData(sfid, search) {
            let params = {type: 1}
            params = sfid ? Object.assign({sfid: sfid},params) : params
            params = search ? Object.assign({search: search},params) : params 
            getSkillUrl(params).then(response => {
                if(response.code == 200){
                    this.skillData = this.setSkillData(response.data.list);
                }
            })
        },
        // 获取一级技能列表并赋值
        setSkillData(data) {
            let newData = []
            if(data && data.length){
                data.map(d=>{
                    newData.push({value: d.sfid, label: d.fName,children: []})
                })
            }
            return newData;
        },
        // 选中值设置
        addOption(value) {
            let newValue = ''
            this.skillData.map(f=>{
                if(f.value == value[0]){
                    newValue = f.children.find(d=>d.value == value[1]).label
                }
            })
            this.ruleForm.skillList = []
            if(this.skillTags.find(s=>s.id==value[1])) return;
            if (this.skillTags.length > 2) return;
            this.skillTags.push({text:newValue,id:value[1]});
        },
        // 取消选择设置
        handleClose(tag) {
            this.skillTags.splice(this.skillTags.indexOf(tag), 1);
        },
        // 根据一级值获取二级列表
        handleItemChange(val) {
            if(!val && val.length<1) return
            let params = {sfid: val[0]}
            let skillDataChildren = this.skillData.find(d=>d.value==val[0]).children
            if(skillDataChildren && skillDataChildren.length>0) return
            getSkillSecondaryUrl(params).then(response => {
                if(response.code == 200){
                    if(!response.data) return;
                    this.skillData.map(f=>{
                        if(f.value == params.sfid){
                            f.children = response.data.list && response.data.list.length>0 ? response.data.list.map(d=>{
                                return ({value: d.ssid, label: d.sName})
                            }) : [];
                        }
                        return f;
                    })
                }
            })
        },
        // 数据确认提交
        submitForm(formName) {
            // let userInfoData = this.ruleForm;
            let uid = this.ruleForm.uid || 0;
            let industryList = this.getOtherIndustrys(1,this.ruleForm.industryIds).join(','); 
            let otherIndustrys = this.getOtherIndustrys(-1,this.ruleForm.industryIds).join(','); 
            let skills = this.skillTags && this.skillTags.length>0 ? this.skillTags.map(f=>f.id).join(',') : '';
            let otherSkills = this.skillTags && this.skillTags.length>0 ? this.skillTags.map(f=>{
                return 1
            }).join(',') : '';
            let nickName = this.ruleForm.nickName || '';
            let uname = this.ruleForm.uname || '';
            let years = this.ruleForm.years || '';
            let address = this.ruleForm.address || '';
            let salaryUp=(!this.ruleForm.salaryUp && this.ruleForm.salaryUp != 0 ? '' : this.ruleForm.salaryUp);
            let salaryDown=(!this.ruleForm.salaryDown && this.ruleForm.salaryDown != 0 ? '' : this.ruleForm.salaryDown);

            let parmas = {nickName:nickName,uname:uname,gender:this.ruleForm.gender,industrys:industryList,
            years:years,skills:skills,salaryUp:salaryUp,salaryDown:salaryDown,address:address,otherIndustrys:otherIndustrys,
            otherSkills:otherSkills,introduction:this.ruleForm.introduction,email:this.ruleForm.email}
            if(uid) {
            //     parmas = {nickName:nickName,uname:uname,gender:this.ruleForm.gender,industrys:industryList,
            // years:years,skills:skills,salaryUp:salaryUp,salaryDown:salaryDown,address:address,otherIndustrys:otherIndustrys,
            // otherSkills:otherSkills,introduction:this.ruleForm.introduction,email:this.ruleForm.email,uid:uid}
                parmas = Object.assign({uid:uid},parmas)
            }
            
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    editAdviserUrl(parmas).then(res => {
                        if(res.code == 200) {
                            this.BasicdataShow = false;
                            this.$refs[formName].resetFields();
                            this.getConsultantData();
                            if(!this.userInfo.email) {
                                this.emailDialogShow = true;
                            }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        // 邮箱隐藏
        emailShow() {
            this.emailDialogShow = false;
        },
        // 取消
        cancel(formName) {
            this.BasicdataShow = false;
            this.$refs[formName].resetFields();
        },
        // 顾问个人信息显示，隐藏请求
        getUpdateDisplayProperty(name,type) {
            let parmes = {name:name,value:type}
            updateDisplayPropertyUrl(parmes).then(response => {
                if(response.code == 200 ){
                    this.consultantList.display[name] = type; 
                }
            })
        },
        change(value) {
        },
        // 跳转到个人主页
        goPreviewPage() {
            let routeData = this.$router.resolve({ path: '/personalCenter/userInfo/previewPage'});
            window.open(routeData.href, '_blank');
            // this.$router.push('/personalCenter/userInfo/previewPage')
        }
    } 
    
}
</script>

<style lang='scss'>
    .consultant-personal {
        .box-card {
            text-align: left;
            margin-bottom: 90px;
            .clearfix {
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
                .preview {
                    cursor:pointer;
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(255,101,54,1);
                    line-height:20px;
                }
            }
            .consultant-content {
                margin-top: 10px;
                padding: 10px 30px;
                .edit {
                    display: none;
                    cursor:pointer;
                    margin-left: 190px;
                }
                &:hover {
                    background:rgba(248,248,248,1);
                    .edit {
                        display: block;
                    }
                }
                .NameTime {
                    // width: 70%;
                    display: flex;
                    // justify-content: space-between;
                    // text-align: left;
                    .edit {
                        margin-left: 190px;
                    }
                    .colorFF6536 {
                        color: #FF6536;
                    }
                    .ml27 {
                        display: inline-block;
                        margin-left: 27px;
                    }
                }
                .work-Time {
                    margin-left: 60px;
                    margin-right: -70px;
                }
                .person-Name {
                    width: 250px;
                    .blue {
                        color: #597EF7;
                    }
                    .origin {
                        color: #FF6536;
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
            }
            .el-card__header {
                border-bottom: none;
            }
            .el-card__body {
                padding:0;
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
            .recommend {
                border-top: 1px solid #E0E0E0;
                // border-bottom: 1px solid #E0E0E0;
                padding-top: 20px;
                padding-bottom: 20px;
            }
            .label {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                width: 57px;
                display: inline-block;
            }
            .w70 {
                width: 70px;
            }
            .pl20 {
                padding-left: 20px
            }
            .pr20 {
                padding-right: 20px;
            }
            .label-text {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(102,102,102,1);
                padding-left: 20px;
            }
            .line3 {
                max-height: 60px;
                display: -webkit-box;   
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                line-height: 20px;
                padding-left: 0;
            }
            .mt20 {
                margin-top: 20px;
            }
            .tags {
                span{
                    display: inline-block;
                    height: 17px;
                    border-right: 1px solid rgba(224,224,224,1);
                    line-height: 17px;
                    padding-right: 20px;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,167,95,1);
                    &:last-child {
                        border-right: none;
                    }
                }
                
            }
            .mt10 {
                margin-top: 10px;
            }
            .ml108 {
                margin-left: 108px;
            }
            .bt0 {
                border-bottom: 0;
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
            
            .showlog {
                span {
                    color: #FF6536;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                }
            }
            .cffa {
                color:rgba(255,137,95,1);
            }
            .e0e0 {
                color:rgba(224,224,224,1);
            }
            // 弹框
            .work-dialog {
                .el-dialog__body {
                    padding: 0;
                }
                .w200 {
                    .el-input {
                        width: 200px;
                        left: 10px;
                    }
                }
                .el-radio-button {
                    width: 120px;
                    height: 30px;
                }
                .el-radio-button__inner {
                    width: 120px;
                    height: 30px;
                    line-height: 6px;
                }
                .mf20 {
                    margin-left: 20px;
                    border-left: 1px solid #dcdfe6;
                }
                .el-select {
                    width: 100%;
                    height: 32px !important;
                    .el-input__inner {
                        height: 32px !important;
                    }
                }
                .bdf36 {
                    border: 1px solid #FF6536;
                    span {
                        color: #FF6536;
                    }
                }
                .el-col-4 {
                    text-align: center;
                    padding-left: 20px;
                }
                .el-select .el-tag {
                    margin: 10px 0 2px 15px;
                }
                .el-textarea__inner {
                    padding: 5px 15px;
                    border-radius: 2px;
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
                    font-weight:600;
                    color:rgba(64,64,64,1);
                    padding-left: 5px;
                }
            }
            .el-button  {
                width: 120px;
                height: 32px;
                padding: 0;
                line-height: 1;
                margin: 0 30px;
            }
            .el-form {
                margin-top: 20px;
                margin-right: 50px;
            }
            .el-input__inner {
                height: 30px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                color: #333333;
                line-height: 1;
            }
            .el-textarea__inner {
                height: 100px;
                margin-left: 10px;
            }
            .el-cascader .el-input, .el-cascader .el-input__inner {
                line-height: 2 !important;
            }
            .el-col-2 {
                text-align: center;
            }
            .el-dialog__body {
                padding:0;
            }
            .el-form-item__error  {
                left: 10px;
            }
            .el-date-editor .el-icon-circle-close {
                color: #D9D9D9
            }
             .el-cascader {
                width: 100%;
            }
            .icon {
                padding-right: 5px;
            }
            .el-radio-group  {
                display: flex;
                margin-top: 5px;
                margin-left: 10px;
            }
            .el-input {
                left: 10px;
            }
            .item-tags {
                position: absolute;
                top: 0;
                padding: 0px 15px;
                .el-tag {
                    height: 24px;
                    line-height: 22px;
                    border-color: rgb(251, 143, 55);
                    border-radius: 0px;
                    color: rgb(251, 143, 55);
                    background: #fff;
                    margin-right: 6px;
                    .el-icon-close {
                        color: rgb(251, 143, 55);
                        &:hover{
                            background-color: #FB8F37;
                            color: #fff;
                        }
                    }
                }
            }
            .item-select {
                position: absolute;
                top: 0;
                .el-tag {
                    height: 24px;
                    line-height: 22px;
                    border-color: rgb(251, 143, 55);
                    border-radius: 0px;
                    color: rgb(251, 143, 55) !important;
                    background: #fff;
                    margin-right: 6px;
                    span {
                        color: rgb(251, 143, 55) !important;     
                    }
                    .el-icon-close {
                        color: rgb(251, 143, 55);
                        background: #fff;
                        &:hover{
                            background-color: #FB8F37;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .delete-dialog {
            .el-dialog {
                margin-top: 30vh !important;
            }
            .el-dialog__header {
                text-align: center ;
                .el-dialog__title {
                    border-left: none;
                    font-size:20px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                    line-height:28px;
                }
            }
            .center {
                margin: 0 0 10px;
                padding: 0 40px;
                color: #666666;
                text-align: left;
                font-size: 16px;
                line-height: 22px;
                span {
                    color: #FF6536;
                }
            }
            .el-dialog__footer {
                padding-top: 10px;
                padding-bottom: 40px;
            }
            .dialog-footer {
                .el-button {
                    width: 120px;
                    height: 32px;
                    padding: 0;
                    line-height: 25px;  
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