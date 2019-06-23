<template>
    <el-row>
        <el-row>
            <el-table
                :data="tableData"
                border
                :stripe="stripe"
                style="width: 100%;text-align:center"
                :header-cell-style="headerStyle">
                <el-table-column
                    v-for="(column, index) in columns"
                    :prop="column.prop"
                    :key="index"
                    :sortable="column.sortable"
                    :align="column.align"
                    :width="column.width"
                    :formatter="column.formatter"
                    :label="column.label">
                    <template slot-scope="scope">
                        <ColumnRender v-if="column.render" :row="scope.row" :render="column.render"></ColumnRender>
                        <span v-else>
                            {{scope.row[column.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <div class="pagination">
                <el-pagination
                    :current-page="pageNum"
                    :page-size="pageSize"
                    @current-change="currentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
                </el-pagination>
            </div>
        </el-row>
    </el-row>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Row, Table, TableColumn, Pagination, Message } from 'element-ui'
import ColumnRender from "./ColumnRender"
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.prototype.$message = Message;

export default {
    name: 'tables',
    components: {
        ColumnRender
    },
    props: {
        stripe: Boolean,
        tableData: Array,
        columns: Array,
        pageNum: { type: Number, default: 1 },
        pageSize: { type: Number, default: 10 },
        totalPage: { type: Number, default:0}
    },
    data() {
        return {
            title: '课程管理',
        }
    },
    created() {
        this.columns = this.columns.filter(f=>f.isMany)
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        headerStyle() {
            return { "text-align": "left" };
        },
        currentChange(val){
            this.$emit('currentChange',val)
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.pagination {
    margin-top: 15px;
    text-align: right;
}
.main-content {
    margin: 20px;
    background-color: #fff;
}
</style>