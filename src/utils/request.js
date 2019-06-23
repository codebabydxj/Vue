import axios from 'axios';
import qs from 'qs';
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui';

// axios.defaults.withCredentials = true;
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    // baseURL: "/mamon", // api 的 base_urlhttp://matest.mf-tal.com
    // baseURL: "http://matest.mf-tal.com", // api 的 base_urlhttp://matest.mf-tal.com
    timeout: 15000, // request timeout,
    withCredentials: true // 允许携带cookie
})

//http request 拦截器
service.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Type': 'multipart/form-data'
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        // TODO 根据具体业务做修改
        // let data = JSON.parse(response.data)
        
        if(response.data.code == 207 ||  response.data.code == 227){
        // if(typeof response.data == 'string' ){
            store.dispatch('setUserObj', null);
            console.log(router,'路由值')
            router.push({
                path: "/home",
                // query: { redirect: to.fullPath }
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        service.get(url,{
            params:params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        service.post(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        service.patch(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
  
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        service.put(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}