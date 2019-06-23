<template>
    <div class="personal-center">
        <div class="left-menu">
            <div class="menu-userinfo">
                <div class="userinfo">
                    <a href="javascript:void(0);"><img @click="centerDialogVisible=true" :src="userObj && userObj.avatar || 'static/image/defaultAvter.png'"/></a>
                    <p class="username">
                        <span>{{userObj && userObj.nickName}}</span>
                        <i class="el-icon-renzheng" v-if="userObj && userObj.status > 0"></i>
                    </p>
                </div>
                <!-- <div class="cropper-box" v-if="isShowCropper">
                    <div class="cropper-content">
                        <vueCropper
                            :img="userObj.avatar"
                            :outputSize="option.outputSize"
                            :outputType="option.outputType"
                            :info="option.info"
                            :canScale="option.canScale"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber">
                        </vueCropper>
                    </div>
                </div> -->
                <el-menu class="el-menu-demo personalCenter-left-menu" active-text-color="#FF6536" :default-active="$route.path">
                    <!-- <el-menu-item :index="'/personalCenter/userInfo'" :class="{ active: routerName == 'userInfo' }">
                        <router-link :to="{ path: '/personalCenter/userInfo' }">个人资料</router-link> 
                    </el-menu-item> -->
                    <el-menu-item :index="'/personalCenter/message'" :class="{ active: routerName == 'message' }">
                        <router-link :to="{ path: '/personalCenter/message' }">消息中心</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'/personalCenter/recommended'" :class="{ active: (routerName == 'consultantRecommend' 
                    || routerName == 'projectRecommend' || routerName == 'consultantRecommendDetails' || routerName == 'projectRecommendDetails') }">
                        <router-link :to="{ path: '/personalCenter/consultantRecommend' }" v-if="userObj && userObj.type === 0">顾问推荐</router-link>
                        <router-link :to="{ path: '/personalCenter/projectRecommend' }" v-else>项目推荐</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'/personalCenter/myProject'" :class="{ active: (routerName == 'myProject' || routerName == 'myProjectDetails') }">
                        <router-link :to="{ path: '/personalCenter/myProject' }">我的项目</router-link>
                    </el-menu-item>
                    <el-menu-item :index="'/personalCenter/clientUser'" :class="{ active: (routerName == 'clientUser' || routerName == 'companyDetail' || routerName == 'userInfo' || routerName == 'previewPage') }">
                        <router-link :to="{ path: (userObj && userObj.type === 0 ? '/personalCenter/clientUser' : '/personalCenter/userInfo')  }">个人资料</router-link> 
                    </el-menu-item>
                    <el-menu-item :index="'/personalCenter/accountSet'" :class="{ active: (routerName == 'accountSet' || routerName =='phoneModify' || routerName =='emailModify') }">
                        <router-link :to="{ path: '/personalCenter/accountSet' }">账号管理</router-link>
                    </el-menu-item>
                </el-menu>
            </div>
            <a href="javascript:void(0);" class="left-link">
                <router-link :to="{path: (userObj && userObj.type === 0 ? '/consultantMarket' : '/rojectMarket')}">
                    <img class="imgb" :src="'static/image/' + (userObj && userObj.type === 0 ? 'user-b.png' : 'user-p.png')"/>
                    <!-- <img class="imgp " :src="'static/image/' + (userObj && userObj.type === 0 ? 'user-b1.png' : 'user-p1.png')"/> -->
                </router-link>
            </a>
        </div>
        <div class="right-cont">
            <template>
                <router-view></router-view>
            </template>
        </div>
        <el-dialog
            class="cropper-dialog"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="onclickModal"
            width="410px"
            @close="closeDialog"
            center>
            <div class="upload-dialog-content">
                <div class="select-file" v-if="!isSelectImg">
                    <label class="select-file-btn" for="uploads">
                        <i class="el-icon-circle-plus"></i>
                        <span>选择照片</span>
                    </label>
                    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
                            @change="uploadImg($event, 1)">
                    <p class="select-file-tip">只支持JPG、PNG格式，图片大小不超过2M</p>
                </div>
                <div class="select-cropper" v-if="isSelectImg">
                    <div id="app">
                        <div class="cut">
                        <vue-cropper ref="cropper" 
                            :img="option.img" 
                            :output-size="option.size" 
                            :output-type="option.outputType" 
                            :info="true" 
                            :full="option.full"
                            :can-move="option.canMove" 
                            :can-move-box="option.canMoveBox" 
                            :fixed-box="option.fixedBox" 
                            :original="option.original"
                            :auto-crop="option.autoCrop" 
                            :auto-crop-width="option.autoCropWidth" 
                            :auto-crop-height="option.autoCropHeight" 
                            :center-box="option.centerBox"
                            @real-time="realTime" 
                            :high="option.high"
                            @img-load="imgLoad" >
                            </vue-cropper>
                        </div>
                        <!-- <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                            <div :style="previews.div">
                                <img :src="previews.url" :style="previews.img">
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <span slot="footer" class="cropper-dialog-footer">
                <el-button @click="centerDialogVisible = false" class="clear">取 消</el-button><el-button type="primary"  @click="finish('base64')">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import '@/styles/element-variables.scss'
