import { post, fetch } from '@/utils/request'

/** 
 * 我的项目-客户-项目列表数据请求
 * @param params {proStatus：类型 } 
 */ 
export function getProjectByStatus(type,params) {
    if(type === 0){
        return fetch('/pccustomer/getProjectByStatus', params)
    }else {
        return fetch('/pcadviser/getProjectByStatus', params)
    }
}

/** 
 * 我的项目-客户/顾问-项目类型数量请求
 * @param type 类型 
 */ 
export function getMyProjectCount(type) {
    if(type === 0){
        return fetch('/pccustomer/myProjectCount')
    }else {
        return fetch('/pcadviser/myProjectCount')
    }
}

/** 
 * 我的项目-客户-项目详情数据请求
 * @param params {pid：项目id }
 */ 
export function getProjectDetail(params) {
    return fetch('/pccustomer/getProjectDetail',params)
}

/** 
 * 我的项目-客户-申请发布请求
 * @param params {pid：项目id } 
 */ 
export function releaseProject(params) {
    return fetch('/pccustomer/releaseProject',params)
}


/** 
 * 我的项目-项目评价请求
 * @param type 类型
 * @param params {pid: 项目id, evaluation: 评价内容} 
 */ 
export function projectEvaluate(type, params) {
    if(type === 0){
        return fetch('/pccustomer/projectEvaluate', params)
    }else {
        return fetch('/pcadviser/projectEvaluate', params)
    }
}

/** 
 * 我的项目-客户-顾问类型数量请求
 * @param params {pid：项目id } 
 */ 
export function getProjectSignUpAdviserCount(params) {
    return fetch('/pccustomer/getProjectSignUpAdviserCount',params)
}

/** 
 * 我的项目-客户-顾问列表数据请求
 * @param params {pid：项目id,status: 顾问状态 } 
 */ 
export function getProjectSignUpAdviserList(params) {
    return fetch('/pccustomer/getProjectSignUpAdviserList',params)
}

/** 
 * 我的项目-客户-顾问详情数据请求
 * @param params {uid：用户id } 
 */ 
export function getAdviserDetail(params) {
    return fetch('/pcadviser/getAdviserDetail',params)
}

/** 
 * 我的项目-客户-顾问申请信息数据请求
 * @param params {uid：用户id，pid: 项目id } 
 */ 
export function getApplicationDeatil(params) {
    return fetch('/pcrecommend/getApplicationDeatil',params)
}

/** 
 * 我的项目-客户-项目顾问面试、确认、拒绝、忽略请求
 * @param params {paid：申请项目id，status: 设置的类型 } 
 */ 
export function changeApplicationStatus(params) {
    return fetch('/pccustomer/changeApplicationStatus',params)
}

/** 
 * 我的项目-客户-项目方案列表数据请求
 * @param params {pid：项目id } 
 */ 
export function getProjectProgramList(params) {
    return fetch('/pccustomer/getProjectProgramList',params)
}

/** 
 * 我的项目-客户-项目方案详情请求
 * @param params {ppid：方案id } 
 */ 
export function getCustomerProgramDetail(params) {
    return fetch('/pccustomer/getProjectProgramDeatil',params)
}

/** 
 * 我的项目-客户-项目方案提出异议请求
 * @param params {ppid：方案id, opinion: 异议内容 } 
 */ 
export function customerNayProgramPlan(params) {
    return fetch('/pccustomer/customerNayProgramPlan',params)
}

/** 
 * 我的项目-客户-项目确认方案请求
 * @param params {ppid：方案id, status: 状态 } 
 */ 
export function confirmProgram(params) {
    return fetch('/pccustomer/confirmProgram',params)
}

/** 
 * 我的项目-客户-项目阶段列表数据请求
 * @param params {pid：项目id } 
 */ 
export function getProjectStageList(params) {
    return fetch('/pccustomer/getProjectStageList',params)
}

/** 
 * 我的项目-客户-项目阶段详情数据请求
 * @param params {id：阶段id } 
 */ 
export function getProjectStageDetail(params) {
    return fetch('/pccustomer/getProjectStageDetail',params)
}

/** 
 * 我的项目-客户-对整个阶段提出异议
 * @param params {pid：项目id，opinion: 异议内容 } 
 */ 
export function customerNayStagePlan(params) {
    return fetch('/pccustomer/customerNayStagePlan',params)
}

/** 
 * 我的项目-客户-项目整个阶段确认请求
 * @param params {pid：项目id } 
 */ 
export function customerConfirmStagePlan(params) {
    return fetch('/pccustomer/customerConfirmStagePlan',params)
}

/** 
 * 我的项目-客户-对单个阶段提出异议（交付物）
 * @param params {psid: 阶段id，opinion: 异议内容 } 
 */ 
export function customerNayDocument(params) {
    return fetch('/pccustomer/customerNayDocument',params)
}

/** 
 * 我的项目-客户-项目单个阶段确认（交付物）
 * @param params {psid: 阶段id，status: 状态 } 
 */ 
export function confirmStage(params) {
    return fetch('/pccustomer/confirmStage',params)
}

/** 
 * 我的项目-客户-项目提交支付凭证附加信息数据请求
 * @param params {psid: 阶段id} 
 */ 
export function getPayMentByPsid(params) {
    return fetch('/pccustomer/getPayMentByPsid',params)
}

/** 
 * 我的项目-客户-项目提交支付凭证提交请求
 * @param params {psid: 阶段id, ...传值} 
 */ 
export function addPayMent(params) {
    return fetch('/pccustomer/addPayMent',params)
}

/** 
 * 我的项目-客户-项目提交发票带出附加信息请求
 * @param params {psid: 阶段id } 
 */ 
