<template>
    <div class="companny-Info" >
        <div class="header">
            <div class="consultant-title">公司信息</div>
        </div>
        <router-link tag="div" v-for="(companyItem,index) in companyList" :key="index" :to="{path:'/personalCenter/clientUser/companyDetail/'+companyItem.cid} " class="clientUser-btn">
            <div class="consultant-content"  @mouseover="onEditShow" @mouseout="offEditShow">
                <div class="show-botton">
                    <div class="person-Name">
                        <span class="label">公司名</span>
                        <span class="label-text">{{companyItem.name}}</span>
                    </div>
                    <div class="work-Time pl90" @click.stop="delEdit(companyItem)">
                        <!-- <span class="label-text colorFF6536"><i class="el-icon-delete"></i>编辑</span> -->
                        <span class="label-text colorFF6536"><i class="el-icon-delete icon"></i>删除</span>
                    </div>
                </div>
                <div class="mt20">
                    <span class="label">所在城市</span>
                    <span class="label-text">{{companyItem.province}} {{companyItem.city}}</span>
                </div>
                <div class="clearfix">
                    <div class="mt20" >
                        <span class="label">公司行业</span>
                        <span class="label-text" v-for ="(industryItem,index) in companyItem.industryList" :key="index">{{industryItem.industryName}}</span>
                    </div>
                    <el-button style="float: right; padding: 3px 0" type="text" class="bdf36" v-if="companyItem.priority ==1">默认公司</el-button>
                </div>
            
            </div>
        </router-link>

         <div class="add mt20" @click.stop="companyDlog = true">
            <span><i class="el-icon-circle-plus"></i></span>
            <span>添加公司</span>
        </div>
        <!-- 添加公司弹框 -->
        <div class="addcompany-dialog">
            <el-dialog
            title="公司基本信息"
            :visible.sync="companyDlog"
            width="630px"
            center
            :show-close="showClos"
            :close-on-click-modal="onclickModal"
            >
                <div class="backbor mb15"></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="公司名" prop="name" class="companyName">
                        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入公司名称" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="公司行业" prop="industryIds" class="industryIds">
                         <el-select
                            v-model="ruleForm.industryIds"
                            multiple
                            :multiple-limit='3'
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择公司行业"
                            class="item-select">
                            <el-option 
                                v-for="item in industryListData"
                                :key="item.ilid"
                                :label="item.industryName"
                                :value="item.ilid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在城市" required>
                        <el-col :span="12">
                            <el-form-item prop="provinceText">
                                <el-select v-model="ruleForm.provinceText" placeholder="选择省份" @change="provinceChanged">
                                    <el-option 
                                        v-for="item in provinceList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="cityText">
                                <el-select v-model="ruleForm.cityText" placeholder="选择城市"  @change="cityChanged">
                                    <el-option 
                                        v-for="item in cityList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="ruleForm.address" autocomplete="off" placeholder="请输入详细地址" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="公司规模">
                        <el-col :span="11">
                            <el-form-item prop="scale">
                                <el-select v-model="ruleForm.scale" placeholder="请选择公司规模">
                                    <el-option label="0-50人" value="0"></el-option>
                                    <el-option label="50-100人" value="1"></el-option>
                                    <el-option label="100-500人" value="2"></el-option>
                                    <el-option label="500人以上" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="发展阶段">
                        <el-col :span="11">
                            <el-form-item prop="stage">
                                <el-select v-model="ruleForm.stage" placeholder="请选择发展阶段">
                                    <el-option label="起步期" value="0"></el-option>
                                    <el-option label="快速成长期" value="1"></el-option>
                                    <el-option label="变革期" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="公司电话" prop="phone">
                        <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入公司电话" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="公司网站" prop="website">
                        <el-input v-model="ruleForm.website" autocomplete="off" placeholder="请输入公司网站" class="company-input"></el-input>
                    </el-form-item>
                    <el-form-item label="是否默认" prop="isdefault" class="btntype">
                        <el-button @click="Sure(1)" :class="{SureClass:this.isDefault == 1}" class="ml0">是</el-button>
                        <el-button @click="Sure(0)" class="mf20" :class="{SureClass:this.isDefault == 0}">否</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel('ruleForm')" class="bdf37">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm') " class="bdf36">确 定</el-button>
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
                    <el-button @click="deleteCancel" class="delete-cancel">取 消</el-button>
                    <el-button type="primary" @click="deleteSubmit()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Icon, Card,Dialog, Input, Col,Form, FormItem, Select,Option } from 'element-ui';
