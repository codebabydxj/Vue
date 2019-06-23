<template>
  <!-- 擅长语言 -->
  <div class="languuage-content" @mouseover="onEditShow" @mouseout="offEditShow">
    <div class="recommend mt20 bt0">
      <div class="clearfix">
        <div class="consultant-title">擅长语言</div>
        <div class="showlog">
          <span class="f14" @click="setShow(0)" v-if="isShow == 1">
            <i class="el-icon-display"></i>
            <span>已显示</span>
          </span>
          <span class="f14" @click="setShow(1)" v-if="isShow == 0">
            <i class="el-icon-hide"></i>
            <span>已隐藏</span>
          </span>
        </div>
      </div>
      <div class="languageInfo" v-for="(item,index) in languageItem" :key="index">
        <div class="showEditor">
          <div>
            <span class="label">{{item.language || '未选择'}}</span>
            <span class="label-text" v-if="item.grade == 0">母语</span>
            <span class="label-text" v-if="item.grade == 1">精通</span>
            <span class="label-text" v-if="item.grade == 2">熟练</span>
            <span class="label-text" v-if="item.grade == 3">一般</span>
          </div>
          <div class="work-Time pr20">
            <span class="label colorFF6536" @click="addLanguage(item)">
              <i class="el-icon-bianji icon"></i>编辑
            </span>
            <span class="label-text colorFF6536" @click="delLanguage(item)">
              <i class="el-icon-delete icon"></i>删除
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="add" @click="addLanguage(null)">
      <span>
        <i class="el-icon-circle-plus"></i>
      </span>
      <span>添加擅长语言</span>
    </div>
    <!-- 擅长语言弹框 -->
    <div class="gathering">
      <el-dialog
        title="擅长语言"
        :visible.sync="languageDlog"
        width="630px"
        center
        :show-close="showClos"
        :close-on-click-modal="onclickModal"
      >
        <div class="backbor"></div>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="擅长语言" prop="language">
            <el-input v-model="ruleForm.language" autocomplete="off" placeholder="请输入擅长语言"></el-input>
          </el-form-item>
          <el-form-item label="精通程度" prop="grade">
            <el-select v-model="ruleForm.grade" placeholder="精通程度" class="w200">
              <el-option label="母语" value="0"></el-option>
              <el-option label="精通" value="1"></el-option>
              <el-option label="熟练" value="2"></el-option>
              <el-option label="一般" value="3"></el-option>
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
import Vue from "vue";
import {
  addOrEditLanguageUrl,
  delLanguageUrl
} from "@/serverApi/personalCenter";
import { setTimeout } from "timers";
export default {
  props: ["languageItem", "isShow", "getUpdateDisplayProperty", "release"],
  data() {
    let languageValidate = (rule, value, callback) => {
      if (!value && !this.ruleForm.language) {
        this.languageDlog = false;
      } else if (this.ruleForm.language && !value) {
        callback(new Error("请选择等级"));
      } else {
        callback();
      }
    };
    return {
      editShow: false,
      languageDlog: false,
      showClos: false,
      languageData: {},
      deleteDialogShow: false,
      alid: "",
      onclickModal: false,
      isDisable: false,
      ruleForm: {
        language: "",
        grade: ""
      },
      rules: {
        grade: [{ validator: languageValidate, trigger: "change" }]
      }
    };
  },
  created() {},
  methods: {
    onEditShow() {
      this.editShow = true;
    },
    offEditShow() {
      this.editShow = false;
    },
    setShow(type) {
      this.getUpdateDisplayProperty("language", type);
    },
    // 新增编辑事件
    addLanguage(data) {
      this.languageData = data ? data : {};
      this.ruleForm = JSON.parse(JSON.stringify(this.languageData));
      this.languageDlog = true;
      if (data) {
        this.ruleForm = Object.assign({}, this.ruleForm, {
          grade: String(data.grade ? data.grade : "")
        });
      }
    },
    // 添加编辑提交
    submitForm(formName) {
    //   this.isDisable = true;
      let languageList = this.ruleForm;
      let parms = {
        language: languageList.language,
        grade: languageList.grade
      };
      let alid = languageList.alid || 0;
      if (alid) {
        parms = {
          language: languageList.language,
          grade: languageList.grade,
          alid: alid
        };
      }
      // 默认校验
        this.$refs[formName].validate(valid => {
            if (valid) {
            addOrEditLanguageUrl(parms).then(res => {
                if (res.code == 200) {
                    this.languageDlog = false;
                    setTimeout(() => {
                        this.isDisable = false;
                    }, 500);
                    this.$refs[formName].resetFields();
                    this.release();
                }
            });
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    //   if(languageList.language && languageList.grade) {
    //     // 默认校验
    //     this.$refs[formName].validate(valid => {
    //         if (valid) {
    //         addOrEditLanguageUrl(parms).then(res => {
    //             if (res.code == 200) {
    //             this.languageDlog = false;
    //             setTimeout(() => {
    //                 this.isDisable = false;
    //             }, 500);
    //             this.$refs[formName].resetFields();
    //             this.release();
    //             }
    //         });
    //         } else {
    //         console.log("error submit!!");
    //         return false;
    //         }
    //     });
    //   }else if(!languageList.language && !languageList.grade) {
    //       this.languageDlog = false;
    //   }else if(languageList.language && !languageList.grade) {
    //       alert('请选择等级')
    //   }
      
    },
    // 删除
    delLanguage(data) {
      this.alid = data.alid;
      this.deleteDialogShow = true;
    },
    // 取消
    cancel(formName) {
      this.languageDlog = false;
    },
    // 删除取消确认事件
    deleteCancel() {
      this.deleteDialogShow = false;
    },
    deleteSubmit() {
      let parmas = { alid: this.alid };
      delLanguageUrl(parmas).then(res => {
        if (res.code == 200) {
          this.deleteDialogShow = false;
          this.release();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.languuage-content {
  .recommend {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding-top: 20px;
    padding-bottom: 20px;
    .clearfix {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
    }
    .consultant-title {
      height: 15px;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 15px;
      border-left: 3px solid #ff6536;
      padding-left: 8px;
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
      .work-Time {
        cursor: pointer;
        margin-right: -20px;
      }
      display: flex;
      justify-content: space-between;
      .colorFF6536 {
        color: #ff6536;
      }
    }
    .languageInfo {
      margin-top: 10px;
      padding: 10px 30px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #e0e0e0;
      &:last-child {
        border-bottom: none;
      }
      .work-Time {
        display: none;
      }
      &:hover {
        background: rgba(248, 248, 248, 1);
        .work-Time {
          display: block;
        }
      }
    }
  }
  .add {
    cursor: pointer;
    margin-top: -20px;
    text-align: center;
    span {
      color: #ff895f;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
  }
  .showlog {
    cursor: pointer;
    span {
      color: #ff6536;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
    .f14 {
      font-size: 10px !important;
    }
  }
  .w200 {
    width: 200px;
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
  .pr20 {
    padding-right: 20px;
  }
  .label {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    width: 57px;
    display: inline-block;
  }
  .label-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding-left: 20px;
  }
  .el-button {
    line-height: 32px !important;
  }
  .bdf36 {
    border: 1px solid #ff6536;
    span {
      color: #ff6536;
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
      text-align: center;
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
        border: 1px solid #ff6536;
        background: #fff;
        span {
          color: #ff6536;
        }
      }
    }
    .el-dialog__body {
      padding: 0 !important;
    }
    .icon {
      padding-right: 5px;
    }
    .el-button {
      line-height: 0 !important;
    }
  }
}
</style>