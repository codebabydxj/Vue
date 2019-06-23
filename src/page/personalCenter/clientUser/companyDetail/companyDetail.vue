<template>
    <div class="companyDetail-content">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div slot="header" class="header">
                <div class="consultant-title">公司基本信息</div>
            </div>
            <div class="consultant-content">
                <div class="consultant-Info ">
                    <div class="companyEdit">
                        <div>
                            <span class="label">公司名</span>
                            <span class="label-text ml20">{{companyDetaiData.companyName}}</span>
                        </div>
                        <div class="work-Time pl90 pointer">
                            <span class="label colorFF6536" @click="EditInfo(companyDetaiData)"><i class="el-icon-bianji icon"></i>编辑</span>
                            <!-- <span class="label-text colorFF6536"><i class="el-icon-delete"></i>删除</span> -->
                        </div>
                    </div>
                    <div>
                        <span class="label">公司行业</span>
                        <span class="label-text ml20" v-for ="(industryItem,index) in companyIndustryList" :key="index">{{industryItem.industryName}}</span>
                    </div>
                    <div class="mt20">
                        <span class="label">所在城市</span>
                        <span class="label-text ml20">{{companyDetaiData.province}} {{companyDetaiData.city}}</span>
                    </div>
                    <div class="mt20">
                        <span class="label">详细地址</span>
                        <span class="label-text ml20">{{companyDetaiData.address}}</span>
                    </div>
                    <div class="mt20">
                        <span class="label">公司规模</span>
                        <span v-if="companyDetaiData.scale==0" class="label-text ml20">0-50人</span>
                        <span v-if="companyDetaiData.scale==1" class="label-text ml20">50-100人</span>
                        <span v-if="companyDetaiData.scale==2" class="label-text ml20">100-500人</span>
                        <span v-if="companyDetaiData.scale==3" class="label-text ml20">500人以上</span>
                    </div>
                    <div class="mt20">
                        <span class="label">发展阶段</span>
                        <span v-if="companyDetaiData.stage == 0" class="label-text ml20">起步期</span>
                        <span v-if="companyDetaiData.stage == 1" class="label-text ml20">快速成长期</span>
                        <span v-if="companyDetaiData.stage == 2" class="label-text ml20">变革期</span>
                    </div>
                    <div class="mt20">
                        <span class="label">公司电话</span>
                        <span class="label-text ml20">{{companyDetaiData.companyPhone}}</span>
                    </div>
                    <div class="mt20">
                        <span class="label">公司网站</span>
                        <span class="label-text ml20">{{companyDetaiData.webSite}}</span>
                    </div>
                </div>
                <!-- 编辑公司弹框 -->
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
                            <el-form-item label="公司名" prop="companyName" class="companyName">
                                <el-input v-model="ruleForm.companyName" autocomplete="off" placeholder="请输入公司名称" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="公司行业" prop="industryIds" class="industryIds">
                                <el-select
                                    v-model="ruleForm.industryIds"
                                    multiple
                                    :multiple-limit='3'
                                    filterable
                                    allow-create
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
                                        <el-select v-model="ruleForm.provinceText" placeholder="选择省份" @change="provinceChanged" @click="provinceClick()">
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
                                        <el-select v-model="ruleForm.cityText" placeholder="选择城市" @change="cityChanged">
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
                            <el-form-item label="公司电话" prop="companyPhone">
                                <el-input v-model="ruleForm.companyPhone" autocomplete="off" placeholder="请输入公司电话" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="公司网站" prop="website">
                                <el-input v-model="ruleForm.website" autocomplete="off" placeholder="请输入公司网站" class="company-input"></el-input>
                            </el-form-item>
                            <el-form-item label="是否默认" prop="isdefault" class="btntype">
                                <el-button @click="Sure(1)" :class="{SureClass: ruleForm.isdefault == 1}" class="ml0">是</el-button>
                                <el-button @click="Sure(0)" class="mf20" :class="{SureClass: ruleForm.isdefault == 0}">否</el-button>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancel()" class="bdf37">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm') " class="bdf36">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <!-- 公司发票信息 -->
               <div>
                   <companyInvoice :companyDetailInvoice="companyDetaiData" :InvoiceFunction="getCompanyDetailData"></companyInvoice>
               </div>
                <!-- 付款人信息 -->
                <div>
                    <payerInfo :playInfoData="companyDetaiData"></payerInfo>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import companyInvoice from '../commons/companyInvoice'
