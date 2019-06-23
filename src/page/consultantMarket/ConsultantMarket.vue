<template>
    <div class="consultant-market-content">
        <div class="market-title">
            <div class="main-cont tlf">
                <h4>顾问市场</h4>
                <div class="bord"></div>
                <p>CONSULTANT market</p>
                <p class="p16">洞察商业未来，成就客户价值！</p>
            </div>
        </div>
        <div class="consultant-market-center main-cont">
            <div class="search-box">
                <div class="input-search">
                    <el-input placeholder="请输入行业/技能搜索顾问" v-model="inputVaue" class="input-with-select">
                        <el-button slot="append" type="primary" @click="contentSearch">搜 索</el-button>
                    </el-input>
                </div>
                <div class="select-search mt10">
                    <el-select @change="industrySearchOnchange" placeholder="选择行业" v-model="value" :clearable="true">
                        <!-- <el-option>全部行业</el-option> -->
                        <el-option
                            v-for="item in industryList"
                            :key="item.ilid"
                            :label="item.industryName"
                            :value="item.ilid">
                        </el-option>
                    </el-select>
                    <el-cascader
                        placeholder="选择专业技能"
                        :options="skillData"
                        :show-all-levels="false"
                        @change="skillOnchange"
                        @active-item-change="handleItemChange"
                        :props="props"
                        :clearable="true"
                    ></el-cascader>
                </div>
            </div>
            <div class="search-content">
                <div class="no-search-content" v-if="isContent == false">
                    <img src="static/image/no-content.png"/>
                    <h5>未找到您寻找的顾问</h5>
                    <p class="mt12">您可以直接联系我们提出您的需求</p>
                    <p class="mt6">0755-86959936</p>
                </div>
                <router-link v-for="(item,key) in consultantListData" :key="key" :to="{path:'/consultantMarket/consultantMarketDetails/'+item.uid}">
                    <ConsultantList class="search-consultant-list" :item="item"/>
                </router-link>
                <el-pagination class="page-cont" layout=" prev, pager, next"
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :total="this.total"
                                :page-size="pagesize"
                                :current-page="currentPage"
                                style="text-align:center;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Select, Option, Cascader,Pagination } from 'element-ui'
import { demandListUrl } from '@/serverApi/common';
import ConsultantList from './common/ConsultantList'
import { getIndustryListUrl, getSkillUrl, getSkillSecondaryUrl } from '@/serverApi/personalCenter';
import { searchAdviserList } from '@/serverApi/common';
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Pagination)

