
// const Layout = () => import('@/layouts')
import Layout from '@/layouts'

const consultantProjectRouter = {

    path: '/consultantProject/:id',
    name: 'consultantProject',
    redirect: '/consultantProject/index',
    component: Layout,
    children: [
        {
            path: '/consultantProject/index',
            redirect: '/consultantProject/details/:id',
            component: () => import('@/page/consultantProject'),
            name: 'consultantProject',
            meta: {
                title: '顾问项目',
                requireAuth: true
            },
            children: [
                {
                    path: '/consultantProject/details/:pid',
                    component: () => import('@/page/consultantProject/details'),
                    name: 'consultantDetails',
                    meta: {
                        title: '项目详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/program/:pid',
                    component: () => import('@/page/consultantProject/program'),
                    name: 'consultantProgram',
                    meta: {
                        title: '项目方案',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/stage/:pid',
                    component: () => import('@/page/consultantProject/stage'),
                    name: 'consultantStage',
                    meta: {
                        title: '项目阶段',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/stage/:pid/stageDetails/:id',
                    component: () => import('@/page/consultantProject/stage/stageDetails'),
                    name: 'consultant-stageDetails',
                    meta: {
                        title: '阶段详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/document/:pid',
                    component: () => import('@/page/consultantProject/document'),
                    name: 'consultantDocument',
                    meta: {
                        title: '项目文档',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/collection/:pid',
                    component: () => import('@/page/consultantProject/collection'),
                    name: 'consultantCollection',
                    meta: {
                        title: '收款记录',
                        requireAuth: true
                    }
                },
                {
                    path: '/consultantProject/collection/:pid/collectionDetails/:id',
                    component: () => import('@/page/consultantProject/collection/collectionDetails'),
                    name: 'consultant-collectionDetails',
                    meta: {
                        title: '收款详情',
                        requireAuth: true
                    }
                }
            ]
        },
        
    ]
}

export default consultantProjectRouter