import { removeSessionStore, getSessionStore, setCookie, delCookie } from '@/utils/auth'

const types = {
   
    SHOW_LOGIN_DIALOG: 'SHOW_LOGIN_DIALOG',  // 显示登录框
    HIDE_LOGIN_DIALOG: 'HIDE_LOGIN_DIALOG',
    SET_USER_DATA: 'SET_USER_DATA'  // 获取用户信息

}


const state = {
    loginDialogVisible: false,
    userObj: getSessionStore('userInfo') || null,
    token: getSessionStore('userToken') || ''
} 

const getters = {
    userObj: state => state.userObj,
    token: state => state.token
}

const mutations = {
    [types.SHOW_LOGIN_DIALOG] (state) {
        state.loginDialogVisible = true;
    },
    [types.HIDE_LOGIN_DIALOG] (state) {
        state.loginDialogVisible = false;
    },
    [types.SET_USER_DATA] (state, data) {
        if(data){
            state.userObj = data.userInfo;
            state.token = data.pCWebLoginToken;
            // setCookie('token',data.token,1)
        }else{
            state.userObj = null;
            state.token = ''
            removeSessionStore('userToken')
            removeSessionStore('userInfo')
            // delCookie('token')
            
        }
    }


}

const actions = {

    showLoginDialog:({ commit}) => {
        commit(types.SHOW_LOGIN_DIALOG)
    },
    hideLoginDialog:({ commit}) => {
        commit(types.HIDE_LOGIN_DIALOG)
    },
    setUserObj: ({ commit}, userInfo) => {
        commit(types.SET_USER_DATA, userInfo)
    }

}

export default  {
    state,
    getters,
    mutations,
    actions
}