import payerInfo from '../commons/payerInfo'
import { getCompanyDetailUrl,getIndustryListUrl, addOrUpdateCompanyUrl } from '@/serverApi/personalCenter';
import { Card, Button, Icon, Form, FormItem,Col,Select, Option  } from 'element-ui';
import chineseCities from '@/assets/chinese-cities';
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
export default {
    data() {
        var validatePhone = (rule, value, callback) => {
            let regPhone = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
            if (value && !regPhone.test(value)) {
                callback(new Error('请输入正确的电话号码,公司电话已0755-格式开头'));
            } else {
                callback();
            }
        };
         var validateEmail = (rule, value, callback) => {
            let regEmail = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (value &&!regEmail.test(value)) {
                callback(new Error('请输入正确的公司网站'));
            } else {
                callback();
            }
        };
        return {
            // editShow:false,
            companyDlog:false,
            showClos:false,
            industryListData:[],
            companyList:[],
            companyDetaiData:{},
            companyDetaiDataList:{},
            companyIndustryList:[],
            provinceList:[],
            newCompanyDetaiData:{},
            cityList:[],
            cid:"",
            // isdefault:true,
            isDefault:'',
            phoneReg:'',
            onclickModal:false,
            ruleForm:{
                companyName:'',
                industryIds:[],
                provinceText:'',
                cityText:'',
                address:'',
                scale:'',
                stage:'',
                companyPhone:'',
                website:'',
                isdefault:'',
                otherIndustrys:''
            },
            rules:{
                companyName:[
                    { required: true, message: '请选择公司名称', trigger: 'change' }
                ],
                industryIds:[
                    { required: true, message: '请选择公司行业', trigger: 'change' }
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
                companyPhone:[
                    { validator: validatePhone,trigger: 'change'}
                ]
            }
        }
    },
    created() {
        // this.companyList = this.$route.params.data;
        this.cid = this.$route.params.id;
        this.provinceList = chineseCities[0].options;
        this.getIndustryList();
        this.getCompanyDetailData();
    },
    components:{
        companyInvoice,
        payerInfo
    },
    methods:{
        // 获取公司详情
        getCompanyDetailData() {
            this.cid = this.$route.params.id;
            let params = {cid:this.cid};
            getCompanyDetailUrl(params).then(res => {
                if(res.code == 200) {
                    this.companyDetaiDataList = {
                        industryIds:res.data.industryList,
                        data:res.data
                    }
                    this.companyDetaiData = this.companyDetaiDataList.data;
                    this.companyIndustryList = this.companyDetaiDataList.industryIds
                    // this.isdefault = this.companyDetaiData.priority;
                }
            })
        },
        // 鼠标移入显示隐藏编辑按钮
        //  onEditShow() {
        //     this.editShow = true;
        // },
        // offEditShow() {
        //     this.editShow = false;
        // },
        // 编辑事件
        EditInfo(data) {
            let provinceValue = this.provinceList.find(f=>f.text==data.province).value;
            this.cityList = chineseCities[1].options.filter(f=>f.parentVal == provinceValue);
            this.ruleForm = data || {};
            this.ruleForm =JSON.parse(JSON.stringify(this.ruleForm));
            this.companyDlog = true;
            this.ruleForm.industryIds = this.ruleForm.industryList ? this.ruleForm.industryList.map(f=>{
                if(f.ilid >0){
                   return f.ilid 
                }else{
                    return f.industryName
                }
            }):[];
            
            this.ruleForm.isdefault = data.priority;
            this.ruleForm = Object.assign({},this.ruleForm, {
                provinceText:data.province,
                cityText:data.city,
                website:data.webSite,
                isdefault:data.priority,
                scale:String(data.scale),
                stage:String(data.stage)
            })
        },
        // 确定提交
        submitForm(formName) {
            let companyData = this.ruleForm;
            let cid = companyData['cid'] || 0;
            let priority = (companyData.isdefault ? 1:0);
            let industryList = this.getOtherIndustrys(1,companyData.industryIds).join(',');
            let otherIndustrys = this.getOtherIndustrys(-1,companyData.industryIds).join(',');  
             let params = {name:companyData.name,province:companyData.provinceText,city:companyData.cityText,address:companyData.address,
                industryIds:industryList,scale:companyData.scale,stage:companyData.stage,priority:priority,
                phone:companyData.companyPhone,website:companyData.website,otherIndustrys:otherIndustrys}
             if(cid) {
                 params = {name:companyData.name,province:companyData.provinceText,city:companyData.cityText,address:companyData.address,
                industryIds:industryList,scale:companyData.scale,stage:companyData.stage,priority:priority,
                phone:companyData.companyPhone,website:companyData.website,otherIndustrys:otherIndustrys,cid:cid}
             }
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    addOrUpdateCompanyUrl(params).then(res => {
                        if(res.code == 200) {
                            this.getCompanyDetailData();
                            this.companyDlog = false;
                        }
                    })
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
      cancel() {
          this.companyDlog = false;
      },
      // 获取行业标签
        getIndustryList() {
            getIndustryListUrl().then(res => {
                if(res.code == 200 ) {
                    this.industryListData = res.data;
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
        // 是否默认
        Sure(value) {
            this.isDefault = value
            this.ruleForm.isdefault = value;
        },
    }
}
</script>

<style lang="scss">
    .companyDetail-content {
        .box-card {
            text-align: left;
            margin-bottom: 90px;
            .consultant-content {
                .consultant-Info {
                    margin: 10px 0;
                    padding:10px 30px;
                    .NameTime {
                        display: flex;
                    }
                    .work-Time {
                        display: none;
                        margin-left: 120px;
                        margin-right: -70px;
                        cursor:pointer;
                        span {
                            color: #FF6536;
                        }
                    }
                    &:hover {
                        background:rgba(248,248,248,1);
                        .work-Time {
                            display: block;
                        }
                    }
                    .person-Name {
                        width: 250px;
                    }
                    .companyEdit {
                        height: 32px;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                .company-border {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(224,224,224,1);
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
        .mt20 {
            margin-top: 20px;
        }
        .pl20 {
            padding-left: 20px;
        }
        .ml20 {
            margin-left: 20px;
        }
        .pl90 {
                padding-right: 90px; 
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
            // padding-left: 20px;
        }
        .el-card__header {
            padding-bottom: 0;
            border-bottom: none;
            .header {
                padding-left: 10px;
            }
        }
        .el-card__body {
            padding: 0 20px 20px;
        }
        .w70 {
            width: 70px;
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
            
        }
        .SureClass {
            border: 1px solid #FF6536 !important;
            background: #fff;
            span {
                color: #FF6536 !important;
            }
        }
         .addcompany-dialog {
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
                line-height: 1px;
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
            .el-dialog__body {
                padding: 0px 0px 0px;
            }
            .el-form {
                margin-top: 20px;
                margin-right: 60px;
            }
            
            .el-input__inner {
                height: 30px !important;
                border-radius: 2px;
                border:1px solid rgba(217,217,217,1);
                line-height: 1;
            }
            .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus {
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
            .industryIds {
                .el-select {
                    width: 100%;
                }
                // .el-input__inner {
                //     // height: 30px !important;
                // }
            }
        }
        .icon {
            padding-right: 5px;
        }
         .item-select {
            position: absolute;
            top: 0;
            // padding: 0px 15px;
            .el-tag {
                height: 24px;
                // line-height: 22px;
                line-height: 2;
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
</style>
