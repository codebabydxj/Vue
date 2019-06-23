
import Vue from 'vue'
import { MessageBox } from 'element-ui'

/**
 *  全局确认框
 * @param params {title: 标题，content: 内容，okText: 确定按钮文字，cancelText：取消按钮文字，textAlign: 内容对齐方式}
 */
export const MessageConfirm = (params) => {
    
    return new Promise((resolve,reject) => {
        MessageBox.confirm(params.content, params.title, {
            distinguishCancelAndClose: true,
            dangerouslyUseHTMLString: true,
            confirmButtonText: params.okText || '确定',
            cancelButtonText: params.cancelText || '取消',
            cancelButtonClass: 'border mr60',
            center: params.textAlign == 'center' ? true : false
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
 *  全局提示框
 * @param params {title: 标题，content: 内容，okText: 确定按钮文字，textAlign: 内容对齐方式}
 * 
 */
export const MessageAlert = (params) => {
    
    return new Promise((resolve,reject) => {
        MessageBox.confirm(params.content, params.title, {
            confirmButtonText: params.okText,
            showCancelButton: false,
            center: params.textAlign == 'center' ? true : false
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })

}