export default {
    components: {
        ConsultantList
    },
    data() {
        return {
            title: '顾问市场',
            consultantListData: [],
            IndustrySkillsScreenData:[],
            // industryId: '',
            // firstSkillId: '',
            // secondSkillId: '',
            // search: '',
            // pageNum: '',
            // pageSize: '',
            background:'#FF6536',
            currentPage: 1,//初始页
            pagesize:10,    //    每页的数据
            total:1000,
            props: {
                value: 'value',
                children: 'children'
            },
            inputVaue: '',
            value: '',
            skillData: [{
                value: '',
                label: '',
                children: []
            }],
            industryList:[],
            searchParams: {
                industryId: 0, //行业id
                firstSkillId: 0, //技能一级id
                secondSkillId: 0, //技能二级id
                search: '', //关键字内容
                pageNum: 0, //页码
                pageSize: 99 //条数
            },
            isContent: null
        }
    },
    created() {
        this.getIndustryData()
        this.getSkillData()
        this.getConsultantListData()
        this.consultantListData = [{},{},{},{},{}];
    },
    methods: {
        // 获取顾问列表
        getConsultantListData() {
            let pageNum = this.currentPage;
            let pageSize = this.pagesize;
            let params= {industryId:this.searchParams.industryId,firstSkillId:this.searchParams.firstSkillId,
            secondSkillId:this.searchParams.secondSkillId,search:this.searchParams.search,pageNum:pageNum,pageSize:pageSize}
            searchAdviserList(params).then(response => {
                // console.log(response,'顾问列表')
                if(response.code == 200){
                    this.consultantListData = response.data ? response.data.list:[]
                    this.total = response.data.total
                    this.isContent = this.consultantListData && this.consultantListData.length>0?true:false
                    // console.log(this.consultantListData,response.data,'this.consultantListDatathis.consultantListData')
                }
            })
        },
        // 专业技能请求
        getSkillData(sfid, search) {
            let params = {type: 1}
            params = sfid ? Object.assign({sfid: sfid},params) : params
            params = search ? Object.assign({search: search},params) : params 
            getSkillUrl(params).then(response => {
                if(response.code == 200){
                    this.skillData = this.setSkillData(response.data.list);
                    //  console.log(this.skillData,'获取一级技能列表并赋值')
                }
            })
        },
        // 获取行业标签
        getIndustryData() {
            getIndustryListUrl().then(res => {
                if(res.code == 200) {
                    this.industryList = res.data;
                    // console.log(this.industryList,'获取行业标签')
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
        // 输入关键字搜索
        contentSearch() {
            this.searchParams.search = this.inputVaue || ''
            this.getConsultantListData()
        },
        // 选择技能搜索
        skillOnchange(value) {
            // console.log(value,'技能搜索')
            this.searchParams.firstSkillId = value && value.length>0 ? value[0] : 0
            this.searchParams.secondSkillId = value && value.length>0 ? value[1] : 0
            this.getConsultantListData()
        },
        // 选择行业搜索
        industrySearchOnchange(value) {
            // console.log(value,'行业搜索')
            this.searchParams.industryId = value || 0
            this.getConsultantListData()
        },
        // 根据一级值获取二级列表
        handleItemChange(val) {
            let params,skillDataChildren;
            if(!val && val.length<1) return
            params = {sfid: val[0]}
            skillDataChildren = this.skillData.find(d=>d.value==val[0]).children
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
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
            this.pagesize = size;
            // console.log(this.pagesize,'this.pagesize')  //每页下拉显示数据
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            // this.getProject()
            this.getConsultantListData();
            window.scrollTo(0,0);
            // console.log(this.currentPage,'this.currentPage')  //点击第几页
        },
        
    },
    computed: {
        
    }
}
</script>

<style lang='scss'>
.consultant-market-content {
    .market-title {
        width: 100%;
        height: 250px;
        background-image: url('../../../static/image/market.png');
        margin-top: 80px;
        .main-cont {
            max-width: 960px;
        }
        .tlf {
            text-align: left;
            h4 {
                color: #333333;
                font-size: 32px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                padding-top: 50px;
                line-height: 50px;
            }
            .bord{
                width: 40px;
                height: 4px;
                margin-top: 4px;
                background-color: #FF6536;
            }
            p {
                font-size: 16px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #666666;
                margin-top: 12px;
                line-height: 22px;
            }
            .p16 {
                margin-top: 20px;
                font-size: 18px;
                line-height: 24px;
            }
        }
    }
    .consultant-market-center {
        .search-box {
            width: 550px;
            margin: 40px auto;
            .input-search {
                .el-input-group {
                    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
                    border-radius:4px;
                }
                .el-input-group__append, .el-input-group__prepend {
                    background: #FF6536;
                    border-color: #FF6536;
                }
                .el-button {
                    span {
                        font-size: 16px;
                    }
                }
            }
            .select-search {
                display: flex;
                justify-content: space-between;
                .el-cascader, .el-select {
                    flex: 1;
                    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
                    border-radius:4px;
                }
                .el-cascader {
                    margin-left: 10px;
                }
            }
        }
        .search-content {
            margin-bottom: 120px;
        }
        .no-search-content {
            width: 550px;
            height: 400px;
            background: rgba(255,255,255,1);
            margin: 0 auto;
            margin-bottom: 260px;
            img {
                margin-top: 56px;
            }
            h5 {
                font-size: 16px;
                line-height: 22px;
                margin-top: 50px;
            }
            p {
                font-size: 14px;
                line-height: 20px;
                color: #666666;
                &.mt12 {
                    margin-top: 12px;
                }
                &.mt6 {
                    margin-top: 6px;
                }
            }
        }
        // .el-pagination.is-background .el-pager li {
        //     margin: 0 5px;
        //     background-color: #fff;
        //     color: rgba(102,102,102,0.65);
        //     min-width: 30px;
        //     border-radius: 4px;
        //     border: 1px solid rgba(217,217,217,1);
        //     font-size: 14px;
        // }
        .el-pagination.is-background .el-pager li {
            margin: 0 5px;
            background-color: #fff;
            color: rgba(102,102,102,0.65);
            font-size: 14px;
            min-width: 30px;
            border-radius: 2px;
            border: 1px solid rgba(217,217,217,1);
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #FF6536 !important;
            color: #fff;
        }
    }
}
</style>