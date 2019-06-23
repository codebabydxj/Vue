<template>
    <div class="containner-cont">
        <h3 class="content-title">用户管理</h3>
        <!-- 列表表格组件，可根据需求传入不同的值 -->
        <TableCont :tableData="tableData" 
                :columns="columns" 
                :totalPage="tableData.length" 
                @currentChange="currentChange" 
                :stripe="stripe">
            </TableCont>
    </div>
</template>

<script>
import Vue from 'vue'
import TableCont from "@/components/TableCont"
import MyDropDown from './MyDropDown'
import { getUserInfoList } from '@/serverApi/common'

export default {
    name: 'userinfo',
    components: {
        TableCont
    },
    data() {
        return {
            title: '用户管理',
            totalPage: 20,
            stripe: true,
            pageSize: 10,
            pageNum: 1,
            tableData: [   // 到时改成动态获取数据
                {
                    uuid: 'uid1111',
                    username: 'admin',
                    phone: '15813211122',
                    email: '111@qq.com',
                    role: '超级管理员',
                    joinDate: '2018-07-02',
                    status: 1
                },
                {
                    uuid: 'uid2222',
                    username: 'huanghb',
                    phone: '15813232122',
                    email: '222@qq.com',
                    role: '普通成员',
                    joinDate: '2018-06-02',
                    status: 1
                },
                {
                    uuid: 'uid43333',
                    username: 'ahadna',
                    phone: '15213211122',
                    email: '555@qq.com',
                    role: '管理员',
                    joinDate: '2018-09-02',
                    status: 1
                },
                {
                    uuid: 'uid555555',
                    username: 'zhoulao',
                    phone: '15113211122',
                    email: '666@qq.com',
                    role: '管理员',
                    joinDate: '2018-11-02',
                    status: 1
                },
                {
                    uuid: 'uid666666',
                    username: 'wangx',
                    phone: '15313211122',
                    email: '777@qq.com',
                    role: '普通成员',
                    joinDate: '2019-01-02',
                    status: 1
                },
                {
                    uuid: 'uid777777',
                    username: 'longda',
                    phone: '15813211122',
                    email: '888@qq.com',
                    role: '管理员',
                    joinDate: '2019-01-01',
                    status: 1
                },
            ],
            columns: [
                { 
                    prop: "username", 
                    label: "登录名", 
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
                    prop: "role", 
                    label: "角色",
                    isMany: true,
                    sortable: false
                },
                { 
                    prop: "joinDate", 
                    label: "加入时间",
                    isMany: true,
                    sortable: false 
                },
                {
                    prop: "status",
                    label: "审核状态",
                    isMany: true,
                    render: function(h, param) {
                        let html = "";
                        if (param.row.isoriginal == 1) {
                            html = "已审核";
                        } else {
                            html = "未审核";
                        }
                        return html;
                    }
                },
                {
                    prop: "",
                    label: "操作",
                    isMany: true,
                    render: (h, param) => {
                        const dropDownData = {
                            label: "操作",
                            items: [
                                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
                            ]
                        };
                        return h(MyDropDown, {
                            props: { dropDownData: dropDownData },
                            on: { update: this.update, del: this.del }
                        });
                    }
                }
            ]
        }
    },
    created() {
        this.getUserList();
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        // 列表数据请求
        getUserList() {
            // 传入的参数要根据业务动态获取
            let data = {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
            }
            getUserInfoList(data).then(response => {
                // 请求成功处理
                // this.tableData = response.data;
            }).catch(err => {
                console.error('请求出错:'+ err)
            })
        },
        currentChange(val) {
            // console.log(val,'---')
        },
        // 修改操作
        update(val) {
            alert('修改操作:'+val)
        },
        // 删除操作
        del(val) {
            alert('删除操作:'+val)
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