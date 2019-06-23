import { post, fetch } from '@/utils/request'

// 登录请求
export function login(data) {
    return post('/login/login', data)
}

// 退出登录请求
export function logout() {
    return post('/login/logout')
}

// 获取个人信息
export function getUserInfo() {
    return fetch('/user/info')
}

// 获取用户列表信息
export function getUserInfoList(params) {
    return fetch('/user/infoList', params)
}

// 获取项目市场数据
export function demandListUrl(params) {
    return fetch('/adviser/demandList', params)
}
// 获取项目详情数据
export function getProjectDetailUrl(type, params) {
    if(type === 1) {
        return fetch('/pcadviser/demandDeatil',params)
    }else {
        return fetch('/customer/getProjectDetail', params)
    }
}

/**
 * 消息中心列表请求
 * @param params {pageNum: 页数，pageSize：每页条数 }
 */ 
export function getMessageList(params) {
    return fetch('/pcmessage/getMessageList', params)
}

/**
 * 消息中心状态更改
 * @param params {mid: 消息id }
 */ 
export function readMessage(params) {
    return fetch('/pcmessage/readMessage', params)
}

/**
 * 顾问市场搜索请求(行业、技能搜索)
 * @param params {industryId: 行业id，firstSkillId：技能一级id，secondSkillId：技能二级id，search：关键字内容，pageNum：页码，pageSize：条数}
 */ 
export function searchAdviserList(params) {
    return fetch('/pcindex/searchAdviserList', params)
}

/**
 * 顾问市场搜索请求(关键字搜索)
 * @param params {search：关键字内容}
 */ 
export function searchAdviserListStr(params) {
    return fetch('/pcindex/searchAdviserListStr', params)
}

// 前端访问路径
export const base_url = 'http://matest.mf-tal.com/'
// export const base_url = 'http://stage.mf-tal.com/'


// 前端访问路径（微信地址）
export const accessUrl = base_url + 'maweb/'

// 文件上传路径
export const filesUpload = base_url + 'mafile/mamonfile/uploadFile'
// export const filesUpload = 'http://100.168.1.48:8181/mafile/mamonfile/uploadFile'
// export const filesUpload = 'http://100.168.1.147:8181/mafile/mamonfile/uploadFile'

// 头像上传地址
export const avatarUpload = base_url + 'mafile/mamonfile/uploadPCAvatar'
// export const avatarUpload = 'http://100.168.1.48:8181/mafile/mamonfile/uploadPCAvatar'
// export const avatarUpload = 'http://192.168.11.104:8080/mafile/mamonfile/uploadPCAvatar'
// export const avatarUpload = 'http://192.168.11.104:8080/mafile/mamonfile/uploadPCAvatar'

// 跳转到微信公众号项目详情页面
// export const projectDetailsUrl = 'http://matest.mf-tal.com/maweb/?source=pc&backType=3'
export const projectDetailsUrl = accessUrl +  '?source=history&page=8'




/**
 * 上传头像
 * @param params {file：文件}
 */
export function setAvatarUpload(file) {
    return post(avatarUpload, file)
}