<template>
  <div class="publishPriject-content">
    <div class="content main-cont">
      <div class="Priject-header">完整发布</div>
      <div class="progress">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写对接人信息" description="（对接人信息仅平台可见）" class="step1"></el-step>
          <el-step title="填写项目信息" class="step2"></el-step>
          <el-step title="填写顾问要求" class="step2"></el-step>
        </el-steps>
        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>
      <!-- 第一步 -->
      <div class="Priject-from-step1" v-if="active == 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司信息" prop="cid">
            <el-select v-model="ruleForm.cid" placeholder="请选择公司">
              <el-option
                v-for="item in companyListData"
                :key="item.cid"
                :label="item.name"
                :value="item.cid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务负责人" prop="principalName" class="Leading mf70">
            <el-input v-model="ruleForm.principalName" autocomplete="off" placeholder="请输入业务负责人"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="principalPosition">
            <el-input v-model="ruleForm.principalPosition" autocomplete="off" placeholder="请输入职位名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="principalPhone">
            <el-input v-model="ruleForm.principalPhone" autocomplete="off" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="工作邮箱" prop="principalEmail">
            <el-input v-model="ruleForm.principalEmail" autocomplete="off" placeholder="请输入工作邮箱"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="step1Next('ruleForm')">下一步</el-button>
          <el-button
            @click="steponeSavaraft('isSkip')"
            class="bdf36"
            :plain="true"
            v-if="!this.isSavaraft"
          >存为草稿</el-button>
          <el-button
            @click="steponeSavaraft()"
            class="bdf36"
            :plain="true"
            v-if="this.isSavaraft"
          >保存</el-button>
        </span>
      </div>
      <!-- 第二步 -->
      <div class="Priject-from-step2" v-if="active == 1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="项目名称" prop="projectName" class="mf70">
            <el-input
              v-model="ruleForm.projectName"
              autocomplete="off"
              maxlength="30"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="description">
            <el-input
              type="textarea"
              v-model="ruleForm.description"
              maxlength="300"
              placeholder="请输入您对项目描述，字数在300字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="交付标的" prop="target">
            <el-input
              type="textarea"
              v-model="ruleForm.target"
              maxlength="300"
              placeholder="请输入您对项目的初步规划，字数在300字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note" class="mt30">
            <span class="remark-decription">（仅平台可见）</span>
            <el-input
              type="textarea"
              v-model="ruleForm.note"
              maxlength="300"
              placeholder="请输入您对项目的初步规划，字数在300字以内"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBackStep('ruleForm')">上一步</el-button>
          <el-button type="primary" @click="step1Next('ruleForm')">下一步</el-button>
          <el-button @click="stepTwoSavaraft('isSkip')" class="bdf36" v-if="!this.isSavaraft">存为草稿</el-button>
          <el-button @click="stepTwoSavaraft()" class="bdf36" v-if="this.isSavaraft">保存</el-button>
        </span>
      </div>
      <!-- 第三步 -->
      <div class="Priject-from-step3" v-if="active == 2">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所在行业" prop="industrys">
            <el-select
              v-model="ruleForm.industrys"
              multiple
              :multiple-limit="3"
              filterable
              allow-create
              default-first-option
              placeholder="请选择公司行业"
              class="item-select"
            >
              <el-option
                v-for="item in industryList"
                :key="item.ilid"
                :label="item.industryName"
                :value="item.ilid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业技能" prop="skillList">
            <!-- <el-select v-model="ruleForm.region" placeholder="请选择专业技能">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
            </el-select>-->
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
                @close="handleClose(tag)"
              >{{tag.text}}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="项目时间" prop="projectLengthType" class="selctTime">
            <el-radio-group v-model="ruleForm.projectLengthType" class="selctTimeRadio">
              <el-radio label="0">0-3个月</el-radio>
              <el-radio label="1">3-6个月</el-radio>
              <el-radio label="2">6-12个月</el-radio>
              <el-radio label="3">其他</el-radio>
              <el-form-item prop="projectLength">
                <el-input
                  v-model="ruleForm.projectLength"
                  autocomplete="off"
                  placeholder="请输入所需月份"
                  class="company-input"
                >
                  <span slot="suffix" class="date-input">个月</span>
                </el-input>
              </el-form-item>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTimeType" class="selctTime">
            <el-radio-group
              v-model="ruleForm.startTimeType"
              class="selctTimeRadio"
              @change="radioChange"
            >
              <el-radio label="0">立即开始</el-radio>
              <el-radio label="1">指定日期</el-radio>
              <el-form-item prop="startTime">
                <el-date-picker
                  type="date"
                  placeholder="请选择指定日期"
                  v-model="ruleForm.startTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-radio label="2" class="ml95">不确定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否驻场" prop="deliverMethod">
            <el-radio-group v-model="ruleForm.deliverMethod" class="mt13">
              <el-radio label="0">驻场</el-radio>
              <el-radio label="1">非驻场</el-radio>
              <el-radio label="2">待商议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目地点" class="projectAddress" required>
            <el-col :span="11">
              <el-form-item prop="provinceText">
                <el-select
                  v-model="ruleForm.provinceText"
                  placeholder="选择省份"
                  @change="provinceChanged"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="cityText">
                <el-select v-model="ruleForm.cityText" placeholder="选择城市" @change="cityChanged">
                  <el-option
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <div class="bord"></div>
          <el-form-item label="预算方式" prop="budgetType">
            <span class="resource">（日薪）</span>
            <el-radio-group v-model="ruleForm.budgetType" class="mt70" @change="budgetRadio">
              <el-radio label="0">日薪结算</el-radio>
              <el-radio label="1">固定单价</el-radio>
              <el-radio label="2">待商议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目预算" required>
            <div v-if="ruleForm.budgetType == 0">
              <el-col :span="8">
                <el-form-item prop="budgetDay">
                  <el-input
                    v-model.number="ruleForm.budgetDay"
                    autocomplete="off"
                    placeholder="请输入预算金额"
                    @change="InputChange(0)"
                  >
                    <span slot="suffix" class="date-input">元/天</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="ml55">
                <el-form-item prop="workload">
                  <el-input
                    type="text"
                    v-model.number="ruleForm.workload"
                    autocomplete="off"
                    placeholder="请输入预算天数"
                    @change="InputChange(0)"
                  >
                    <span slot="suffix" class="date-input">天</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
            <div v-if="ruleForm.budgetType == 1">
              <el-col :span="8">
                <el-form-item prop="budget">
                  <el-input
                    type="text"
                    v-model.number="ruleForm.budget"
                    autocomplete="off"
                    placeholder="请输入预算金额"
                    @change="InputChange(1)"
                  >
                    <span slot="suffix" class="date-input">元</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
            <div v-if="ruleForm.budgetType == 2">待商议</div>
          </el-form-item>
          <el-form-item label="总预算" prop="budget" v-if="ruleForm.budgetType == 0" class="AllBuget">
            <div
              v-if="ruleForm.budgetType == 0 || ruleForm.budgetType == 1"
              class="date-input"
            >{{(ruleForm.budget || 0) | ExtenSion}} 元</div>
            <div v-if="ruleForm.budgetType == 2" class="date-input">待商议</div>
          </el-form-item>
          <el-form-item label="语言要求" class="projectAddress">
            <div v-for="(languageList_item,index) in languageList" :key="index">
              <el-col :span="8">
                <el-form-item prop="languages" class="Leading mf70">
                  <el-input
                    v-model="languageList_item.languages"
                    autocomplete="off"
                    placeholder="请输入语言类别"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="ml55">
                <el-form-item prop="grade">
                  <el-select v-model="languageList_item.grade" placeholder="要求等级">
                    <el-option label="母语" value="0"></el-option>
                    <el-option label="精通" value="1"></el-option>
                    <el-option label="熟练" value="2"></el-option>
                    <el-option label="一般" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
            <div class="delLangular" @click="deleteLanguage" v-if="languageList.length >0">
              <span class="icon">
                <i class="el-icon-delete"></i>
              </span>
              <span>删除</span>
            </div>
          </el-form-item>
          <div class="add mt20" @click="addLanguageList">
            <span>
              <i class="el-icon-circle-plus"></i>
            </span>
            <span>添加一门新语言</span>
          </div>
          <el-form-item label="顾问资质" prop="qualification" class="qualification">
            <el-radio-group v-model="ruleForm.qualification" @change="selectLabel">
              <el-radio-button label="0">专家</el-radio-button>
              <el-radio-button label="1">高级</el-radio-button>
              <el-radio-button label="2">中级</el-radio-button>
              <el-radio-button label="3">初级</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div class="card">
            <el-card class="box-card" v-if="showCard == 0">
              <div class="card-title">
                <span class="text">
                  <i class="el-icon-info icon"></i>
                  <span class="text-label">专家</span>
                </span>
                <span class="c3333">日薪范围
                  <span class="text">￥6000 - 10000</span>
                </span>
              </div>
              <p class="card-decription">
                具备 12 年以上的业务或咨询行业工作经验，是某一行业或领域公认的专家或意见领袖，
                可引导企业客户或项目团队进行问题专项讨论或研究，从而达成或超出项目预期。
              </p>
            </el-card>
            <el-card class="box-card" v-if="showCard == 1">
              <div class="card-title">
                <span class="text">
                  <i class="el-icon-info icon"></i>
                  <span class="text-label">高级</span>
                </span>
                <span class="c3333">日薪范围
                  <span class="text">￥4000 - 6000</span>
                </span>
              </div>
              <p class="card-decription">
                具备 8-12 年的业务或咨询行业工作经验，对某一行业及业务领域有独到见解，
                可辅导或领导整个项目团队解决业务难题从而达成或超出项目预期。
              </p>
            </el-card>
            <el-card class="box-card" v-if="showCard == 2">
              <div class="card-title">
                <span class="text">
                  <i class="el-icon-info icon"></i>
                  <span class="text-label">中级</span>
                </span>
                <span class="c3333">日薪范围
                  <span class="text">￥2000 - 4000</span>
                </span>
              </div>
              <p class="card-decription">具备 5-8 年的业务或咨询行业工作经验，可独立完成项目管理并确保内容交付。</p>
            </el-card>
            <el-card class="box-card" v-if="showCard == 3">
              <div class="card-title">
                <span class="text">
                  <i class="el-icon-info icon"></i>
                  <span class="text-label">初级</span>
                </span>
                <span class="c3333">日薪范围
                  <span class="text">￥500 - 2000</span>
                </span>
              </div>
              <p class="card-decription">具备 3-5 年的业务或咨询行业工作经验，可协助项目负责人完成项目内容交付或独立完成简单项目的交付。</p>
            </el-card>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goBackStep('ruleForm')">上一步</el-button>
          <el-button type="primary" @click="application('ruleForm')">申请发布</el-button>
          <el-button @click="threeTwoSavaraft('isSkip')" class="bdf36" v-if="!this.isSavaraft">存为草稿</el-button>
          <el-button @click="threeTwoSavaraft()" class="bdf36" v-if="this.isSavaraft">保存</el-button>
        </span>
      </div>
      <!-- 保存草稿成功弹框 -->
      <div class="work-dialog">
        <el-dialog
          title="保存成功"
          :visible.sync="successfulDlog"
          :close-on-click-modal="onclickModal"
          width="400px"
          center
        >
          <div class="saveText">项目草稿保存成功，您后续可以在“个人中心-我的项目”中查找该项目。</div>
          <span slot="footer" class="dialog-footer1">
            <el-button type="primary" @click="hiddenSaveDlog()">确定</el-button>
          </span>
        </el-dialog>
      </div>
      <div
        class="goSpeed"
        @click="goSpeed"
        :class="{bdt:classenable}"
        @mouseover="addClassload"
        @mouseout="removeClassload"
      >前往快速发布>>></div>
      <Comfirm :confirmModalOptions="confirmOptions" ref="myConfirm"></Comfirm>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import chineseCities from "@/assets/chinese-cities";

