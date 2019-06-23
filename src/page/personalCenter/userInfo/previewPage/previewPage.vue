<template>
    <div class="preview-content">
        <el-card class="box-card">
           <div class="mt20">
               <div slot="header" class="clearfix">
                    <div class="consultant-title">基本资料</div>
                </div>
                <div class="consultant-content">
                    <div class="flex-row">
                        <div class="flex-start head-portrait-info">
                            <img :src="consultantList.avatar"/>
                            <div class="user-info">
                                <p>
                                    <label>用户名</label>
                                    <span>{{consultantList.nickName}}</span> 
                                    <span v-if="consultantList.gender == 1" class="blue"><i class="el-icon-male"></i></span>
                                    <span v-if="consultantList.gender == 2" class="origin"><i class="el-icon-woman"></i></span>
                                    <span v-if="consultantList.gender == 0"><i class="el-icon-Privacy"></i></span>
                                </p>
                                <p>
                                    <label>工作年龄</label>
                                    <span>{{consultantList.years}}年</span>
                                </p>
                                <p>
                                    <label>账户状态</label>
                                    <span v-if= "consultantList.status == 4">已审核</span>
                                    <span v-if= "consultantList.status == 0">未审核</span>
                                    <span v-if= "consultantList.status == 5">面试通过</span>
                                    <span v-if= "consultantList.status == 6">项目通过</span>
                                </p>
                            </div>
                        </div>
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
                    </div>
                </div>
            <!-- 工作经历 -->
            <div class="workList bt0" v-if="displayList.workExp && displayList.workExp == 1">
                <div class="clearfix ">
                    <div class="consultant-title">工作经历</div>
                </div>
                <div class="work-decription"   v-for="(item,index) in consultantList.workList" :key="index" >
                    <div class="show-botton  mt20">
                        <div class="person-Name">
                            <label class="label">公司名称</label>
                            <span class="label-text">{{item.companyName}}</span>
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
                        <span class="label-text " v-html="item.workDescription"></span>
                    </div>
                </div> 
            </div>
            <!-- 项目经历 -->
            <div class="projectItem mt20 bt0"  v-if="displayList.projectExp && displayList.projectExp==1">
                <div class="clearfix">
                    <div class="consultant-title">项目经历</div>
                </div>
                <div class="projectInfo" v-for="(item,index) in consultantList.projectList" :key="index">
                    <div class="showEditor mt20">
                        <div class="person-Name">
                            <label class="label">项目名称</label>
                            <span class="label-text">{{item.projectName}}</span>
                        </div>
                    </div>
                    <div class="mt20">
                        <label class="label">公司名称</label>
                        <span class="label-text">{{item.companyName}}</span>
                    </div>
                    <div class="mt20">
                        <label class="label">起止日期</label>
                        <span class="label-text">{{item.startTime | moment}}</span>
                        <span> - </span>
                        <span class="label-text pl0">{{item.endTime | moment}}</span>
                    </div>
                    <div class="mt20">
                        <label class="label">担任职位</label>
                        <span class="label-text">{{item.role}}</span>
                    </div>
                    <div class="mt20 labelName">
                        <label class="label">项目描述</label>
                        <span class="label-text " v-html="item.projectDetails"></span>
                    </div>
                    <div class="mt20 labelName">
                        <label class="label">职责描述</label>
                        <span class="label-text " v-html="item.responsibility"> </span>
                    </div>
                </div> 
            </div>
            <!-- 教育经历 -->
             <div class="educationItem bt0" v-if="displayList.educationalExp && displayList.educationalExp==1">
                <div class="clearfix">
                    <div class="consultant-title">教育经历</div>
                </div>
                <div class="educationInfo" v-for="(item,index) in consultantList.educationalList" :key="index" >
                    <div class="showEditor mt20">
                    <div>
                            <label class="label">学校</label>
                            <span class="label-text">{{item.schoolName}}</span>
                        </div>
                    </div>
                    <div class="mt20">
                        <label class="label">起止日期</label>
                        <span class="label-text">{{item.startTime | moment}}</span>
                        <span> - </span>
                        <span class="label-text pl0">{{item.endTime | moment}}</span>
                    </div>
                    <div class="mt20">
                        <label class="label">专业名称</label>
                        <span class="label-text">{{item.profession}}</span>
                    </div>
                    <div class="mt20">
                        <label class="label">学历</label>
                        <span class="label-text" v-if="item.degree == 0">博士</span>
                        <span class="label-text" v-if="item.degree == 1">硕士</span>
                        <span class="label-text" v-if="item.degree == 2">本科</span>
                    </div>
                </div>
            </div>
            <!-- 擅长语言 -->
            <div class="languageItem bt0" v-if="displayList.language && displayList.language==1">
                <div class="clearfix">
                    <div class="consultant-title">擅长语言</div>
                </div>
                <div class="languageInfo mt20 " v-for="(item,index) in consultantList.languageList" :key="index">
                    <div class="showEditor">
                        <div>
                            <span class="label">{{item.language}}</span>
                            <span class="label-text" v-if="item.grade == 0">母语</span>
                            <span class="label-text" v-if="item.grade == 1">精通</span>
                            <span class="label-text" v-if="item.grade == 2">熟练</span>
                            <span class="label-text" v-if="item.grade == 3">一般</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 专业认证 -->
             <div class="profesionalItem bt0" v-if="displayList.certification && displayList.certification==1">
                <div class="clearfix">
                    <div class="consultant-title">专业认证</div>
                </div>
                <div class="professionInfo" v-for="(item,index) in consultantList.certificationList" :key="index">
                    <div class="showEdtor mt20">
                        <div>
                            <label class="label">认证名称</label>
                            <span class="label-text">{{item.certifiedTitle}}</span>
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
       </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import {  Card, Button, Icon,} from 'element-ui';
