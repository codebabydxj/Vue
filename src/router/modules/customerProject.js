
// const Layout = () => import('@/layouts')
import Layout from '@/layouts'

const customerProjectRouter = {

    path: '/customerProject/:id',
    name: 'customerProject',
    redirect: '/customerProject/index',
    component: Layout,
    children: [
        {
            path: '/customerProject/index',
            redirect: '/customerProject/details/:id',
            component: () => import('@/page/customerProject'),
            name: 'customerProject',
            meta: {
                title: '客户项目',
                requireAuth: true
            },
            children: [
                {
                    path: '/customerProject/details/:pid',
                    component: () => import('@/page/customerProject/details'),
                    name: 'customerDetails',
                    meta: {
                        title: '项目详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/consultant/:pid',
                    component: () => import('@/page/customerProject/consultant'),
                    name: 'customerConsultant',
                    meta: {
                        title: '项目顾问',
                        requireAuth: true
                    },
                },
                {
                    path: '/customerProject/consultant/:pid/consultantDetails/:id',
                    component: () => import('@/page/customerProject/consultant/consultantDetails'),
                    name: 'consultantDetails',
                    meta: {
                        title: '顾问详情',
                        requireAuth: true
                    },
                },
                {
                    path: '/customerProject/program/:pid',
                    component: () => import('@/page/customerProject/program'),
                    name: 'customerProgram',
                    meta: {
                        title: '项目方案',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/program/:pid/programDetails/:id',
                    component: () => import('@/page/customerProject/program/programDetails'),
                    name: 'customer-programDetails',
                    meta: {
                        title: '方案详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/stage/:pid',
                    component: () => import('@/page/customerProject/stage'),
                    name: 'customerStage',
                    meta: {
                        title: '项目阶段',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/stage/:pid/stageDetails/:id',
                    component: () => import('@/page/customerProject/stage/stageDetails'),
                    name: 'customer-stageDetails',
                    meta: {
                        title: '阶段详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/document/:pid',
                    component: () => import('@/page/customerProject/document'),
                    name: 'customerDocument',
                    meta: {
                        title: '项目文档',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/payment/:pid',
                    component: () => import('@/page/customerProject/payment'),
                    name: 'customerPayment',
                    meta: {
                        title: '支付记录',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/payment/:pid/paymentDetails/:id',
                    component: () => import('@/page/customerProject/payment/paymentDetails'),
                    name: 'customer-paymentDetails',
                    meta: {
                        title: '支付详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/invoice/:pid',
                    component: () => import('@/page/customerProject/invoice'),
                    name: 'customerInvoice',
                    meta: {
                        title: '发票',
                        requireAuth: true
                    }
                },
                {
                    path: '/customerProject/invoice/:pid/invoiceDetails/:id',
                    component: () => import('@/page/customerProject/invoice/invoiceDetails'),
                    name: 'customer-invoiceDetails',
                    meta: {
                        title: '发票详情',
                        requireAuth: true
                    }
                }
            ]
        },
        
    ]
}

export default customerProjectRouter