<template>
    <div class="comfirmdialog"  v-show="dialogVisible">
        <el-dialog width="400px" :visible.sync="dialogVisible" v-if="confirmModalOptions.type== 1" :close-on-click-modal="false">
            <div class="closeModel" @click="closeModel"></div>
            <div class="comfirm-title">{{confirmModalOptions.title || "提示"}}</div>
            <span class="mt40">{{confirmModalOptions.message || " "}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmCancel" class="bdf36">{{confirmModalOptions.btnCancelText || "取消"}}</el-button>
                <el-button type="primary" @click="confirmSubmit" class="bgf36">{{confirmModalOptions.btnSubmitText || "确定"}}</el-button>
            </span>
        </el-dialog>  
        <el-dialog width="400px" :visible.sync="dialogVisible" v-if="confirmModalOptions.type== 2" >
            <div class="comfirm-title">{{confirmModalOptions.title || "提示"}}</div>
            <span class="mt40">{{confirmModalOptions.message || " "}}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="confirmCancel" class="bdf36">{{confirmModalOptions.btnCancelText || "取消"}}</el-button> -->
                <el-button type="primary" @click="confirmSubmit" class="bgf36">{{confirmModalOptions.btnSubmitText || "确定"}}</el-button>
            </span>
        </el-dialog>
    
    </div> 
</template>

<script>
export default {
    props: ["confirmModalOptions"],//传给父组件的值
    data() {
        return {
            // show:false, // 是否显示模态框
            dialogVisible: false
        }
    },
    // components:{Comfirm},
    methods:{
        closeModel:function () {
            this.dialogVisible = false;
        },
        showModel: function () {
            this.dialogVisible = true;
        },
        confirmCancel() {
            this.dialogVisible = false;
            if(typeof (this.confirmModalOptions.btnCancelFunction)==='function'){
                this.confirmModalOptions.btnCancelFunction()
            }
        },
        confirmSubmit() {
            this.dialogVisible = false
            if(typeof (this.confirmModalOptions.btnSubmitFunction)==='function'){
                this.confirmModalOptions.btnSubmitFunction()
            }
        }
       
    }
}
</script>

<style lang="scss" >
    .comfirmdialog {
        margin-top: 100px;
        display: block;
        .comfirm-title {
            text-align: center;
            font-size: 20px;
            font-style: PingFangSC;
            font-weight: Medium;
            color: #333333; 
            // margin-top: -40px;
        }
        .mt40 {
            // margin: 20px 40px;
            margin-left: 40px;
            margin-right: 40px;
            margin-top: 20px;
            display: block;
            text-align: left;
            color: #666666;
            font-weight: Regular;
            font-style: PingFangSC;   
            font-size: 16px;   
            line-height: 20px; 
        }
        .bdf36 {
            width: 100px;
            height: 20px;
            border: 1px solid #FF6536;
            color: #FF6536;
            
        }
        .bgf36 {
            width: 100px;
            height: 20px;
            background-color: #FF6536;
            border: 1px solid #FF6536;
            // line-height: 32px;
        }
        .el-dialog__footer {
            text-align: center !important;
            padding-bottom: 30px;
            // margin-top: -20px;
            margin-top: 10px;
            .el-button {
                margin: 0 25px;
                span {
                    display: block;
                    margin-top: -7px;
                }
            }  
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #333333;
        }
        .dialog-footer {
            margin-top: 20px;
            margin-left: 0;
        }
    }
</style>
