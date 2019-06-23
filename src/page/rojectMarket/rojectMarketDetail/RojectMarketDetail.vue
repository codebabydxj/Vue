<template>
  <div class="projectDetail-content">
    <div class="market-title">
      <div class="main-cont tlf">
        <h4>项目市场</h4>
        <div class="bord"></div>
        <p>Meet Your Project</p>
        <p class="p16">在麦盟，发现创新机遇！助推下一匹商业黑马！</p>
      </div>
    </div>
    <div class="market-center main-cont">
      <!-- 顾问寻找中 -->
      <el-tabs
        v-model="activeName2"
        type="card"
        @tab-click="handleClick"
        :tab-position="tabPosition"
      >
        <el-tab-pane label="顾问寻找中" name="2">
          <el-card class="box-card card-content">
            <div class="projectDetail">
              <div class="detail-title">
                <span></span>
                <h4>项目详情</h4>
              </div>
              <div class="detail-content">
                <div class="detail-wx">
                  <div class="project-title">{{marketDetialData.projectName}}</div>
                  <div
                    class="project-wx"
                    @mouseover="isShowQrcode=true"
                    @mouseout="isShowQrcode=false"
                  >
                    <el-button>
                      <span class="button-text">分享：</span>
                      <span class="button-wx">
                        <img src="../../../../static/image/weixin-3.png" alt>
                      </span>
                    </el-button>
                    <div class="qrcode-wx" v-show="isShowQrcode">
                      <h4>分享到微信</h4>
                      <QrcodeTest :url="qrcodeUrl+'&selectType=2'" :id="'qrcode-2'"/>
                      <p>打开微信“扫一扫”
                        <br>将项目信息分享至微信
                      </p>
                    </div>
                  </div>
                </div>
                <div class="project-label">
                  <div class="card-label m0">
                    <div class="flex-time">
                      <div class="LengthType-time">
                        <span class="label">项目周期</span>
                        <span
                          class="label-text"
                          v-if="marketDetialData.projectLengthType == 0"
                        >0-3个月</span>
                        <span
                          class="label-text"
                          v-if="marketDetialData.projectLengthType == 1"
                        >3-6个月</span>
                        <span
                          class="label-text"
                          v-if="marketDetialData.projectLengthType == 2"
                        >6-12个月</span>
                        <span class="label-text" v-if="marketDetialData.projectLengthType == 3">其他时间</span>
                      </div>

                      <div class="address mt20">
                        <span class="label">项目地点</span>
                        <span
                          class="label-text ml17"
                        >{{marketDetialData.province}}{{marketDetialData.city}}</span>
                      </div>
                    </div>
                    <div class="card-label mf122">
                      <div class="release-time">
                        <span class="label">发布时间</span>
                        <span class="label-text">{{marketDetialData.releaseTime | moment}}</span>
                      </div>
                      <div class="start-time mt20 mr21">
                        <span class="label">开始时间</span>
                        <span class="label-text" v-if="marketDetialData.startTimeType == 0">越快越好</span>
                        <span
                          class="label-text"
                          v-if="marketDetialData.startTimeType == 1"
                        >{{marketDetialData.startTime | moment}}</span>
                        <span class="label-text" v-if="marketDetialData.startTimeType == 2">待商议</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-label">
                    <span class="label">项目描述</span>
                    <span class="label-text row3" v-html="marketDetialData.description"></span>
                  </div>
                  <div class="card-label">
                    <span class="label">交付标的</span>
                    <span class="label-text row3" v-html="marketDetialData.target"></span>
                  </div>
                  <div class="card-label">
                    <span class="label">预算方式</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 0">每日费用</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 1">固定单价</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 2">待商议</span>
                  </div>
                  <div class="card-label">
                    <span class="label">预算总价</span>
                    <span
                      class="label-text mt2"
                      v-if="marketDetialData && marketDetialData.budget"
                    >{{marketDetialData.budget | ExtenSion}}元</span>
                    <!-- <span class="label-text" v-if="!marketDetialData.budgetType == 1 || ">待商议</span> -->
                  </div>
                </div>
              </div>
              <div class="backbor"></div>
              <div class="consultant-needs">
                <div class="detail-title">
                  <span></span>
                  <h4>顾问需求</h4>
                </div>
                <div class="consultant-content">
                  <div class="card-label mt20">
                    <span class="label">是否驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 0">驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 1">非驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 2">待商议</span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">资质要求</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 0">初级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 1">中级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 2">高级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 3">专家</span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">所在行业</span>
                    <span
                      class="label-text"
                      v-if="marketDetialData.pIndustry && marketDetialData.pIndustry.length>0"
                    >
                      <span
                        v-for="(pIndustry_tag,index) in marketDetialData.pIndustry"
                        :key="index"
                        class="FFA75 blt pl10"
                      >{{pIndustry_tag.industryName}}</span>
                    </span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">专业技能</span>
                    <span
                      class="label-text"
                      v-if="marketDetialData.pSkill && marketDetialData.pSkill.length>0"
                    >
                      <span
                        v-for="(pskill_tag,index) in marketDetialData.pSkill"
                        :key="index"
                        class="FF895F blt pl10"
                      >{{pskill_tag.skillName}}</span>
                    </span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">语言要求</span>
                    <span
                      class="label-text"
                      v-for="(planguage_tag,index) in marketDetialData.planguage"
                      :key="index"
                    >
                      {{planguage_tag.language}}
                      <span>-</span>
                      <span v-if="planguage_tag.grade == 0" class="label-text ml0">母语</span>
                      <span v-if="planguage_tag.grade == 1" class="label-text ml0">精通</span>
                      <span v-if="planguage_tag.grade == 2" class="label-text ml0">熟练</span>
                      <span v-if="planguage_tag.grade == 3" class="label-text ml0">一般</span>
                    </span>
                  </div>
                </div>
              </div>
              <p
                class="status-btn mt20"
                v-if="(!userObj || (userObj && userObj.type === 1)) && isApplyProject"
              >
                <el-button type="primary" @click="showDlog">立即申请</el-button>
              </p>
              <!-- <div class="footer-button" v-if="this.type == 2"  @click="showDlog">立即申请</div>  -->
            </div>
          </el-card>
        </el-tab-pane>

        <!-- 顾问已匹配 -->
        <el-tab-pane label="顾问已匹配" name="3">
          <el-card class="box-card card-content">
            <div class="projectDetail">
              <div class="detail-title">
                <span></span>
                <h4>项目详情</h4>
              </div>
              <div class="detail-content">
                <div class="detail-wx">
                  <div class="project-title">{{marketDetialData.projectName}}</div>
                  <div
                    class="project-wx"
                    @mouseover="isShowQrcode=true"
                    @mouseout="isShowQrcode=false"
                  >
                    <el-button>
                      <span class="button-text">分享：</span>
                      <span class="button-wx">
                        <img src="../../../../static/image/weixin-3.png" alt>
                      </span>
                    </el-button>
                    <div class="qrcode-wx" v-show="isShowQrcode">
                      <h4>分享到微信</h4>
                      <QrcodeTest :url="qrcodeUrl+'&selectType=3'" :id="'qrcode-3'"/>
                      <p>打开微信“扫一扫”
                        <br>将项目信息分享至微信
                      </p>
                    </div>
                  </div>
                </div>
                <div class="project-label">
                  <div class="card-label">
                    <div class="flex-time">
                      <div class="LengthType-time">
                        <span class="label">项目周期</span>
                        <span
                          class="label-text ml17"
                          v-if="marketDetialData.projectLengthType == 0"
                        >0-3个月</span>
                        <span
                          class="label-text ml17"
                          v-if="marketDetialData.projectLengthType == 1"
                        >3-6个月</span>
                        <span
                          class="label-text ml17"
                          v-if="marketDetialData.projectLengthType == 2"
                        >6-12个月</span>
                        <span
                          class="label-text ml17"
                          v-if="marketDetialData.projectLengthType == 3"
                        >其他时间</span>
                      </div>
                      <div class="address mt20">
                        <span class="label">项目地点</span>
                        <span
                          class="label-text ml17"
                        >{{marketDetialData.province}}{{marketDetialData.city}}</span>
                      </div>
                    </div>
                    <div class="card-label mf122">
                      <div class="release-time">
                        <span class="label">发布时间</span>
                        <span class="label-text">{{marketDetialData.releaseTime | moment}}</span>
                      </div>
                      <div class="start-time mt20">
                        <span class="label">开始时间</span>
                        <span class="label-text" v-if="marketDetialData.startTimeType == 0">越快越好</span>
                        <span
                          class="label-text"
                          v-if="marketDetialData.startTimeType == 1"
                        >{{marketDetialData.startTime | moment}}</span>
                        <span class="label-text" v-if="marketDetialData.startTimeType == 2">待商议</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-label">
                    <span class="label">项目描述</span>
                    <span class="label-text row3" v-html="marketDetialData.description"></span>
                  </div>
                  <div class="card-label">
                    <span class="label">交付标的</span>
                    <span class="label-text row3" v-html="marketDetialData.target"></span>
                  </div>
                  <div class="card-label">
                    <span class="label">预算方式</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 0">每日费用</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 1">固定单价</span>
                    <span class="label-text" v-if="marketDetialData.budgetType == 2">待商议</span>
                  </div>
                  <div class="card-label">
                    <span class="label">预算总价</span>
                    <span
                      class="label-text"
                      v-if="marketDetialData && marketDetialData.budget"
                    >{{marketDetialData.budget | ExtenSion}}元</span>
                    <!-- <span class="label-text" v-if="!marketDetialData.budgetType == 1">待商议</span> -->
                  </div>
                </div>
              </div>
              <div class="backbor"></div>
              <div class="consultant-needs">
                <div class="detail-title">
                  <span></span>
                  <h4>顾问需求</h4>
                </div>
                <div class="consultant-content">
                  <div class="card-label mt20">
                    <span class="label">是否驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 0">驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 1">非驻场</span>
                    <span class="label-text" v-if="marketDetialData.deliverMethod == 2">待商议</span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">资质要求</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 0">初级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 1">中级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 2">高级</span>
                    <span class="label-text" v-if="marketDetialData.qualification == 3">专家</span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">所在行业</span>
                    <span
                      class="label-text"
                      v-if="marketDetialData.pIndustry && marketDetialData.pIndustry.length>0"
                    >
                      <span
                        v-for="(pIndustry_tag,index) in marketDetialData.pIndustry"
                        :key="index"
                        class="FFA75 blt pl10"
                      >
                        {{pIndustry_tag.industryName}}
                        <!-- <span class="e0e0"> | </span>    -->
                      </span>
                    </span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">专业技能</span>
                    <span
                      class="label-text"
                      v-if="marketDetialData.pSkill && marketDetialData.pSkill.length>0"
                    >
                      <span
                        v-for="(pskill_tag,index) in marketDetialData.pSkill"
                        :key="index"
                        class="FF895F blt pl10"
                      >
                        {{pskill_tag.skillName}}
                        <!-- <span class="e0e0"> | </span> -->
                      </span>
                    </span>
                  </div>
                  <div class="card-label mt20">
                    <span class="label">语言要求</span>
                    <span
                      class="label-text"
                      v-for="(planguage_tag,index) in marketDetialData.planguage"
                      :key="index"
                    >
                      {{planguage_tag.language}}
                      <span>-</span>
                      <span v-if="planguage_tag.grade == 0" class="label-text ml0">母语</span>
                      <span v-if="planguage_tag.grade == 1" class="label-text ml0">精通</span>
                      <span v-if="planguage_tag.grade == 2" class="label-text ml0">熟练</span>
                      <span v-if="planguage_tag.grade == 3" class="label-text ml0">一般</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="footer-button" v-if="this.activeName2 == '2'" @click.native="showDlog">立即申请</div>  -->
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <!--申请项目内容框-->
      <el-dialog
        class="program-dialog-model header-border-b"
        :visible.sync="dialogVisible"
        @close="closeDialog('ruleForm')"
        width="630px"
      >
        <h4 slot="title" class="dialog-title">
          <DTitle :name="'方案计划书'" :fontSize="18"/>
        </h4>
        <div>
          <el-form
            :model="applyProjectFrom"
            :rules="applyProjectRules"
            ref="ruleForm"
            label-width="100px"
            class="program-ruleForm"
          >
            <el-form-item label="胜任描述" prop="introduction">
              <el-input
                type="textarea"
                v-model="applyProjectFrom.introduction"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入您对项目的胜任描述，字数在300字以内"
                maxlength="300"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目规划" prop="proposal">
              <el-input
                type="textarea"
                v-model="applyProjectFrom.proposal"
                placeholder="请输入您对项目的初步规划，字数在300字以内"
                maxlength="300"
                :autosize="{ minRows: 4, maxRows: 6}"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-checkbox v-model="checked" class="checkbox-from">平台将收取项目费用的20%作为平台服务费用，请知晓。</el-checkbox>
        </div>
        <div slot="footer" class="dialog-footer text-centerr">
          <el-button @click="resetForm('ruleForm')" class="border mr60">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="solid"
            :disabled="!checked"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import {
  Table,
  Tabs,
  TabPane,
  Button,
  Dialog,
  Input,
  Checkbox,
  Tooltip,
  Card
} from "element-ui";
import DTitle from "@/components/DTitle";
import QrcodeTest from "@/components/QrcodeTest";
import { getProjectDetailUrl, projectDetailsUrl } from "@/serverApi/common";
import { submitApplication } from "@/serverApi/project";
import { MessageConfirm, MessageAlert } from "@/importElement/messageBox";
Vue.use(Card);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Tooltip);