import { getCompanyListUrl, addOrUpdateCompanyUrl, getIndustryListUrl, delCompanyUrl } from '@/serverApi/personalCenter';
import chineseCities from '@/assets/chinese-cities';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
export default {
    data() {
        var validatePhone = (rule, value, callback) => {
            // let regPhone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            let regPhone = /^((1[357894]\d{9})|(0\d{2,3}-\d{7,8}))$/;
             if (value && !regPhone.test(value)) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            let regEmail = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (value && !regEmail.test(value)) {
                callback(new Error('请输入正确的公司网站'));
            } else {
                callback();
            }
        };
        var validateIndustrys = (rule, value, callback) => {
            if(!value) {
                callback(new Error('请选择公司行业'));
            }
            if (value && value.length < 1 ) {
                callback(new Error('请选择公司行业'));
            } else {
                callback();
            }
        };
        return {
            companyDlog:false,
            showClos:false,
            companyList:[],
            isDefault: null,
            industryListData:[],
            newCompanyDetaiData:[],
            provinceList:[],
            cityList:[],
            limit:3,
            editShow:false,
            deleteDialogShow:false,
            cid:'',
            onclickModal:false,
            ruleForm:{
                name:'',
                industryIds:[],
                // province:'',
                // city:'',
                provinceText:'',
                cityText:'',
                address:'',
                scale:'',
                stage:'',
                phone:'',
                website:'',
                isdefault:'',
                otherIndustrys:''
            },
            rules:{
                name:[
                    { required: true, message: '请选择公司名称', trigger: 'change' }
                ],
                industryIds:[
                    // { required: true, message: '请选择公司行业', trigger: 'change' }
                    { required: true,validator: validateIndustrys,trigger: 'change'}
                ],
                provinceText:[
                    { required: true, message: '请选择所在省份', trigger: 'change' }
                ],
                cityText:[
                    { required: true, message: '请选择所在城市', trigger: 'change' }
                ],
                // address:[
                //     { required: true, message: '请输入详细地址', trigger: 'change' }
                // ],
                website:[
                    { validator: validateEmail,trigger: 'change'}
                ],
                phone:[
                    // { type: 'number', message: '请输入数字', trigger: ['blur', 'change'] },
                    { validator: validatePhone,trigger: 'change'} 
                ]
            }
        }
    },
    created() {
        this.getCompanyListData();
        this.getIndustryList();
        this.provinceList = chineseCities[0].options;
    },
    computed:{},
    methods:{
        // 获取公司列表
        getCompanyListData() {
            getCompanyListUrl().then(res => {
                if(res.code == 200) {
                    this.companyList = res.data
                }
            })
        },
        // 确定提交
        submitForm(formName) {
             let companyData = this.ruleForm;
                 companyData.isdefault = this.isDefault
             let cid = companyData['cid'] || 0;
            //  let priority = (companyData.isdefault ? 1:0);
             let priority = companyData.isdefault;
            
             let industryList = this.getOtherIndustrys(1,companyData.industryIds).join(',');
             let otherIndustrys = this.getOtherIndustrys(-1,companyData.industryIds).join(',');
             let params = {name:companyData.name,province:companyData.provinceText,city:companyData.cityText,address:companyData.address,
                industryIds:industryList,scale:companyData.scale,stage:companyData.stage,priority:priority,
                phone:companyData.phone,website:companyData.website,otherIndustrys:otherIndustrys}
             if(cid) {
                 params = {name:companyData.name,province:companyData.provinceText,city:companyData.cityText,address:companyData.address,
                industryIds:industryList,scale:companyData.scale,stage:companyData.stage,priority:priority,
                phone:companyData.phone,website:companyData.website,otherIndustrys:otherIndustrys,cid:cid}
             };
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    addOrUpdateCompanyUrl(params).then(res => {
                        if(res.code == 200) {
                            this.getCompanyListData();
                            this.companyDlog = false;
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 点击取消
        cancel(formName) {
            this.companyDlog = false;
            // this.industryIds = [];
            this.$refs[formName].resetFields();
        },
        // 是否默认
        Sure(value) {
            this.isDefault = value
            this.ruleForm.isdefault = value;
        },
        // 获取行业标签
        getIndustryList() {
            getIndustryListUrl().then(res => {
                if(res.code == 200 ) {
                    this.industryListData = res.data;
                }
            })
        },
        /*获取行业其他值(行业：1，其他行业：-1)*/
        getOtherIndustrys(type, data) {
            return data.map(d=>{
                if(typeof d == 'number') {
                    return type==1 ? d : 1;
                }else {
                    return type==1 ? -1 : d;
                }
            })
        },
        // 省改变时触发
        provinceChanged(value) {
            this.cityList = []
            this.cityList = chineseCities[1].options.filter(f=>{
                return f.parentVal == value;
            });
            this.ruleForm.provinceText = chineseCities[0].options.find(f=>f.value==value).text
            this.ruleForm.cityText = ''
        },
        // 市改变时触发
        cityChanged(value) {
           this.ruleForm.cityText = chineseCities[1].options.find(f=>f.value==value).text
        },
        // 鼠标移入显示隐藏编辑按钮
         onEditShow() {
            this.editShow = true;
        },
        offEditShow() {
            this.editShow = false;
        },
        // 删除公司列表
        delEdit(data) {
            this.cid = data.cid;
            this.deleteDialogShow = true;
        },
        // 删除取消确认事件
        deleteCancel() {
            this.deleteDialogShow = false;
        },
        deleteSubmit () {
            let params = {cid:this.cid}
            delCompanyUrl(params).then(res => {
                if(res.code == 200) {
                    this.deleteDialogShow = false;
                    this.getCompanyListData();
                }
            }) 
        }
    }
}
</script>

<style lang="scss">
    .companny-Info {
        padding-top: 20px;
        padding-bottom: 20px;
        cursor:pointer;
        .header {
            padding: 0 30px 0px;
           .consultant-title  {
                height:15px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color:rgba(51,51,51,1);
                line-height:15px;
                border-left: 3px solid #FF6536;
                padding-left: 8px;
           }
        }
        .clientUser-btn {
            border-top: 1px dashed #D9D9D9;
            padding-bottom: 20px;
            &:nth-child(2) {
                border-top: none;
            }
        }
        .consultant-content {
            margin-top:10px;
            padding: 10px 30px;
            // margin-bottom: 20px;
            // padding-bottom: 20px;
            // border-bottom: 1px dashed #D9D9D9;
            // &:last-child {
            //     border-bottom: none;
            // }
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
                height: 16px;
                display: flex;
                justify-content: space-between;
                .colorFF6536 {
                    cursor:pointer;
                    color: #FF6536;
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
        .SureClass {
            border: 1px solid #FF6536 !important;
            background: #fff;
            span {
                color: #FF6536 !important;
            }
        }
        .btntype {
            // margin-top: -10px;
            .el-button {
                width: 120px;
                height: 30px;
                margin-left: 10px;
                border-radius:2px;
                border:1px solid #D9D9D9;
                background: #fff;
               span {
                   color: #999999;
               }
            }
            // .mf20 {
            //     // margin-left: -20px;
            // }
            
        }
        .addcompany-dialog {
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
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    letter-spacing:2px;
                    margin-top: -4px;
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
            .ml0 {
                margin-left: 0;
            }
            .el-dialog__body {
                padding: 0px 0px 0px;
            }
            .el-form-item.is-success .el-input__inner, {
                border-color: #D9D9D9;
            }
            // .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right: -62px;
            //     color: #333333;
            // }
            // .companyName.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
            //     margin-right: -50px;
            //     color: #333333;
            // }
            // .el-select .el-input .el-select__caret {
            //     margin-right: 10px;
            // }
            // .el-col-12 {
            //     margin-right: -5px;
            // }
            .industryIds {
                .el-select {
                    width: 100%;
                }
                .el-input__inner {
                    height: 30px !important;
                    line-height: 1;
                }
            }
            .item-select {
                position: absolute;
                top: 0;
                // padding: 0px 15px;
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
        .el-button  {
            width:100px;
            height:24px;
            border-radius:3px;
            margin-top: -20px;
            background: #ff6536;
            span {
                display: block;
                font-size:12px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
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
                    width: 120px;
                    height: 32px;
                    padding: 0;
                    line-height: 25px;  
                }
                .delete-cancel {
                    border: 1px solid #FF6536;
                    background: #fff;
                    margin-right: 30px;
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
