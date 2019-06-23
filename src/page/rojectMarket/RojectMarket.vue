<template>
    <div class="market-content">
        <div class="market-title"> 
            <div class="img">
                <img src="../../../static/image/project.png" alt="">
            </div>
            <div class="market-title-cont-bg">
                <div class="main-cont tlf">
                    <h4>项目市场</h4>
                    <div class="bord"></div>
                    <p>MEET YOUR PROJECT</p>
                    <p class="p16">在麦盟，发现创新机遇！助推下一匹商业黑马！</p>
                </div>
            </div>
        </div>
        <div class="market-center main-cont">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" :tab-position="tabPosition">
                <el-tab-pane label="顾问寻找中" name="2" >
                   <ul>
                      <li v-for="(item,index) in MarketData" :key="index" @click="goRojectMarketDetail(item.pid)" class="porint">
                            <ProjectCell :cellItem="item"></ProjectCell>
                      </li>
                   </ul>
                </el-tab-pane>
                <el-tab-pane label="顾问已匹配" name="3">
                   <ul>
                      <li v-for="(item,index) in MarketData" :key="index" @click="goRojectMarketDetail(item.pid)" class="porint">
                          <ProjectCell :cellItem="item"></ProjectCell>
                      </li>
                   </ul>
                </el-tab-pane>
            </el-tabs>
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
        <!-- <div>
            
        </div> -->
    </div>
</template>

<script>
import Vue from 'vue';
import { Table, Tabs, TabPane,Pagination } from 'element-ui';
import { demandListUrl } from '@/serverApi/common';
import ProjectCell from '@/components/ProjectCell';
Vue.use(Table)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
export default {
    data() {
        return {
            title: '项目市场',
            activeName2: this.$route.query.type || '2',
            tabPosition:'left',          
            background:'#FF6536',
            MarketData:[],
            type: this.$route.query.type || '2',   //this.$route.query.type ||,
            currentPage: 1,//初始页
            pagesize:10,    //    每页的数据
            total:1000,
            // pageNum:0
        }
    },
    components:{
        ProjectCell
    },
    created() {
        this.getProject(this.type);
    },
    methods: {
        handleClick(tab, event) {
            this.type = tab.name;
            this.getProject(this.type);
            this.$router.push({path:'/rojectMarket',query:{type: tab.name}})
        },
        getProject(type) {
            let parmes = {type:this.type,pageNum:this.currentPage,pageSize:this.pagesize}
            demandListUrl(parmes).then(response => {
                if(response.code == 200) {
                    this.MarketData = response.data.list ? response.data.list : [];
                    this.total = response.data.total
                }
            })
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getProject();
            window.scrollTo(0,0);
        },
        // 跳转到详情
        goRojectMarketDetail(id) {
            this.$router.push({name:'rojectMarketDetail',params:{id:id,type:this.type},query:{type:this.type}})
        },
    },
    
    computed: {
        
    },
}

</script>

<style lang='scss'>
    .market-content {
        .market-title {
            width: 100%;
            height: 250px;
            position: relative;
            top: 80px;
            .img {
                position: absolute;
                z-index: 0;
                img {
                    width: 100%;
                    height: 250px;
                }
            }
            
            .market-title-cont-bg {
                position: absolute;
                right: 0;
                left: 0;
            }
            // background-image: url('../../../static/image/project.png');
            .tlf {
                text-align: left;
                // position: relative;
                // top: -196px;
                h4 {
                    color: #333333;
                    font-size:32px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    padding-top: 50px;
                    }
                .bord{
                    width: 40px;
                    height: 4px;
                    background-color: #FF6536;
                    margin-top: 12px;
                }
                p {
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color: #666666;
                    margin-top: 12px;
                    line-height: 22px;
                }
                .p16 {
                    margin-top: 20px;
                    font-size: 18px;
                    line-height: 24px;
                    color: #999999;
                }
            }
           
        }
        .market-center {
            margin-top: 80px;
        }
        .porint {
            cursor: pointer;
            &:hover {
                box-shadow:0px 5px 8px 0px rgba(0,0,0,0.2);
            }
        }
        .el-tabs__item {
            color:rgba(51,51,51,1);
            font-size:18px;
            font-family:PingFangSC-Regular;
            font-weight:400;
        }
        .el-tabs__header {
            background: #fff;
        }
        .el-tabs__item.is-active {
            color:#FF6536 ;
        }
        // .el-tabs__item:hover {
        //     // color:#333333 ;
        // }
        .el-tabs--left.el-tabs--card .el-tabs__item.is-left {
            height: 49px;
            line-height: 49px;
        }
        .el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
            border-left: 3px solid #FF6536;
            height: 49px;
        }
        .el-tab-pane {
            margin-left: 15px;
        }
        .page-cont {
            float: right;
            width: 780px;
            margin-top: 20px;
            margin-bottom: 120px;
            
        }
        .el-pagination.is-background .el-pager li {
            margin: 0 5px;
            background-color: #fff;
            color: rgba(102,102,102,0.65);
            min-width: 30px;
            border-radius: 4px;
            border: 1px solid rgba(217,217,217,1);
            font-size: 14px;
        }
    }
</style>