export default {
  components: {
    DTitle,
    QrcodeTest
  },
  data() {
    return {
      title: "项目市场",
      activeName2: "2",
      tabPosition: "left",
      type: "2",
      marketDetialData: {},
      dialogVisible: false,
      dialogWx: false,
      center: true,
      showClos: false,
      textarea3: "",
      checked: true,
      modal: false,
      value: true,
      isApplyProject: false,
      applyProjectFrom: {
        introduction: "",
        proposal: ""
      },
      applyProjectRules: {
        introduction: [{ required: true, message: "请输入胜任描述" }],
        proposal: [{ required: true, message: "请输入项目规划" }]
      },
      isShowQrcode: false,
      qrcodeUrl: this.$route.params.id
        ? projectDetailsUrl + "&pid=" + this.$route.params.id
        : ""
    };
  },
  created() {
    this.getMarketDetail();
    // this.activeName2 = this.$route.params.type;
    this.activeName2 = this.$route.query.type;
    // if(this.userObj){
    //     this.qrcodeUrl = this.qrcodeUrl + '&type=' + this.userObj.type
    // }
  },
  methods: {
    // 侧边按钮切换
    handleClick(tab, event) {
      this.$router.push({ path: "/rojectMarket", query: { type: tab.name } });
      // this.$router.push({name:'rojectMarket',params:{activeName:this.type}})
    },
    // 获取数据
    getMarketDetail() {
      let parmes = { pid: this.$route.params.id };
      getProjectDetailUrl(this.userObj && this.userObj.type, parmes).then(
        response => {
          if (response.code == 200) {
            if (!response.data) return;
            this.marketDetialData = response.data;
            this.isApplyProject =
              !this.marketDetialData.appStatus &&
              this.marketDetialData.appStatus != 0
                ? true
                : false;
          }
        }
      );
    },
    // 申请项目弹框
    showDlog() {
      if (!this.userObj) {
        this.$store.dispatch("showLoginDialog");
      } else {
        this.dialogVisible = true;
      }
    },
    // 分享到微信事件
    ShardWx() {
      this.dialogWx = true;
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    // 表单取消时执行
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    //提交提交支付凭证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = new RegExp("\n", "g");
          this.applyProjectFrom.introduction = this.applyProjectFrom
            .introduction
            ? this.applyProjectFrom.introduction.replace(reg, "<br>")
            : "";
          this.applyProjectFrom.proposal = this.applyProjectFrom.proposal
            ? this.applyProjectFrom.proposal.replace(reg, "<br>")
            : "";
          let params = this.applyProjectFrom;
          params = Object.assign({ pid: this.$route.params.id }, params);
          submitApplication(params).then(response => {
            if (response.code == 200) {
              this.dialogVisible = false;
              MessageConfirm({
                title: "申请成功",
                content:
                  "您已成功申请该项目，最新消息将会通过手机短信、邮件及微信的方式将会对您进行及时告知。",
                okText: "继续申请项目",
                cancelText: "前往项目列表"
              })
                .then(res => {
                  this.$router.push({ path: "/rojectMarket" });
                })
                .catch(text => {
                  this.$router.push({ path: "/personalCenter/myProject" });
                });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  // 将数字转换成货币格式过滤器
  filters: {
    ExtenSion(value) {
      if (value && value != null) {
        value = String(value);
        var left = value.split(".")[0],
          right = value.split(".")[1];
        // right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        var temp = left
          .split("")
          .reverse()
          .join("")
          .match(/(\d{1,3})/g);
        // return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        return (
          (Number(value) < 0 ? "-" : "") +
          temp
            .join(",")
            .split("")
            .reverse()
            .join("")
        );
      } else if (value === 0) {
        // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return "0.00";
      } else {
        return "";
      }
    }
  },
  computed: {
    ...mapGetters(["userObj"])
  }
};
</script>

<style lang="scss">
.projectDetail-content {
  margin-bottom: 60px;
  margin-top: 80px;
  .market-title {
    width: 100%;
    height: 250px;
    background-image: url("../../../../static/image/market.png");
    .tlf {
      text-align: left;
      h4 {
        color: #333333;
        font-size: 32px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        padding-top: 50px;
      }
      .bord {
        width: 40px;
        height: 4px;
        background-color: #ff6536;
        margin-top: 12px;
      }
      p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #666666;
        margin-top: 12px;
      }
      .p16 {
        margin-top: 20px;
        margin-bottom: 65px;
      }
    }
  }
  .market-center {
    .box-card {
      text-align: left;
      margin-bottom: 150px;
      .el-card__body {
        padding: 20px 30px;
        .projectDetail {
          .detail-title {
            display: flex;
            align-items: center;
            span {
              width: 3px;
              height: 15px;
              background-color: #ff6536;
            }
            h4 {
              line-height: 24px;
              padding-left: 8px;
              font-size: 18px;
              font-family: PingFangSC-Medium;
              font-weight: 600;
              color: rgba(64, 64, 64, 1);
            }
          }
          .detail-content {
            .detail-wx {
              display: flex;
              justify-content: space-between;
              .project-title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 600;
                color: rgba(64, 64, 64, 1);
                margin-top: 20px;
              }
              .project-wx {
                width: 120px;
                height: 40px;
                border-radius: 3px;
                border: 1px solid rgba(255, 101, 54, 1);
                margin-right: 10px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                .el-button {
                  height: 100%;
                  border: none;
                  span {
                    display: inline;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    line-height: 35px;
                  }
                  .button-text {
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 101, 54, 1);
                    line-height: 42px;
                  }
                  .button-wx {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    // background:rgba(80,182,116,1);
                    border-radius: 50%;
                    line-height: 22px;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
            }
            .project-label {
              .card-label {
                margin-top: 20px;
                display: flex;
                // align-items: center;
                justify-content: flex-start;
                .row3 {
                  // display: -webkit-box;
                  // -webkit-box-orient: vertical;
                  // -webkit-line-clamp: 3;
                  // overflow: hidden;
                  line-height: 15px;
                  flex: 1;
                  margin-right: 20px;
                  // width: 440px;
                }
              }
              .m0 {
                // display: flex;
                // flex-direction: column;
                .flex-time {
                  display: flex;
                  flex-direction: column;
                }
                // .mf96 {
                //     margin-left: 101px;
                // }
              }
              .mf122 {
                display: flex;
                flex-direction: column;
                margin-top: 0;
                margin-left: 122px;
              }
            }
          }

          .consultant-needs {
            .consultant-content {
              margin-top: 25px;
            }
          }
          .footer-button {
            width: 260px;
            height: 45px;
            background: rgba(255, 101, 54, 1);
            border-radius: 3px;
            font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin: 40px auto 60px;
            text-align: center;
            line-height: 45px;
          }
        }
      }
    }
  }
  .backbor {
    height: 1px;
    background: rgba(224, 224, 224, 1);
    margin: 20px 0;
  }
  .mb15 {
    margin-bottom: 15px;
    margin-top: 0;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mr21 {
    margin-right: 21px;
  }
  .ml0 {
    margin-left: 0 !important;
  }
  .ml17 {
    margin-left: 17px !important;
  }
  .label {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: 57px;
  }
  .label-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-left: 20px;
    // line-height: 2;
  }
  .el-tabs__item {
    color: rgba(51, 51, 51, 1);
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }
  .FFA75 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 167, 95, 1);
    padding-left: 0 10px;
    &:first-child {
      padding: 0;
    }
  }
  .FF895F {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 137, 95, 1);
    &:first-child {
      padding: 0;
    }
  }
  .blt {
    border-left: 1px solid rgba(224, 224, 224, 1);
    &:first-child {
      border-left: none;
    }
  }
  .pl10 {
    padding: 0 10px;
    display: inline-block;
    &:first-child {
      padding-right: 10px;
    }
  }
  .textare-content {
    display: flex;
  }
  .attachment {
    display: flex;
    justify-content: space-between;
    margin-top: 27px;
    .attachment-start {
      .label2 {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(191, 191, 191, 1);
      }
    }
    .attachment-end {
      width: 60px;
      height: 24px;
      background: rgba(255, 101, 54, 1);
      border-radius: 3px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      text-align: center;
      margin-right: 40px;
    }
  }
  .textare-label {
    width: 70px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.85);
    padding-right: 5px;
    padding-top: 5px;
  }
  .el-tabs__header {
    background: #fff;
  }
  .el-tabs__item.is-active {
    color: #ff6536;
  }
  .el-tabs__item:hover {
    color: #333333;
  }
  .el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
    border-left: 3px solid #ff6536;
  }
  .el-tab-pane {
    margin-left: 15px;
  }
  .dlog-wx {
    .el-dialog {
      margin-right: 139px;
      margin-top: 220px !important;
    }
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        border: 0;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .el-dialog__header {
    text-align: left;
    .el-dialog__title {
      border-left: 2px solid #ff6536;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(64, 64, 64, 1);
      padding-left: 5px;
    }
  }
  .el-button {
    width: 120px;
    height: 25px;
    span {
      display: block;
      margin-top: -6px;
    }
  }
  .bdf36 {
    border: 1px solid #ff6536;
    span {
      color: #ff6536;
    }
  }
  .el-textarea__inner {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    height: 100px !important;
  }
  .el-dialog__body {
    padding: 0px 25px 30px;
  }
  .el-checkbox__label {
    color: #999999;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #999999;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ff845e;
    border-color: #ff845e;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #999999 !important;
  }
  .atooltip {
    background: #e4f0f0 !important;
    border: 1px solid #e4f0f0 !important;
  }
  .atooltip.aui-tooltip__popper[x-placement^="bottom"] .popper__arrow:after {
    border-bottom-color: #e4f0f0 !important;
  }
  .status-btn {
    text-align: center;
    padding-bottom: 40px;
    padding-top: 20px;
    .el-button {
      width: 260px;
      height: 45px;
      // background:rgba(255,101,54,1);
      border-radius: 3px;
      span {
        font-size: 18px;
        color: #fff;
        margin-top: 0;
      }
      &.disable {
        background: rgba(217, 217, 217, 1);
        border-color: #d9d9d9;
        cursor: auto;
      }
      &.btn-border {
        border: 1px solid rgba(255, 101, 54, 1);
        span {
          color: #ff6536;
        }
      }
    }
  }
  .program-dialog-model {
    &.header-border-b {
      .el-dialog__header {
        border-bottom: 1px solid #e0e0e0;
      }
    }
    .dialog-title,
    .el-dialog__headerbtn .el-dialog__close {
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
        line-height: 30px;
        border-radius: 4px;
        padding: 0;
        &.border {
          border: 1px solid rgba(255, 101, 54, 1);
          span {
            color: #ff6536;
            margin-top: 0;
          }
        }
        &.solid {
          span {
            color: #fff;
            margin-top: 0;
          }
        }
      }
      .el-button + .el-button {
        margin-left: 0;
      }
    }
    .checkbox-from {
      display: flex;
      margin-left: 30px;
      margin-top: -6px;
      align-items: center;
      span {
        color: #999999;
      }
    }
  }
  .qrcode-wx {
    width: 256px;
    height: 266px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    position: absolute;
    top: 96px;
    right: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // display: none;
    h4 {
      line-height: 24px;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 13px;
    }
    p {
      color: #666666;
      line-height: 20px;
      font-size: 14px;
      margin-top: 12px;
    }
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #666666;
  }
}
</style>
