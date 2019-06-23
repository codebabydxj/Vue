import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/page/login')
const Layout = () => import('@/layouts')

import customerProjectRouter from './modules/customerProject'
import consultantProjectRouter from './modules/consultantProject'

Vue.use(Router)

/* 路由列表 */
export const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        redirect: '/home',
        component: Layout
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/index',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/page/home/index'),
                name: 'home-content',
                meta: { 
                    title: '首页',
                    icon: 'el-icon-tickets' 
                }
            }
        ]
    },
    {
        path: '/advantage',
        component: Layout,
        redirect: '/advantage/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/advantage'),
                name: 'advantage',
                meta: { 
                    title: '平台优势',
                    icon: 'el-icon-tickets' 
                }
            }
        ]
    },
    {
        path: '/bindPhone',
        component: Layout,
        redirect: '/bindPhone/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/bindPhone'),
                name: 'bindPhone',
                meta: { 
                    title: '绑定手机',
                    icon: 'el-icon-tickets' 
                }
            }
        ]
    },
    {
        path: '/rojectMarket',
        component: Layout,
        redirect: '/rojectMarket/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/rojectMarket'),
                name: 'rojectMarket',
                meta: { title: '项目市场', icon: 'el-icon-document', keepAlive:true }
            },
            {
                path: '/rojectMarket/rojectMarketDetail/:id',
                component: () => import('@/page/rojectMarket/rojectMarketDetail'),
                name: 'rojectMarketDetail',
                meta: { title: '项目详情', icon: 'el-icon-document', keepAlive:true }
            }
        ]
    },
    {
        path: '/consultantMarket',
        component: Layout,
        redirect: '/consultantMarket/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/consultantMarket'),
                name: 'consultantMarket',
                meta: { title: '顾问市场', icon: 'el-icon-document', keepAlive:true }
            },
            {
                path: '/consultantMarket/consultantMarketDetails/:id',
                component: () => import('@/page/consultantMarket/consultantMarketDetails'),
                name: 'consultantMarketDetails',
                meta: { title: '顾问市场详情', icon: 'el-icon-document', keepAlive:true }
            }
        ]
    },
    {
        path: '/resources',
        component: Layout,
        redirect: '/resources/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/resources'),
                name: 'resources',
                meta: { 
                    title: '平台资源',
                    icon: 'el-icon-bell' 
                }
            }
        ]
    },
    {
        path: '/publishProject/:id',
        component: Layout,
        redirect: '/publishProject/index/:id',
        noDropdown: true,
        children: [
            {
                path: '/publishProject/index/:id',
                component: () => import('@/page/publishProject/index'),
                name: 'publishProject',
                meta: { 
                    title: '发布项目', 
                    icon: 'el-icon-setting',
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/aboutMa',
        component: Layout,
        redirect: '/aboutMa/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/aboutMa'),
                name: 'aboutMa',
                meta: { 
                    title: '关于我们',
                    // icon: 'el-icon-bell' 
                }
            }
        ]
    },
    {
        path: '/platformTerms',
        component: Layout,
        redirect: '/platformTerms/index',
        noDropdown: true,
        children: [
            {
                path: 'index',
                component: () => import('@/page/platformTerms'),
                name: 'platformTerms',
                meta: { 
                    title: '平台条款',
                    // icon: 'el-icon-bell' 
                }
            }
        ]
    },
    {
        path: '/personalCenter',
        name: 'user',
        redirect: '/personalCenter/index',
        component: Layout,
        meta: {
            title: '用户管理',
            icon: 'el-icon-news',
            requireAuth: true
        },
        children: [
            {
                path: '/personalCenter/index',
                // redirect: '/personalCenter/userInfo',//顾问个人中心
                redirect: '/personalCenter/clientUser',//客户个人中心
                component: () => import('@/page/personalCenter'),
                name: 'personalCenter',
                meta: {
                    title: '个人资料',
                    requireAuth: true
                },
                children: [
                    {
                        path: '/personalCenter/message',
                        component: () => import('@/page/personalCenter/message'),
                        name: 'message',
                        meta: {
                            title: '消息中心',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/myProject',
                        component: () => import('@/page/personalCenter/myProject'),
                        name: 'myProject',
                        meta: {
                            title: '我的项目',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/myProject/myProjectDetails/:pid',
                        component: () => import('@/page/personalCenter/myProject/MyProjectDetails'),
                        name: 'myProjectDetails',
                        meta: {
                            title: '项目详情',   //快速发布
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/userInfo',
                        component: () => import('@/page/personalCenter/userInfo'),
                        name: 'userInfo',
                        meta: {
                            title: '个人资料',
                            requireAuth: true
                        }
                    },
                    {
                        path:'/personalCenter/userInfo/previewPage',
                        component: () => import('@/page/personalCenter/userInfo/previewPage'),
                        name:'previewPage',
                        meta: {
                            title: '个人主页'
                        }
                    },
                    {
                        path:'/personalCenter/clientUser',
                        component: () => import('@/page/personalCenter/clientUser'),
                        name:'clientUser',
                        meta: {
                            title: '个人资料',
                        }
                    },
                    {
                        path:'/personalCenter/clientUser/companyDetail/:id',
                        component: () => import('@/page/personalCenter/clientUser/companyDetail'),
                        name:'companyDetail',
                        meta: {
                            title: '公司详情',
                        }
                    },
                    {
                        path: '/personalCenter/accountSet',
                        component: () => import('@/page/personalCenter/accountSet'),
                        name: 'accountSet',
                        noDropdown: true,
                        meta: {
                            title: '账号管理',
                            requireAuth: true
                        },
                    },
                    {
                        path: '/personalCenter/accountSet/phoneModify',
                        component: () => import('@/page/personalCenter/accountSet/phoneModify'),
                        name: 'phoneModify',
                        meta: { 
                            title: '手机修改',
                            requireAuth: true 
                        }
                    },
                    {
                        path: '/personalCenter/accountSet/emailModify',
                        component: () => import('@/page/personalCenter/accountSet/emailModify'),
                        name: 'emailModify',
                        meta: { 
                            title: '邮箱修改',
                            requireAuth: true 
                        }
                    },
                    {
                        path: '/personalCenter/projectRecommend',
                        component: () => import('@/page/personalCenter/recommended/projectRecommend'),
                        name: 'projectRecommend',
                        meta: {
                            title: '项目推荐',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/projectRecommend/projectDetails/:pid',
                        component: () => import('@/page/personalCenter/recommended/projectRecommend/recommendDetails'),
                        name: 'projectRecommendDetails',
                        meta: {
                            title: '项目详情',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/consultantRecommend',
                        component: () => import('@/page/personalCenter/recommended/consultantRecommend'),
                        name: 'consultantRecommend',
                        meta: {
                            title: '顾问推荐',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/personalCenter/consultantRecommend/:pid/consultantDetails/:id',
                        component: () => import('@/page/personalCenter/recommended/consultantRecommend/recommendDetails'),
                        name: 'consultantRecommendDetails',
                        meta: {
                            title: '顾问详情',
                            requireAuth: true
                        }
                    }
                ]
            },
            
        ]
    },
    {
        path: '/register',
        name: 'register',
        redirect: '/register/steps-1',
        component: Layout,
        meta: {
            title: '用户注册',
            icon: 'el-icon-news'
        },
        children: [
            {
                path: '/register/steps-1',
                component: () => import('@/page/register/steps1'),
                name: 'steps-1',
                meta: {
                    title: '步骤一',
                }
            },
            {
                path: '/register/steps-2/:type',
                component: () => import('@/page/register/steps2'),
                name: 'steps-2',
                meta: {
                    title: '步骤二'
                }
            },
            {
                path: '/register/steps-3',
                component: () => import('@/page/register/steps3'),
                name: 'steps-3',
                meta: {
                    title: '步骤三'
                }
            }
        ]
    },
    customerProjectRouter,  //客户项目流程路由
    consultantProjectRouter  //顾问项目流程路由
    
]

/* 生成路由 */
export default new Router({
    routes
})