import { getAdviserInfolUrl, getAdviserDetailUrl } from '@/serverApi/personalCenter';

Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);

export default {
    data(){
        return{
            consultantList:{},
            displayList:{}
        }
    },
    computed:{},
    methods: {
        // 个人基本信息数据请求
        getConsultantData() {
            getAdviserDetailUrl().then(response => {
                if(response.code == 200) {
                    this.consultantList = response.data
                    this.displayList = this.consultantList.display;
                }
            })
        },
    },
    created() {
        this.getConsultantData();
    }
}
</script>

<style lang="scss">
    .preview-content {
        .box-card {
            text-align: left;
            // margin-bottom: 90px;
            padding-bottom: 40px;
            .clearfix {
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
                .preview {
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(255,101,54,1);
                    line-height:20px;
                }
            }
            .consultant-content {
                margin-top: 20px;
                padding: 0 30px;
                border-bottom: 1px solid #d9d9d9;
                padding-bottom: 20px;
                .flex-start {
                    display:flex;
                }
                .head-portrait-info {
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin-right: 30px;
                    }
                    .user-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        p {
                            margin-top: 10px;
                        }
                        label {
                            width: 57px;
                            display: inline-block;
                            margin-right: 20px;
                            font-size: 14px;
                            color: #404040;
                        }
                        span {
                            color: #919191;
                            font-size:14px;
                        }
                        .blue {
                            color: #597EF7;
                        }
                        .origin {
                            color: #FF6536;
                        }
                    }
                }
                // .NameTime {
                //     display: flex;
                //     .edit {
                //         margin-left: 190px;
                //     }
                //     .colorFF6536 {
                //         color: #FF6536;
                //     }
                //     .ml27 {
                //         display: inline-block;
                //         margin-left: 27px;
                //     }
                // }
                // .work-Time {
                //     margin-left: 60px;
                //     margin-right: -70px;
                // }
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
                padding-left: 5px;
            }
            .labelName {
                display: flex;
                flex: 1;
            }
            .label {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                width: 57px;
                // display: inline-block;
            }
            .label-text {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(102,102,102,1);
                padding-left: 20px;
                // display: inline-flex;
                flex: 1;
                line-height: 20px;
            }
            .w70 {
                width: 70px;
            }
            .pl20 {
                padding-left: 20px
            }
            .pl0 {
                padding-left: 0 !important;
            }
            .pr20 {
                padding-right: 20px;
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
            .line2 {
                display: -webkit-box;
                max-height: 36px;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-left: 58px;
                margin-top: -17px;
                line-height: 20px;
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
             .account {
                padding:0 30px;
                // border-top: 1px solid #E0E0E0;
                border-bottom: 1px solid #E0E0E0;
                padding-top: 20px;  
                padding-bottom: 20px;
                .consultant-title {
                    height:15px;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                    line-height:15px;
                    border-left: 3px solid #FF6536;
                    padding-left: 5px;
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
                
                .accountEditor {
                    display: flex;
                    justify-content: space-between;
                    .colorFF6536 {
                        color: #FF6536;
                    }
                }
                .accountInfo {
                    padding-bottom: 20px;
                    border-bottom: 1px dashed #E0E0E0;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
            .workList {
                padding-top: 20px;
                padding-bottom: 0 !important;
                .clearfix {
                    padding: 0 30px;
                    display: flex;
                    justify-content: space-between;
                }
                .work-decription {
                    padding: 0 30px;
                    border-bottom: 1px dashed #E0E0E0;
                    &:last-child {
                        border-bottom: none;
                    }
                    .show-botton {
                        display: flex;
                        justify-content: space-between;
                        .colorFF6536 {
                            color: #FF6536;
                        }
                        .work-Time {
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
                    padding-left: 5px;
                }
                .showlog {
                    span {
                        color: #FF6536;
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                    }
                    .f14 {
                        font-size: 10px !important;
                    }
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
            }
            .projectItem {
                border-top: 1px solid #E0E0E0;
                // border-bottom: 1px solid #E0E0E0;
                padding-top: 20px;
                padding-bottom: 20px;
                .clearfix {
                    padding: 0 30px;;
                }
                .consultant-title {
                    height:15px;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                    line-height:15px;
                    border-left: 3px solid #FF6536;
                    padding-left: 5px;
                }
                .showlog {
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
                    display: -webkit-box;
                    max-height: 36px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-left: 58px;
                    margin-top: -17px;
                    line-height: 20px;
                }
                
                .showEditor {
                    display: flex;
                    justify-content: space-between;
                    .colorFF6536 {
                        color: #FF6536;
                    }
                }
                .projectInfo {
                    // margin-bottom: 30px;
                    padding: 0 30px;
                    border-bottom: 1px dashed #E0E0E0;
                    padding-bottom: 20px;
                    &:last-child {
                        border-bottom: none;
                    }
                    .projectEdit {
                        margin-left: 30px;
                    }
                }
            }
            .educationItem {
                border-top: 1px solid #E0E0E0;
                // border-bottom: 1px solid #E0E0E0;
                padding-top: 20px;
                padding-bottom: 20px;
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
                    padding-left: 5px;
                }
                .showlog {
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
                    display: flex;
                    justify-content: space-between;
                    .colorFF6536 {
                        color: #FF6536;
                    }
                }
                .educationInfo {
                    padding: 0 30px;
                    border-bottom: 1px dashed #E0E0E0;
                    padding-bottom: 20px;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
            .languageItem {
                border-top: 1px solid #E0E0E0;
                padding-top: 20px;
                padding-bottom: 20px;
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
                    padding-left: 5px;
                }
                .showlog {
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
                    display: -webkit-box;
                    height: 36px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-left: 58px;
                    margin-top: -17px;
                    line-height: 20px;
                }
                .languageInfo {
                    padding: 0 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px dashed #E0E0E0;
                    &:last-child {
                        border-bottom:none;
                    }
                }
            }
            .profesionalItem {
                border-top: 1px solid #E0E0E0;
                // border-bottom: 1px solid #E0E0E0;
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
                    padding-left: 5px;
                }
                .showlog {
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
                .professionInfo {
                    padding: 0 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px dashed #E0E0E0;
                    &:last-child {
                        border-bottom: none;
                    }
                }
                .prompt {
                    height: 20px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #999999;
                    line-height: 20px;
                }
                .file {
                    width: 191px;
                    height: 122px;
                    border: 1px solid #979797;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
