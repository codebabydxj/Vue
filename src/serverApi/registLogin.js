import { post, fetch } from '@/utils/request'

// 登录请求
export function login(data) {
    return post('/login/login',data)
}

// 退出登录请求
export function logout() {
    return post('/pcuser/pCLogout')
}

// 获取个人信息
export function getUserInfo() {
    return fetch('/user/info')
}

// 发送验证码请求
export function sendPhoneCode(params) {
    return post('/pcuser/getShortMessage',params);
}

// 手机短信验证码登录请求
export function verifyCodeLogin(params) {
    return post('/pcuser/verifyCodeLogin',params);
}

// 用户注册请求
export function register(data) {
    return post('/pcuser/PCUserRegister',data)
}

/**
 * 扫码登录
 * @param params {opStr: '登录 REDIRECT_URL  绑定 BINDWECHAT_URL'}
 */ 
export function wechatLogin(params) {
    return fetch('/pcWechatLogin/login', params)
}

/**
 * 根据获取用户个人信息
 * @param params {openId：用户标识}
 */ 
export function getUserByopenId(params) {
    return fetch('/pcuser/getUserInfo', params)
}

/**
 * 验证用户信息
 * @param params {webOpenId：用户标识，phone：手机号，verifyCode：验证码，access_token：token值}
 */ 
export function checkUser(params) {
    return fetch('/pcWechatLogin/checkUser', params)
}

/**
 * 扫码后选择身份请求
 * @param params {type：身份状态，phone：手机号}
 */ 
export function upIdentity(params) {
    return fetch('/pcuser/upIdentity', params)
}

/**
 * 绑定微信时进行校验请求
 * @param params {checkOp：用户openid， checkUn：unid唯一标识}
 */ 
export function userBindWechat(params) {
    return fetch('/pcWechatLogin/userBindWechat', params)
}



