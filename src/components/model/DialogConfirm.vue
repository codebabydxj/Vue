<template>
    <!--model弹出框-->
    <el-dialog
        class="dialog-model"
        :visible.sync="centerDialogVisible"
        width="400px"
        :close-on-click-modal="onclickModal"
        center>
        <h4 slot="title" class="dialog-title">{{dialogModel.title}}</h4>
        <span class="dialog-cont">{{dialogModel.content}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false" class="border mr60" v-if="dialogModel.type == 'confirm'">{{dialogModel.cancelText || '取消'}}</el-button>
            <el-button type="primary" @click="onBtnSubmit" class="solid">{{dialogModel.okText || '确定'}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: {
        centerDialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            onclickModal:false,
            dialogModel: {
                title: '',
                content: '',
                type: '',  //提示框：prompt，确认框：confirm
                okText: '',
                cancelText: ''
            }
        }
    },
    methods: {
        // 确定请求事件
        onBtnSubmit() {

        }
    }
}
</script>
<style>

</style>