import { Header, Menu, MenuItem, Button, Icon } from 'element-ui'
import { VueCropper }  from 'vue-cropper' 
import { setAvatarUpload, avatarUpload } from '@/serverApi/common'
import { editPCUserInfo } from '@/serverApi/personalCenter'
import { setSessionStore } from '@/utils/auth'
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Icon)
axios.withCredentials = false
export default {
    components: {
        VueCropper,
    },
    data() {
        return {
            title: '个人中心',
            routerName: this.$route.name,
            centerDialogVisible: false,
            crap: false,
            isSelectImg: false,
            previews: {},
            onclickModal:false,
            option: {
                img: '',
                size: 1,
                full: false,
                outputType: 'png',
                canMove: true,
                fixedBox: true,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 150,
                autoCropHeight: 150,
                centerBox: true,
                high: true
            },
        }
    },
    // components:{
    //     VueCropper
    // },
    created() {
        // console.log(this.userObj, '个人中心')
    },
    methods: {
        // 关闭窗口
        closeDialog() {
            this.isSelectImg = false
            this.option.img = ''
        },
        // 上传头像操作
        finish(type) {
            // 输出
            if(!this.isSelectImg) {
                this.$message.error('请选择要上传的图片')
                return
            }
            this.$refs.cropper.getCropData((data) => {
                let fromData = new FormData();
                fromData.append("file", data);
                axios.post(avatarUpload,qs.stringify({file:data}),{
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=>{
                    if(response.status == 200){
                        //修改头像请求
                        let avatar = response.data.data ? response.data.data.url : ''
                        this.setEditPCUserInfo(avatar)
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
        },
        // 修改头像请求
        setEditPCUserInfo(avatar) {
            editPCUserInfo({avatar: avatar}).then(res => {
                if(res.code == 200){
                    let userInfoData = this.userObj
                    userInfoData.avatar = avatar
                    this.$store.dispatch('setUserObj',{userInfo: userInfoData, pCWebLoginToken: this.token})
                    setSessionStore('userInfo', userInfoData);
                    this.centerDialogVisible = false
                    this.$message.success('修改成功！')
                    this.closeDialog()
                }
            })
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
        },

        uploadImg(e, num) {
            //上传图片
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            if(file && file.size > (1024*2000)) {
                this.$message.error('图片大小不能超过2M')
                return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                if (num === 1) {
                    this.option.img = data
                } else if (num === 2) {
                    this.example2.img = data
                }
                this.isSelectImg = true
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
        }
    },
    computed: {
        ...mapGetters(['token', 'userObj'])
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.routerName = val.name
            },
            // 深度观察监听
            deep: true
        }
    }
}
</script>

<style lang='scss' scope>
.personal-center {
    max-width: 940px;
    // min-height: 600px;
    margin: 0 auto;
    // margin-top: 60px;
    margin-top: 140px;
    margin-bottom: 146px;
    display: flex;
    flex-direction: row;
    .left-menu {
        width: 170px;
        margin-right: 50px;
        .menu-userinfo {
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
            border-radius:3px;
            .userinfo {
                padding: 20px 0;
                img {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                }
                .username {
                    margin-top: 10px;
                    span {
                        font-size: 18px;
                    }
                    i {
                        font-size: 16px;
                        color: #597EF7;
                        margin-left: 5px;
                    }
                    
                }
            }
            .personalCenter-left-menu {
                border: none;
                .el-menu-item {
                    height: 48px;
                    line-height: 48px;
                    font-size: 16px;
                    &.active {
                        background-color: #EFEFEF;
                    }
                    a {
                        width: 100%;
                        display: inline-block;
                        color: #666666;
                    }
                }
                .el-menu-item:hover, .el-menu-item:focus {
                    background-color: #EFEFEF;
                }
            }
        }
        .left-link {
            display: inline-block;
            margin-top: 20px;
            img{
                width: 186px;
                margin-left:-8px;
            }
            .imgb {
                display:block;
            }
            .imgp {
                display:none;
            }
            // &:hover {
            //     .imgp {
            //         display:block;
            //     }
            //     .imgb {
            //         display:none;
            //     }
            // }
        }
        // .cropper-box {
        //     width: 400px;
        //     height: 200px;
        //     position: absolute;
        //     left: 335px;
        //     top: 142px;
        //     .cropper-content {
        //         width: 100%;
        //         height: 200px;
        //     }
        // }
    }
    .right-cont {
        flex: 1;
    }
    .cropper-dialog {
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            padding: 20px 21px;
            .upload-dialog-content {
                width: 368px;
                height: 368px;
                background: rgba(248,248,248,1);
                border-radius: 3px;
                display: flex;
                .select-file {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    align-items: center;
                    .select-file-btn {
                        width: 147px;
                        height: 43px;
                        background: rgba(255,255,255,1);
                        border-radius: 3px;
                        line-height: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        i {
                            font-size: 18px;
                            color: #FF895F;
                            margin-right: 10px;
                        }
                        span {
                            font-size: 18px;
                            font-weight: 600;
                            color: #666666;
                        }
                    }
                    .select-file-tip {
                        line-height: 20px;
                        font-size: 14px;
                        color: #999999;
                        margin-top: 14px;
                    }
                }
                .select-cropper {
                    .cropper-view-box {
                        border-radius: 50%;
                        .cropper-face {
                            border-radius: 50%;
                        }
                    }
                    .cut {
                        width: 368px;
                        height: 368px;
                    }
                    .content {
                        margin: auto;
                        max-width: 1200px;
                        margin-bottom: 100px;
                    }
                    
                    code.language-html {
                        padding: 10px 20px;
                        margin: 10px 0px;
                        display: block;
                        background-color: #333;
                        color: #fff;
                        overflow-x: auto;
                        border-radius: 5px;
                        white-space: pre;
                    }
                    @keyframes slide {
                        0%  {
                            background-position: 0 0;
                        }
                        100% {
                            background-position: -100% 0;
                        }
                    }
                }
            }
        }
        .el-dialog__footer {
            padding-top: 0;
            padding-bottom: 40px;
        }
        .cropper-dialog-footer {
            .el-button {
                width: 120px;
                height: 32px;
                border-radius: 4px;
                padding: 0;
                &.clear {
                    border-color: #FF6536;
                    span {
                        color: #FF6536;
                    }
                }
            }
            .el-button + .el-button {
                margin-left: 60px;
            }
        }
    }
}
</style>