import {
  Card,
  Icon,
  Step,
  Steps,
  Form,
  FormItem,
  Select,
  Option,
  Button,
  Col,
  Radio,
  RadioGroup,
  DatePicker,
  RadioButton,
  Cascader,
  Tag
} from "element-ui";
Vue.use(Icon);
Vue.use(Card);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Col);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(RadioButton);
Vue.use(Cascader);
Vue.use(Tag);
import {
  getCompanyListUrl,
  savaraftUrl,
  getSpeedrelease,
  getIndustryListUrl,
  getSkillUrl,
  getSkillSecondaryUrl,
  releaseProjectUrl
} from "@/serverApi/personalCenter";
import { getProjectDetail } from "@/serverApi/project";
import Comfirm from "@/components/Comfirm";
import { MessageConfirm, MessageAlert } from "@/importElement/messageBox";
import { join } from "path";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      let regPhone = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
      if (!value) {
        callback(new Error("请输入联系方式"));
      } else if (!regPhone.test(value)) {
        callback(new Error("请输入正确的联系方式"));
      } else {
        callback();
      }
    };
    var validateSkill = (rule, value, callback) => {
      if (this.skillTags.length > 2) {
        callback(new Error("专业技能不能超过3个"));
      } else {
        callback();
      }
    };
    var validateBudgetDay = (rule, value, callback) => {
      let numberReg = /[^0-9.]/g;
      if (!value) {
        callback(new Error("请输入预算金额"));
      } else if (numberReg.test(value)) {
        callback(new Error("请输入数字"));
      } else if (value && value > 99999) {
        callback(new Error("日薪结算不能超过5位数"));
      } else {
        callback();
      }
    };
    var validateBudget = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入预算金额"));
      } else if (value && value > 999999999) {
        callback(new Error("固定单价不能超过9位数"));
      } else {
        callback();
      }
    };
    var validateDescription = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入项目描述"));
      } else {
        callback();
      }
    };
    var validateStartTime = (rule, value, callback) => {
      if (!value && this.ruleForm.startTimeType == 1) {
        callback(new Error("请输入指定日期"));
      } else {
        callback();
      }
    };
    return {
      title: "发布项目",
      active: 0,
      startProject: false,
      classenable: false,
      showStep1: true,
      showStep2: false,
      showStep3: false,
      confirmOptions: {},
      showCard: 0,
      showD: false,
      companyListData: [],
      dutiesShow: "",
      PdutiesShow: "",
      budRadio: "0",
      provinceList: [],
      cityList: [],
      successfulDlog: false,
      releaseSuccsssful: false,
      onclickModal: false,
      isKeep: false,
      isSavaraft: false,
      pid: "",
      isSkip: "",
      // addLanguageDlog:false,
      // showClos:false,
      industryList: [],
      skillList: [],
      languageList: [],
      projectDetailsData: {},
      ruleForm: {
        // 第一步
        cid: "",
        principalName: "",
        principalPosition: "",
        principalPhone: "",
        principalEmail: "",
        // 第二步
        projectName: "",
        description: "",
        target: "",
        note: "",
        // 第三步
        industrys: [],
        skills: [],
        otherIndustrys: "",
        otherSkills: "",
        projectLengthType: "0",
        projectLength: "",
        startTimeType: "0",
        startTime: "",
        deliverMethod: "0",
        // province:'',
        // city:'',
        provinceText: "",
        cityText: "",
        budgetType: "0",
        workload: "",
        budgetDay: "",
        budget: "",
        languages: "",
        grade: "",
        qualification: 0
        // 快速发布
        // description:''
      },
      rules: {
        cid: [{ required: true, message: "请选择公司名称", trigger: "change" }],
        principalName: [
          { required: true, message: "请输入业务负责人", trigger: "change" }
        ],
        principalPhone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        principalEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "change" }
        ],
        description: [
          {
            required: true,
            message: "请输入项目描述",
            trigger: "blur"
          }
        ],
        startTimeType: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        startTime: [
          { required: true, validator: validateStartTime, trigger: "blur" }
        ],
        deliverMethod: [
          { required: true, message: "请选择驻场条件", trigger: "change" }
        ],
        provinceText: [
          { required: true, message: "请选择所在省份", trigger: "change" }
        ],
        cityText: [
          { required: true, message: "请选择所在城市", trigger: "change" }
        ],
        budgetType: [
          { required: true, message: "请选择预算方式", trigger: "change" }
        ],
        budgetDay: [
          {
            type: "number",
            required: true,
            validator: validateBudgetDay,
            trigger: "change"
          }
        ],

        workload: [
          {
            type: "number",
            required: true,
            message: "请输入预算天数",
            trigger: "change"
          }
        ],
        // description:[
        //     { required: true, message: '请输入项目描述', trigger: 'change' }
        // ],
        skills: [{ validator: validateSkill, trigger: "change" }]
      },
      skillData: [
        {
          value: "",
          label: "",
          children: []
        }
      ],
      props: {
        value: "value",
        children: "children"
      },
      skillTags: []
    };
  },
  components: {
    Comfirm
  },
  created() {
    this.getCompanyListData();
    this.provinceList = chineseCities[0].options;
    this.getIndustryData();
    this.getSkillData();
    this.languageList = [{ languages: "", grade: "" }];
    this.pid = this.$route.params.id;
    this.getProjectDetails();
    if (this.pid && this.pid > 0) {
      this.isSavaraft = true;
    }
  },

  methods: {
    // 项目详情请求
    getProjectDetails() {
      let params = { pid: this.$route.params.id };
      // let params = this.pid
      getProjectDetail(params).then(response => {
        if (response.code == 200) {
          this.projectDetailsData = response.data;
          let provinceValue =
            this.provinceList.find(
              f => f.text == this.projectDetailsData.province
            ) &&
            this.provinceList.find(
              f => f.text == this.projectDetailsData.province
            ).value;
          this.cityList = chineseCities[1].options.filter(
            f => f.parentVal == provinceValue
          );
          this.ruleForm = this.projectDetailsData;
          this.skillTags =
            this.projectDetailsData.pSkill &&
            this.projectDetailsData.pSkill.length > 0
              ? this.projectDetailsData.pSkill.map(s => ({
                  text: s.skillName,
                  id: s.psid
                }))
              : [];
          this.ruleForm.industrys =
            this.projectDetailsData.pIndustry &&
            this.projectDetailsData.pIndustry.length > 0
              ? this.projectDetailsData.pIndustry.map(f => {
                  if (f.piid == -1) {
                    return f.industryName;
                  } else {
                    return f.piid;
                  }
                })
              : [];

          this.languageList =
            this.projectDetailsData.planguage &&
            this.projectDetailsData.planguage.length > 0
              ? this.projectDetailsData.planguage.map(m => ({
                  languages: m.language,
                  grade: JSON.stringify(m.grade)
                }))
              : [{ languages: "", grade: null }];
          this.ruleForm = Object.assign({}, this.ruleForm, {
            principalPhone: JSON.parse(this.projectDetailsData.principalPhone),
            provinceText: this.projectDetailsData.province,
            cityText: this.projectDetailsData.city,
            projectLengthType:JSON.stringify(this.projectDetailsData.projectLengthType) ||JSON.parse(0),
            startTimeType:JSON.stringify(this.projectDetailsData.startTimeType) || 0,
            startTime: this.projectDetailsData.startTime,
            deliverMethod: JSON.stringify(
              this.projectDetailsData.deliverMethod
            ),
            budgetType: JSON.stringify(this.projectDetailsData.budgetType) || 0,
            description:
              this.projectDetailsData.description && this.projectDetailsData.description.replace(/<br>/g, "\n"),
            target:
              this.projectDetailsData.target && this.projectDetailsData.target.replace(/<br>/g, "\n"),
            note:
              this.projectDetailsData.note && this.projectDetailsData.note.replace(/<br>/g, "\n"),
            qualification: JSON.stringify(this.projectDetailsData.qualification) || 0
          });
        }
      });
    },
    // 专业技能请求
    getSkillData(sfid, search) {
      let params = { type: 1 };
      params = sfid ? Object.assign({ sfid: sfid }, params) : params;
      params = search ? Object.assign({ search: search }, params) : params;
      getSkillUrl(params).then(response => {
        if (response.code == 200) {
          this.skillData = this.setSkillData(response.data.list);
        }
      });
    },
    // 获取一级技能列表并赋值
    setSkillData(data) {
      let newData = [];
      if (data && data.length) {
        data.map(d => {
          newData.push({ value: d.sfid, label: d.fName, children: [] });
        });
      }
      return newData;
    },
    // 选中值设置
    addOption(value) {
      let newValue = "";
      this.skillData.map(f => {
        if (f.value == value[0]) {
          newValue = f.children.find(d => d.value == value[1]).label;
        }
      });
      this.ruleForm.skillList = [];
      if (this.skillTags.find(s => s.id == value[1])) return;
      if (this.skillTags.length > 2) return;
      this.skillTags.push({ text: newValue, id: value[1] });
    },
    // 取消选择设置
    handleClose(tag) {
      this.skillTags.splice(this.skillTags.indexOf(tag), 1);
    },
    // 根据一级值获取二级列表
    handleItemChange(val) {
      if (!val && val.length < 1) return;
      let params = { sfid: val[0] };
      let skillDataChildren = this.skillData.find(d => d.value == val[0])
        .children;
      if (skillDataChildren && skillDataChildren.length > 0) return;
      getSkillSecondaryUrl(params).then(response => {
        if (response.code == 200) {
          if (!response.data) return;
          this.skillData.map(f => {
            if (f.value == params.sfid) {
              f.children =
                response.data.list && response.data.list.length > 0
                  ? response.data.list.map(d => {
                      return { value: d.ssid, label: d.sName };
                    })
                  : [];
            }
            return f;
          });
        }
      });
    },
    // 鼠标移入移除添加删除class样式
    addClassload() {
      this.classenable = true;
    },
    removeClassload() {
      this.classenable = false;
    },
    // 进度条触发函数
    next() {},
    // 发布第一步下一步
    step1Next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.active++;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上一步
    goBackStep() {
      this.active--;
    },
    // 顾问资质选中时触发
    selectLabel(value) {
      this.showCard = value;
    },
    // 前往快速发布
    goSpeed() {
      // 前往完整发布
      MessageConfirm({
        title: "切换新的发布方式",
        content:
          "切换发布方式之后，部分您已经填写的消息将不会被保存，确定继续前往吗？",
        okText: "确认",
        cancelText: "取消"
      })
        .then(res => {
          this.$store.dispatch("showReleaseDialog");
        })
        .catch(text => {
          console.log("取消操作");
        });
    },
    // 前往完整发布
    goFullRelease() {
      this.$refs.myConfirm.showModel();
      var _this = this;
      this.confirmOptions = {
        title: "切换新的发布方式",
        type: 1,
        message:
          "切换发布方式之后，部分您已经填写的消息将不会被保存，确定继续前往吗？   ",
        btnCancelText: "取消",
        btnSubmitText: "确认",
        btnSubmitFunction: function() {
          _this.$refs.myConfirm.closeModel();
          _this.startProject = false;
          _this.active = 0;
        },
        btnCancelFunction: function() {
          _this.$refs.myConfirm.closeModel();
        }
      };
    },
    // 公司列表请求
    getCompanyListData() {
      getCompanyListUrl().then(res => {
        if (res.code == 200) {
          this.companyListData = res.data;
        }
      });
    },
    // 第一步存为草稿
    steponeSavaraft(type) {
      this.isSkip = type;
      let OneSavaraft = this.ruleForm;
      let pid = this.pid;
      let uid = OneSavaraft.uid;
      let cid = OneSavaraft.cid;
      let principalName = OneSavaraft.principalName;
      let principalPosition = OneSavaraft.principalPosition || "";
      let principalPhone = OneSavaraft.principalPhone;
      let principalEmail = OneSavaraft.principalEmail;
      let parmas = {
        cid: cid,
        principalName: principalName,
        principalPosition: principalPosition,
        principalPhone: principalPhone,
        principalEmail: principalEmail
      };
      if (pid && pid != 0) {
        parmas = Object.assign({ pid: pid }, parmas);
      }
      if (uid) {
        parmas = Object.assign({ uid: uid }, parmas);
      }
      savaraftUrl(parmas).then(res => {
        if (res.code == 200) {
          this.pid = res.data.pid;
          this.successfulDlog = true;
        }
      });
    },
    // 第二步存为草稿
    stepTwoSavaraft(type) {
      this.isSkip = type;
      let reg = new RegExp("\n", "g");
      let TwoSavaraft = this.ruleForm;
      let pid = this.pid;
      let uid = TwoSavaraft.uid;
      let cid = TwoSavaraft.cid;
      let principalName = TwoSavaraft.principalName;
      let principalPosition = TwoSavaraft.principalPosition || "";
      let principalPhone = TwoSavaraft.principalPhone;
      let principalEmail = TwoSavaraft.principalEmail;
      let projectName = TwoSavaraft.projectName;
      let description = TwoSavaraft.description
        ? TwoSavaraft.description.replace(reg, "<br>")
        : "";
      let target = TwoSavaraft.target
        ? TwoSavaraft.target.replace(reg, "<br>")
        : "";
      let note = TwoSavaraft.note ? TwoSavaraft.note.replace(reg, "<br>") : "";
      let parmas = {
        cid: cid,
        principalName: principalName,
        principalPosition: principalPosition,
        principalPhone: principalPhone,
        principalEmail: principalEmail,
        projectName: projectName,
        description: description,
        target: target,
        note: note
      };
      if (pid && pid != 0) {
        parmas = Object.assign({ pid: pid }, parmas);
      }
      if (uid) {
        parmas = Object.assign({ uid: uid }, parmas);
      }
      savaraftUrl(parmas).then(res => {
        if (res.code == 200) {
          this.pid = res.data.pid;
          this.successfulDlog = true;
        }
      });
    },
    // 第三步存为草稿
    threeTwoSavaraft(type) {
      this.isSkip = type;
      let reg = new RegExp("\n", "g");
      let ThreeSavaraft = this.ruleForm;
      let pid = this.$route.params.id;
      let uid = ThreeSavaraft.uid || this.$route.query.uid;
      let cid = ThreeSavaraft.cid;
      let principalName = ThreeSavaraft.principalName;
      let principalPosition = ThreeSavaraft.principalPosition || "";
      let principalPhone = ThreeSavaraft.principalPhone;
      let principalEmail = ThreeSavaraft.principalEmail;
      let projectName = ThreeSavaraft.projectName;
      let description = ThreeSavaraft.description
        ? ThreeSavaraft.description.replace(reg, "<br>")
        : "";
      let target = ThreeSavaraft.target
        ? ThreeSavaraft.target.replace(reg, "<br>")
        : "";
      let note = ThreeSavaraft.note
        ? ThreeSavaraft.note.replace(reg, "<br>")
        : "";
      let industrys = this.getOtherIndustrys(1, ThreeSavaraft.industrys).join(
        ","
      );
      let time = new Date(ThreeSavaraft.startTime);
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let startTime = y + "-" + m + "-" + d;
      let otherIndustrys = this.getOtherIndustrys(
        -1,
        ThreeSavaraft.industrys
      ).join(",");
      let skills =
        this.skillTags && this.skillTags.length > 0
          ? this.skillTags.map(f => f.id).join(",")
          : "";
      let otherSkills =
        this.skillTags && this.skillTags.length > 0
          ? this.skillTags
              .map(f => {
                return 1;
              })
              .join(",")
          : "";
      let languages =
        this.languageList && this.languageList.length > 0
          ? this.languageList.map(f => f.languages).join(",")
          : "";
      let grade =
        this.languageList && this.languageList.length > 0
          ? this.languageList.map(f => f.grade).join(",")
          : "";
      let params = {
        cid: cid,
        principalName: principalName,
        principalPosition: principalPosition,
        principalPhone: principalPhone,
        principalEmail: principalEmail,
        projectName: projectName,
        description: description,
        target: target,
        note: note,
        industrys: industrys,
        otherIndustrys: otherIndustrys,
        skills: skills,
        otherSkills: otherSkills,
        projectLengthType: ThreeSavaraft.projectLengthType,
        projectLength: ThreeSavaraft.projectLength,
        startTimeType: ThreeSavaraft.startTimeType,
        startTime: startTime,
        deliverMethod: ThreeSavaraft.deliverMethod,
        budgetType: ThreeSavaraft.budgetType,
        budgetDay: ThreeSavaraft.budgetDay,
        workload: ThreeSavaraft.workload,
        budget: ThreeSavaraft.budget,
        languages: languages,
        grades: grade,
        province: ThreeSavaraft.provinceText,
        city: ThreeSavaraft.cityText,
        qualification: ThreeSavaraft.qualification
      };
      if (pid && pid != 0) {
        params = Object.assign({ pid: pid }, params);
      }
      if (uid) {
        params = Object.assign({ uid: uid }, params);
      }
      savaraftUrl(params).then(res => {
        if (res.code == 200) {
          this.pid = res.data.pid;
          this.successfulDlog = true;
        }
      });
    },
    // 发布项目
    application(formName) {
      let reg = new RegExp("\n", "g");
      let ThreeSavaraft = this.ruleForm;
      let pid = this.$route.params.id;
      let uid = ThreeSavaraft.uid || this.$route.query.uid;
      let cid = ThreeSavaraft.cid;
      let principalName = ThreeSavaraft.principalName;
      let principalPosition = ThreeSavaraft.principalPosition || "";
      let principalPhone = ThreeSavaraft.principalPhone;
      let principalEmail = ThreeSavaraft.principalEmail;
      let projectName = ThreeSavaraft.projectName;
      let description = ThreeSavaraft.description
        ? ThreeSavaraft.description.replace(reg, "<br>")
        : "";
      let target = ThreeSavaraft.target
        ? ThreeSavaraft.target.replace(reg, "<br>")
        : "";
      let note = ThreeSavaraft.note
        ? ThreeSavaraft.note.replace(reg, "<br>")
        : "";
      let industrys = this.getOtherIndustrys(1, ThreeSavaraft.industrys).join(
        ","
      );
      let otherIndustrys = this.getOtherIndustrys(
        -1,
        ThreeSavaraft.industrys
      ).join(",");
      let skills =
        this.skillTags && this.skillTags.length > 0
          ? this.skillTags.map(f => f.id).join(",")
          : "";
      let otherSkills =
        this.skillTags && this.skillTags.length > 0
          ? this.skillTags
              .map(f => {
                return 1;
              })
              .join(",")
          : "";
      let languages =
        this.languageList && this.languageList.length > 0
          ? this.languageList.map(f => f.languages).join(",")
          : "";
      let grade =
        this.languageList && this.languageList.length > 0
          ? this.languageList.map(f => f.grade).join(",")
          : "";
      let params = {
        cid: cid,
        principalName: principalName,
        principalPosition: principalPosition,
        principalPhone: principalPhone,
        principalEmail: principalEmail,
        projectName: projectName,
        description: description,
        target: target,
        note: note,
        industrys: industrys,
        otherIndustrys: otherIndustrys,
        skills: skills,
        otherSkills: otherSkills,
        projectLengthType: ThreeSavaraft.projectLengthType,
        projectLength: ThreeSavaraft.projectLength,
        startTimeType: ThreeSavaraft.startTimeType,
        startTime: ThreeSavaraft.startTime,
        deliverMethod: ThreeSavaraft.deliverMethod,
        budgetType: ThreeSavaraft.budgetType,
        budgetDay: ThreeSavaraft.budgetDay,
        workload: ThreeSavaraft.workload,
        budget: ThreeSavaraft.budget,
        languages: languages,
        grades: grade,
        province: ThreeSavaraft.provinceText,
        city: ThreeSavaraft.cityText,
        qualification: ThreeSavaraft.qualification
      };
      if (pid && pid != 0) {
        params = Object.assign({ pid: pid }, params);
      }
      if (uid) {
        params = Object.assign({ appoint: uid }, params);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          releaseProjectUrl(params).then(res => {
            if (res.code == 200) {
              // this.releaseSuccsssful = true;
              MessageConfirm({
                title: "发布成功",
                content:
                  "您已成功发布项目！我们将尽快对项目进行审核，审核结果将会以邮件和短信的形式通知您。",
                okText: "前往项目列表",
                cancelText: "返回首页"
              })
                .then(res => {
                  this.$router.push({ path: "/personalCenter/myProject" });
                })
                .catch(text => {
                  this.$router.push({ path: "/home" });
                });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //日薪结算选中变化时触发
    budgetRadio(value) {
      this.budRadio = value;
      let budgetData = this.ruleForm;
      // this.$refs[this.ruleForm].resetFields();
      if (value == 0) {
        this.ruleForm.budgetDay = null;
        this.ruleForm.budget =
          (this.ruleForm.workload || 0) * (this.ruleForm.budgetDay || 0);
        this.ruleForm.workload = null;
        return;
      }
      if (value == 1) {
        this.ruleForm.budget = null;
      }
    },
    // input变化时
    InputChange(type, value) {
      if (type == 0) {
        this.ruleForm.budget =
          (this.ruleForm.workload || 0) * (this.ruleForm.budgetDay || 0);
        if (this.ruleForm.workload == null || this.ruleForm.budgetDay == null) {
          this.ruleForm.budget = null;
        }
      } else {
        this.ruleForm.budget = this.ruleForm.budget;
      }
    },
    // 省改变时触发
    // provinceChanged(value) {
    //     this.ruleForm.city = ''
    //     this.cityList = chineseCities[1].options.filter(f=>{
    //         return f.parentVal == value;
    //     });
    // },
    // 省改变时触发
    provinceChanged(value) {
      // this.cityList = []
      this.cityList = chineseCities[1].options.filter(f => {
        return f.parentVal == value;
      });
      this.ruleForm.provinceText = chineseCities[0].options.find(
        f => f.value == value
      ).text;
      // this.cityText = this.cityList.map(f=>f.text)
      this.ruleForm.cityText = "";
    },
    // 市改变时触发
    cityChanged(value) {
      this.ruleForm.cityText = chineseCities[1].options.find(
        f => f.value == value
      ).text;
    },
    // 隐藏保存成功弹框
    hiddenSaveDlog() {
      if (this.isSkip) {
        this.successfulDlog = false;
      } else {
        this.successfulDlog = false;
        this.$router.push({ path: "/customerProject/details/" + this.pid });
      }
    },
    ispChange(value, item) {
    },
    // 获取行业标签
    getIndustryData() {
      getIndustryListUrl().then(res => {
        if (res.code == 200) {
          this.industryList = res.data;
        }
      });
    },
    /*获取行业其他值(行业：1，其他行业：-1)*/
    getOtherIndustrys(type, data) {
      return data.map(d => {
        if (typeof d == "number") {
          return type == 1 ? d : 1;
        } else {
          return type == 1 ? -1 : d;
        }
      });
    },
    // 弹框按钮
    addLanguageList() {
      // this.addLanguageDlog = true;
      this.languageList.push({ languages: "", grade: "" });
    },
    // 项目开始时间选中值变化时触发
    radioChange(value) {
      if (value == 0 || value == 2) {
        this.ruleForm.startTime = null;
      }
    },
    // 删除语言
    deleteLanguage() {
      this.languageList &&
        this.languageList.length > 0 &&
        this.languageList.pop();
    }
  },
  // 将数字转换成货币格式过滤器
  filters: {
    ExtenSion(value) {
      if (value && value != null) {
        value = String(value);
        var left = value.split(".")[0],
          right = value.split(".")[1];
        right = right
          ? right.length >= 2
            ? "." + right.substr(0, 2)
            : "." + right + "0"
          : ".00";
        var temp = left
          .split("")
          .reverse()
          .join("")
          .match(/(\d{1,3})/g);
        return (
          (Number(value) < 0 ? "-" : "") +
          temp
            .join(",")
            .split("")
            .reverse()
            .join("") +
          right
        );
      } else if (value === 0) {
        // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return "0.00";
      } else {
        return "";
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.path === "/publishProject/index/0") {
          this.active = 0;
          this.ruleForm = {};
          this.skillTags = [];
          this.$refs["ruleForm"].resetFields();
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  computed: {}
};
</script>

<style lang='scss'>
.publishPriject-content {
  text-align: left;
  background-color: #fff;
  padding-bottom: 100px;
  .content {
    .Priject-header {
      padding: 40px 0 60px;
      font-size: 28px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
    .progress {
      margin-bottom: 60px;
    }
    .work-dialog {
      .el-textarea {
        width: 100%;
        .el-textarea__inner {
          height: 100px;
        }
      }
      .dialog-footer1 {
        .el-button {
          width: 120px;
          height: 32px;
          span {
            display: block;
            margin-top: -4px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .goRelease {
        text-align: right;
        padding-right: 90px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 137, 95, 1);
      }
      .saveText {
        width: 320px;
        height: 44px;
        margin: 0 auto;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 22px;
      }
    }
  }
  .el-form-item__error {
    left: 10px;
  }
  .goSpeed {
    width: 120px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 137, 95, 1);
    margin-left: 108px;
    margin-top: 20px;
    box-sizing: border-box;
  }
  .bdt {
    border-bottom: 1px solid #ff6536;
  }
  .remark-decription {
    display: inline-block;
    margin-left: -100px;
    margin-top: 15px;
    color: #999999;
  }

  //element-ui 默认样式
  .el-select__tags {
    left: 10px;
  }
  //element-ui 默认样式
  .el-step__title.is-finish {
    margin-top: -30px;
    margin-left: 30px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-step__description.is-finish {
    margin-left: 20px;
    color: rgba(153, 153, 153, 1);
  }
  .step2 {
    .el-step__icon.is-text {
      margin-left: 10px;
    }
  }
  // 初始样式
  .el-step__icon {
    width: 32px;
    height: 32px;
  }
  .el-step__head.is-process {
    .el-step__icon.is-text {
      background: #ff6536;
      border-color: #ff5636;
      // font-size:14px;
      width: 32px;
      height: 32px;
      // border-radius: 50%;
      font-family: HelveticaNeue;
      color: rgba(248, 248, 248, 1);
    }
    .el-step__line {
      left: 160px;
      right: 16px;
      height: 1px;
      top: 17px;
      background: rgba(217, 217, 217, 1);
    }
    .el-step__icon-inner {
      font-size: 14px;
      font-family: HelveticaNeue;
      color: rgba(248, 248, 248, 1);
      font-weight: normal;
    }
  }
  .el-step__title.is-process {
    margin-top: -33px;
    margin-left: 53px;
    // padding-left: 15px;
    font-size: 14px;
    font-family: HelveticaNeue;
    color: #333333;
  }
  .el-step__description.is-process {
    color: rgba(191, 191, 191, 1);
    padding-left: 45px;
  }
  .el-step__head.is-success {
    .el-step__icon.is-text {
      background: #fff;
      color: #ff5636;
      border-color: #ff5636;
    }
    .el-step__line {
      left: 180px;
      right: 16px;
      height: 1px;
      top: 17px;
      background: rgba(217, 217, 217, 1);
    }
    .el-step__line-inner {
      // border-color: #D9D9D9;
      border: 1px solid #d9d9d9;
      background: rgba(217, 217, 217, 1);
      height: 1px !important;
      border-style: none;
    }
  }
  .el-step__head.is-wait .el-step__icon.is-text {
    border: 1px solid rgba(217, 217, 217, 1);
    font-size: 14px;
    font-family: HelveticaNeue;
    color: rgba(191, 191, 191, 1);
  }
  // 完成后的样式
  .el-step__title.is-success {
    padding-left: 5px;
    margin-top: -33px;
    margin-left: 45px;
    font-size: 16px;
    color: #666666;
  }

  .el-step__description.is-success {
    color: rgba(191, 191, 191, 1);
    background: #fff;
    margin-left: 45px;
  }
  // 正在执行样式
  .el-step__head.is-wait {
    .el-step__icon.is-text {
      color: rgba(191, 191, 191, 1);
    }
    .el-step__line {
      left: 160px;
      right: 16px;
      height: 1px;
      top: 15px;
      background: rgba(217, 217, 217, 1);
    }
    .el-step__icon-inner {
      font-size: 14px;
      font-family: HelveticaNeue;
      color: rgba(191, 191, 191, 1);
      font-weight: normal;
    }
  }
  .el-step__title.is-wait {
    padding-left: 5px;
    margin-top: -35px;
    margin-left: 45px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  // 表单样式
  .el-form {
    margin-top: 20px;
    width: 540px;
  }
  .el-form-item__label {
    color: #000;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    left: 10px;
    border-radius: 2px;
  }
  .el-input__inner {
    height: 32px;
    line-height: 1;
  }
  .el-col-2 {
    text-align: center;
  }
  .el-dialog__body {
    padding: 0;
  }
  .company-input {
    .el-input__inner {
      height: 32px;
      width: 158px;
      line-height: 1;
    }
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #c0c4cc;
  }
  .el-cascader {
    width: 95%;
  }
  .el-date-editor .el-icon-circle-close {
    color: #d9d9d9;
  }
  .el-textarea {
    padding-left: 10px;
  }
  .el-form-item.is-error .el-textarea__inner {
    border-color: #f56c6c;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #c0c4cc;
  }
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus {
    border-color: #c0c4cc;
  }
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #c0c4cc;
  }
  .el-textarea__inner:focus {
    outline: 0;
    border-color: #c0c4cc;
  }
  .el-textarea__inner {
    height: 200px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #606266;
  }
  .mt30 {
    .el-textarea {
      margin-top: -53px;
    }
  }
  .dialog-footer {
    margin-left: 108px;
    .el-button {
      width: 120px;
      height: 32px;
      border-radius: 3px;
      line-height: 3px;
      span {
        display: block;
        // margin-top: -6px;
      }
    }
    .bdf36 {
      border: 1px solid #ff6536;
      span {
        color: rgba(255, 101, 54, 1);
      }
    }
  }
  .Priject-from-step3 {
    .el-form {
      width: 690px;
      .el-select {
        width: 560px;
        .el-input__inner {
          height: 32px !important;
        }
      }
      .selctTime {
        .el-input {
          width: 177px;
          margin-left: 10px;
        }
        .selctTimeRadio {
          height: 32px;
        }
        .el-radio-group {
          padding-left: 20px;
          margin-top: 5px;
        }
      }
      .el-radio-group {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .el-date-editor.el-input {
          width: 200px !important;
          margin-left: 6px;
        }
      }
      .ml95 {
        margin-left: 95px;
      }
      .mt13 {
        margin-top: 13px;
      }
      .mt70 {
        margin-top: -46px;
      }
      .ml55 {
        margin-left: 55px;
      }
      .projectAddress {
        .el-select {
          width: 207px;
        }
        .delLangular {
          width: 100px;
          float: right;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 101, 54, 1);
          cursor: pointer;
          // line-height:20px;
          span {
            color: rgba(255, 101, 54, 1);
          }
          .icon {
            color: rgba(255, 101, 54, 1);
            font-size: 19px;
          }
        }
      }
      .bord {
        width: 623px;
        height: 1px;
        margin: 20px 0 20px 45px;
        background: rgba(233, 233, 233, 1);
      }
      .resource {
        margin-left: -73px;
        display: inline-block;
        margin-top: 20px;
      }
      .date-input {
        padding-left: 20px;
        padding-right: 20px;
      }
      .add {
        cursor: pointer;
        width: 200px;
        text-align: left;
        position: relative;
        top: -15px;
        left: 110px;
        span {
          color: #ff895f;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
      }
      .card {
        width: 595px;
        // margin-left: 109px;
        // margin-bottom: 40px;
        // margin-top: -5px;
        margin: -5px 0 40px 109px;
        .box-card {
          .card-title {
            display: flex;
            justify-content: space-between;
            .text {
              font-size: 14px;
              font-family: PingFangSC-Medium;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              .icon {
                color: #ff6536;
              }
              .text-label {
                padding-left: 2px;
              }
            }
            .c3333 {
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              padding-right: 20px;
            }
          }
          .card-decription {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin: 11px 0 30px;
            line-height: 20px;
          }
        }
      }
    }
    .item-tags {
      position: absolute;
      top: 0;
      padding: 0px 15px;
      .el-tag {
        height: 24px;
        line-height: 22px;
        border-color: rgb(255, 101, 54);
        border-radius: 0px;
        color: rgb(255, 137, 95);
        background: #fff;
        margin-right: 6px;
        .el-icon-close {
          color: rgb(255, 137, 95);
          &:hover {
            background-color: #fb8f37;
            color: #fff;
          }
        }
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
          &:hover {
            background-color: #fb8f37;
            color: #fff;
          }
        }
      }
    }
    .qualification {
      .el-radio-group {
        padding-left: 10px;
        padding-top: 5px;
      }
      .el-radio-button__inner {
        height: 32px;
        line-height: 0;
        padding-top: 17px;
      }
    }
  }
}
</style>