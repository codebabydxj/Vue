import { post, fetch } from '@/utils/request'

/*顾问基本信息详情请求*/
export function getAdviserInfolUrl() {
    return fetch('/pcadviser/getAdviserInfo');
} 
/*顾问基本信息新增、编辑请求*/
export function editAdviserUrl(parmes) {
    return fetch('pcadviser/editAdviser',parmes)
}
/*顾问个人信息详情请求*/
export function getAdviserDetailUrl() {
    return fetch('pcadviser/getAdviserDetail')
}
/** 顾问个人信息模块显示、隐藏*/
export function updateDisplayPropertyUrl(parmes) {
    return fetch('pcadviser/updateDisplayProperty',parmes)
}
/*顾问收款信息新增、编辑请求*/
export function addOrEditBankUrl(parmes) {
    return fetch('pcadviser/addOrEditBank',parmes)
}
/*顾问收款信息删除请求*/
export function delBankUrl(parmes) {
    return fetch('pcadviser/delBank',parmes)
}

/*顾问工作经历新增、编辑请求*/
export function addOrEditWorkExpUrl(parmes) {
    return fetch('pcadviser/addOrEditWorkExp',parmes)
}
/*顾问工作经历删除请求*/
export function delWorkExpUrl(parmes) {
    return fetch('pcadviser/delWorkExp',parmes)
}
/*顾问项目经历新增、编辑请求*/
export function addOrEditProjectExpUrl(parmes) {
    return fetch('pcadviser/addOrEditProjectExp',parmes)
}
/*顾问项目经历删除请求*/
export function delProjectExpUrl(parmes) {
    return fetch('pcadviser/delProjectExp',parmes)
}
/*顾问教育经历信息新增、编辑请求*/
export function addOrEditEducationalExpUrl(parmes) {
    return fetch('pcadviser/addOrEditEducationalExp',parmes)
}

/*顾问教育经历信息删除请求*/
export function delEducationalExpUrl(parmes) {
    return fetch('pcadviser/delEducationalExp',parmes)
}
/*顾问擅长语言新增、编辑请求*/
export function addOrEditLanguageUrl(parmes) {
    return fetch('pcadviser/addOrEditLanguage',parmes)
}
/*顾问擅长语言删除请求*/
export function delLanguageUrl(parmes) {
    return fetch('pcadviser/delLanguage',parmes)
}

/*顾问专业认证新增、编辑请求*/
export function addOrEditCertificationUrl(parmes) {
    return fetch('pcadviser/addOrEditCertification',parmes)
}
/*顾问专业认证删除请求*/
export function delCertificationUrl(parmes) {
    return fetch('pcadviser/delCertification',parmes)
}
/*顾问行业列表请求*/
export function getIndustryListUrl(parmes) {
    return fetch('pccompany/getIndustryList',parmes)
}
/*顾问一级技能列表请求*/
export function getSkillUrl(parmes) {
    return fetch('pcindex/getSkill',parmes)
}
/*顾问二级技能列表请求*/
export function getSkillSecondaryUrl(parmes) {
    return fetch('pcindex/getSkillSecondary',parmes)
}
/**----------------------------客户--------------------------------- */ 
/*客户用户基本信息编辑请求*/
export function editUserUrl(parmes) {
    return fetch('pcuser/editUser',parmes)
}
/*客户公司列表请求*/
export function getCompanyListUrl() {
    return fetch('pccompany/getCompanyList')
}
/*获取客户公司详情请求*/
export function getCompanyDetailUrl(parmes) {
    return fetch('pccompany/getCompanyDetail',parmes)
}
/*新增、编辑公司请求*/
export function addOrUpdateCompanyUrl(parmes) {
    return fetch('pccompany/addOrUpdateCompany',parmes)
}
/*删除公司提请求*/
export function delCompanyUrl(parmes) {
    return fetch('pccompany/delCompany',parmes)
}
/*客户发票信息新增、编辑*/
export function editCompanyPayTaxesUrl(parmes) {
    return fetch('pccompany/editCompanyPayTaxes',parmes)
}
/*客户发票信息删除*/
export function delPayTaxesUrl(parmes) {
    return fetch('pccompany/delPayTaxes',parmes)
}
/*客户公司付款列表请求*/
export function getPayerListUrl(parmes) {
    return fetch('pccompany/getPayerList',parmes)
}
/*客户公司付款信息编辑请求*/
export function editCompanyPayerUrl(parmes) {
    return fetch('pccompany/editCompanyPayer',parmes)
}
/*客户公司付款信息新增请求*/
export function addCompanyPayerUrl(parmes) {
    return fetch('pccompany/addCompanyPayer',parmes)
}
/*客户公司付款信息删除请求*/
export function delPayerUrl(parmes) {
    return fetch('pccompany/delPayer',parmes)
}
// 绑定推荐人
export function bindRecommenderUrl(parmes) {
    return fetch('pcrecommend/bindRecommender',parmes)
}
/** 获取用户信息*/
export function getUserByTokenUrl() {
    return fetch('pccustomer/getUserByToken ')
}
// 客户基本信息编辑
export function editPCUserInfoUrl(parmes) {
    return post('/pcuser/editPCUserInfo', parmes)
}
/**************发布项目*************** */ 
/*我的项目-客户-保存为草稿箱*/
export function savaraftUrl(parmes) {
    return fetch('pccustomer/savaraft', parmes)
}
/*快速发布*/
export function getSpeedrelease(parmes) {
    return fetch('pccustomer/fastRelease', parmes)
}
/*我的项目-客户-项目申请发布请求*/
export function releaseProjectUrl(parmes) {
    return fetch('pccustomer/releaseProject', parmes)
}

/** 
 * 我的项目-顾问-获取付款申请信息请求
 * @param params {type: 类型(顾问传2), pageNum: 页码，pageSize：每页个数}
 */ 
export function getRecommendList(params) {
    return fetch('/pcrecommend/getRecommendList', params)
}

/** 
 * 个人中心-账号设置-修改手机号请求(下一步)
 * @param params {oldPhone: 旧手机号码, code：验证码}
 */ 
export function checkCode(params) {
    return fetch('/pcuser/checkCode', params)
}

/** 
 * 个人中心-账号设置-修改手机号请求(确定)
 * @param params {newPhone: 新手机号码, verifyCode：验证码}
 */ 
export function changePhone(params) {
    return fetch('/pcuser/updateUserPhone', params)
}

/** 
 * 个人中心-账号设置-新增邮箱请求
 * @param params {mail: 邮箱账号,}
 */ 
export function sendMail(params) {
    // return fetch('/pcuser/sendMail', params)
    return fetch('/pccustomer/pcSendMail', params)
}

/** 
 * 个人中心-头像上传
 * @param params {avatar: 头像信息,}
 */ 
export function editPCUserInfo(params) {
    // return fetch('/pcuser/sendMail', params)
    return post('pcuser/editPCUserInfo', params)
}


/** 顾问市场 行业/技能筛选/搜索 请求*/ 
export function getSearch(params) {
    return fetch('/pcindex/searchAdviserList', params)
}