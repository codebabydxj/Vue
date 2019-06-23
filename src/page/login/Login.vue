<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <div class="login-container-title">
                <h3>用户管理系统登录</h3>
            </div>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" placeholder="用户名">
                    <template slot="prefix"><i class="el-icon-goods"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" placeholder="密码" @keyup.enter.native="submitForm('ruleForm2')">
                    <template slot="prefix"><i class="el-icon-view"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="full-button" @click="submitForm('ruleForm2')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { Form, FormItem, Button, Input } from 'element-ui'
import { setSessionStore } from '@/utils/auth'
import { mapActions } from 'vuex'
import { routes } from '@/router'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)

export default {
    data() {
        return {
            name: '登录信息',
            username: this.$store.state.user,
            ruleForm2: {
                username: '',
                password: ''
            },
            rules2: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            redirect: undefined
        }
    },
    watch: {
        $router: {
            handler: (route) => {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(['addMenu']),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // TODO登录请求
                    this.addMenu(routes)
                    setSessionStore && setSessionStore('username', this.ruleForm2.username)
                    // TODO 请求成功跳转路径
                    this.$router.push({path: this.redirect || '/home'})
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    },
    created() {
        // console.log(this.$store.getters.newUser, '------------')
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#283443;
$light_gray:#eee;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
        color: $cursor;
        &::first-line {
            color: $light_gray;
        }
    }
}
.login-container {
    display: flex;
    height: 100%;
    background-color: $bg;
    justify-content: center;
    align-items: center;
    .demo-ruleForm {
        width: 400px;
        .full-button {
            width: 100%;
        }
        .login-container-title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .el-input {
            display: inline-block;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                color: $light_gray;
                caret-color: $cursor;
                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
}
</style>
