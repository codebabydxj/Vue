<template>
    <div class="cont-box-card project-detail-cont">
        <div class="detail-cont-box border-b-1">
            <BasicInfo :detailsData="detailsData" :applicationData="applicationData"/>
        </div>
        <div class="detail-cont-box border-b-1" v-if="detailsData.display && detailsData.display.workExp == 1">
            <div class="flex-row">
                <DTitle :name="'工作经历'" :fontSize="18"/> 
            </div>
            <template v-if="detailsData.workList && detailsData.workList.length>0">
                <div class="border-bottom-dashed" v-for="(workItem,key) in detailsData.workList" :key="key">
                    <div class="flex-start mt20">
                        <p>
                            <label>公司名称</label>
                            <span>{{workItem.companyName}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>起止日期</label>
                            <span>{{workItem.startTime | moment}} - {{workItem.endTime | moment}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>所在部门</label>
                            <span>{{workItem.department}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>担任职位</label>
                            <span>{{workItem.role}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <label>职责描述</label>
                        <p class="flex-1" v-html="workItem.workDescription"></p>
                    </div>
                     
                </div>
                
            </template>
            
        </div>
        <div class="detail-cont-box border-b-1" v-if="detailsData.display && detailsData.display.projectExp == 1">
            <div class="flex-row">
                <DTitle :name="'项目经验'" :fontSize="18"/>
            </div>
            <template v-if="detailsData.projectList && detailsData.projectList.length>0">
                <div class="border-bottom-dashed" v-for="(projectItem,key) in detailsData.projectList" :key="key">
                    <div class="flex-start mt20">
                        <p>
                            <label>项目名称</label>
                            <span>{{projectItem.projectName}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>公司名称</label>
                            <span>{{projectItem.companyName}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>起止日期</label>
                            <span>{{projectItem.startTime | moment}} - {{projectItem.endTime | moment}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>担任职位</label>
                            <span>{{projectItem.role}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <label>项目描述</label>
                        <p class="flex-1" v-html="projectItem.projectDetails"></p>
                    </div>
                    <div class="flex-start mt20">
                        <label>职责描述</label>
                        <p class="flex-1" v-html="projectItem.responsibility"></p>
                    </div>
                </div>
            </template>
        </div>
        <div class="detail-cont-box border-b-1" v-if="detailsData.display && detailsData.display.educationalExp == 1">
            <div class="flex-row">
                <DTitle :name="'教育经历'" :fontSize="18"/>
            </div>
            <template v-if="detailsData.educationalList && detailsData.educationalList.length>0">
                <div class="border-bottom-dashed" v-for="(educationalItem,key) in detailsData.educationalList" :key="key">
                    <div class="flex-start mt20">
                        <p>
                            <label>学校</label>
                            <span>{{educationalItem.schoolName}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>起止日期</label>
                            <span>{{educationalItem.startTime | moment}} - {{educationalItem.endTime | moment}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>专业名称</label>
                            <span>{{educationalItem.profession}}</span>
                        </p>
                    </div>
                    <div class="flex-start mt20">
                        <p>
                            <label>学历</label>
                            <span v-if="educationalItem.degree == 0">博士</span>
                            <span v-if="educationalItem.degree == 1">硕士</span>
                            <span v-if="educationalItem.degree == 2">本科</span>
                        </p>
                    </div>
                </div>
            </template>
        </div>
        <div class="detail-cont-box border-b-1" v-if="detailsData.display && detailsData.display.language == 1">
            <div class="flex-row">
                <DTitle :name="'擅长语言'" :fontSize="18"/>
            </div>
            <template v-if="detailsData.languageList && detailsData.languageList.length>0">
                <div class="border-bottom-dashed" v-for="(languageItem,key) in detailsData.languageList" :key="key">
                    <div class="flex-start mt20">
                        <label>{{languageItem.language}}</label>
                        <span v-if="languageItem.grade == 0">母语</span>
                        <span v-if="languageItem.grade == 1">精通</span>
                        <span v-if="languageItem.grade == 2">熟练</span>
                        <span v-if="languageItem.grade == 3">一般</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="detail-cont-box" v-if="detailsData.display && detailsData.display.certification == 1">
            <div class="flex-row">
                <DTitle :name="'专业认证'" :fontSize="18"/>
            </div>
            <template v-if="detailsData.certificationList && detailsData.certificationList.length>0">
                <div class="border-bottom-dashed" v-for="(certificationItem,key) in detailsData.certificationList" :key="key">
                    <div class="flex-start mt20">
                        <label>认证名称</label>
                        <span>{{certificationItem.certifiedTitle}}</span>
                    </div>
                    <div class="flex-start mt20">
                        <label>颁发机构</label>
                        <span>{{certificationItem.issuingAgency}}</span>
                    </div>
                    <div class="flex-start mt20">
                        <label>颁发时间</label>
                        <span>{{certificationItem.issuedTime | moment}}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import '@/styles/element-variables.scss'
import DTitle from '@/components/DTitle'
import BasicInfo from './common/BasicInfo'
import { Button } from 'element-ui'
Vue.use(Button)

export default {
    props: {
        detailsData: {
            type: Object,
            default: {}
        },
        applicationData: {
            type: Object,
            default: {}
        }
    },
    components: {
        DTitle,
        BasicInfo
    },
    data() {
        return {
            title: '项目详情'
        }
    },
    created() {
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.project-detail-cont {
    .border-b-1 {
        border-bottom: 1px solid #E0E0E0;
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
    .detail-cont-box {
        padding: 20px 30px;
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
        &:last-child {
            border-bottom: none;
        }
    }
    
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
        .flex-1 {
            padding-left: 3px;
        }
    }
    .tags {
        span {
            color: #FFA75F;
            padding: 0 15px;
            border-right: 1px solid #E0E0E0;
            &:first-child {
                padding-left: 0;
            }
            &:last-child {
                border-right: none;
            }
        }
        &.skills {
            span{
                color: #FF895F;
            }
        }

    }
    .border-bottom-dashed {
        padding-bottom: 20px;
        border-bottom: 1px dashed #ebebeb;
        &:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }
    }
}

</style>