export function getInvoiceByPsid(params) {
    return fetch('/pccustomer/getInvoiceByPsid',params)
}

/** 
 * 我的项目-客户-项目发票提交请求
 * @param params {psid: 阶段id，invoiceType：发票类型} 
 */ 
export function addInvoice(params) {
    return fetch('/pccustomer/addInvoice',params)
}

/** 
 * 我的项目-客户-项目文档列表数据请求
 * @param params {pid：项目id,type: 状态 } 
 */ 
export function getCustomerDocumentList(params) {
    return fetch('/pccustomer/getDocumentList',params)
}

/** 
 * 我的项目-客户-项目支付记录列表数据
 * @param params {pid：项目id,status: 状态 } 
 */ 
export function getPaymentList(params) {
    return fetch('/pccustomer/getPaymentList',params)
}

/** 
 * 我的项目-客户-项目支付记录详情数据
 * @param params {id：支付记录id } 
 */ 
export function getPaymentDetail(params) {
    return fetch('/pccustomer/getPaymentDetail',params)
}

/** 
 * 我的项目-客户-发票记录列表数据请求
 * @param params {pid：项目id，type: 状态 } 
 */ 
export function getInvoiceList(params) {
    return fetch('/pccustomer/getInvoiceList',params)
}

/** 
 * 我的项目-客户-发票记录详情数据请求
 * @param params {id：发票id } 
 */ 
export function getInvoiceDetail(params) {
    return fetch('/pccustomer/getInvoiceDetail',params)
}

/** 
 * 顾问市场-邀请顾问-项目邀请中项目列表
 * @param params {aiid：顾问uid } 
 */ 
export function getInvitationList(params) {
    return fetch('/pccustomer/getInvitationList',params)
}

/** 
 * 顾问市场-邀请顾问-邀请顾问请求
 * @param params {aiid：顾问uid ，pid：项目id} 
 */ 
export function insertAdProject(params) {
    return fetch('/pccustomer/insertAdProject',params)
}

/** 
 * 我的项目-顾问-项目详情请求
 * @param params {pid：项目id }
 */ 
export function getDemandDeatil(params) {
    return fetch('/pcadviser/demandDeatil',params)
}

/** 
 * 我的项目-顾问-顾问申请项目提交
 * @param params {pid：项目id, ...传值 }
 */ 
export function submitApplication(params) {
    return fetch('/pcadviser/submitApplication',params)
}

/** 
 * 我的项目-顾问-方案详情请求
 * @param params {pid：项目id }
 */ 
export function getAdviserProgramDetail(params) {
    return fetch('/pcadviser/getProjectProgramDetail',params)
}

/** 
 * 我的项目-顾问-阶段列表数据请求
 * @param params {pid：项目id, status: 状态}
 */ 
export function getAdviserProjectStageListUrl(params) {
    return fetch('/pcadviser/getProjectStageList',params)
}

/** 
 * 我的项目-顾问-整个阶段异议列表请求
 * @param params {pid：项目id}
 */ 
export function getAdviserStageProposalList(params) {
    return fetch('/pcadviser/projectStageProposalList',params)
}

/** 
 * 我的项目-顾问-阶段详情数据请求
 * @param params {id：阶段id}
 */ 
export function getAdvisertageDetail(params) {
    return fetch('/pcadviser/getProjectStageDetail',params)
}

/** 
 * 我的项目-顾问-文档列表请求
 * @param params {pid：项目id，type: 状态}
 */ 
export function getAdviserDocumentList(params) {
    return fetch('/pcadviser/getDocumentList',params)
}
/** 
 * 我的项目-顾问-删除交付物列表
 * @param params {pdid：文档id}
 */ 
export function deleteDocumentList(params) {
    return fetch('/pcadviser/delDocument',params)
}
/** 
 * 我的项目-顾问-收款记录列表数据请求
 * @param params {pid：项目id}
 */ 
export function getCollectionList(params) {
    return fetch('/pcadviser/applyMoneyList',params)
}

/** 
 * 我的项目-顾问-收款记录详情数据请求
 * @param params {mpid：收款记录id}
 */ 
export function getCollectionDetails(params) {
    return fetch('/pcadviser/applyMoneyDetail',params)
}

/** 
 * 我的项目-顾问-保存方案内容
 * @param params {pid：项目id，status:状态，...保存的值}
 */ 
export function addOrEditProgram(params) {
    return fetch('/pcadviser/addOrEditProgram',params)
}

/** 
 * 我的项目-顾问-阶段新增、编辑请求
 * @param params {pid：项目id，...保存的值}
 */ 
export function addOrEditStage(params) {
    return post('/pcadviser/addOrEditStage',params)
}

/** 
 * 我的项目-顾问-阶段提交请求
 * @param params {pid：项目id，type:类型}
 */ 
export function changeStageStatus(params) {
    return fetch('/pcadviser/changeStageStatus',params)
}

/** 
 * 我的项目-顾问-文档、交互物提交
 * @param params {pid：项目id，...传值}
 */ 
export function submitDocument(params) {
    return fetch('/pcadviser/submitDocument',params)
}

/** 
 * 我的项目-顾问-付款申请提交请求
 * @param params {pid：项目id，psid: 阶段id, ...传值}
 */ 
export function applyMoneySubmit(params) {
    return fetch('/pcadviser/applyMoney',params)
}

/** 
 * 我的项目-顾问-获取付款申请信息请求
 * @param params {psid: 阶段id, ...传值}
 */ 
export function applyMoneyInfo(params) {
    return fetch('/pcadviser/applyMoneyInfo',params)
}















