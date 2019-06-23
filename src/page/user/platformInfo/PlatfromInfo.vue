<template>
    <div class="containner-cont">
        <h3 class="content-title">平台信息</h3>
        <TableCont :tableData="tableData" :columns="columns" :totalPage="tableData.length" @currentChange="currentChange" :stripe="stripe"></TableCont>
    </div>
</template>

<script>
import Vue from 'vue'
import TableCont from "@/components/TableCont"
import { Button } from 'element-ui'
Vue.use(Button)

export default {
    name: 'userinfo',
    components: {
        TableCont
    },
    data() {
        return {
            title: '平台信息',
            totalPage: 20,
            stripe: true,
            tableData: [
                {
                    username: 'admin',
                    phone: '15813211122',
                    email: '111@qq.com',
                    sex: 1,
                    joinDate: '2018-07-02',
                    status: 1
                },
                {
                    username: 'huanghb',
                    phone: '15813232122',
                    email: '222@qq.com',
                    sex: 2,
                    joinDate: '2018-06-02',
                    status: 1
                },
                {
                    username: 'ahadna',
                    phone: '15213211122',
                    email: '555@qq.com',
                    sex: 1,
                    joinDate: '2018-09-02',
                    status: 1
                },
                {
                    username: 'zhoulao',
                    phone: '15113211122',
                    email: '666@qq.com',
                    sex: 2,
                    joinDate: '2018-11-02',
                    status: 1
                },
                {
                    username: 'wangx',
                    phone: '15313211122',
                    email: '777@qq.com',
                    sex: 2,
                    joinDate: '2019-01-02',
                    status: 1
                },
                {
                    username: 'longda',
                    phone: '15813211122',
                    email: '888@qq.com',
                    sex: 1,
                    joinDate: '2019-01-01',
                    status: 1
                },
            ],
            columns: [
                { 
                    prop: "username", 
                    label: "用户名", 
                    isMany: true,
                    sortable: false
                }, 
                { 
                    prop: "phone", 
                    label: "手机",
                    isMany: true,
                    sortable: false
                },
                { 
                    prop: "email", 
                    label: "邮箱",
                    isMany: true,
                    sortable: false
                },
                { 
                    prop: "sex", 
                    label: "性别",
                    isMany: true,
                    sortable: false,
                    render: function(h, param) {
                        let html = "";
                        if (param.row.sex == 1) {
                            html = "男";
                        } else {
                            html = "女";
                        }
                        return html;
                    }
                },
                { 
                    prop: "joinDate", 
                    label: "加入时间",
                    isMany: true,
                    sortable: false 
                },
               
                {
                    prop: "",
                    label: "操作",
                    isMany: true,
                    render: (h, param) => {
                        return (
                            <div>
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
                            </div>
                        )
                    }
                }
            ]
        }
    },
    created() {
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        currentChange(val) {
        },
        update() {

        },
        del() {

        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.containner-cont {
    margin: 20px;
    padding: 15px;
    background-color: #fff;
    .content-title {
        line-height: 30px;
        text-align: left;
    }
}
</style>