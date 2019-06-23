
const types = {
    SHOW_REAPID_RELEASE: 'SHOW_REAPID_RELEASE',  // 显示登录框
    HIDE_REAPID_RELEASE: 'HIDE_REAPID_RELEASE',
}


const state = {
    reapidReleaseVisible: false,
} 

const getters = {
   
}

const mutations = {
    [types.SHOW_REAPID_RELEASE] (state) {
        state.reapidReleaseVisible = true;
    },
    [types.HIDE_REAPID_RELEASE] (state) {
        state.reapidReleaseVisible = false;
    },
}

const actions = {
    showReleaseDialog:({ commit}) => {
        commit(types.SHOW_REAPID_RELEASE)
    },
    hideReleaseDialog:({ commit}) => {
        commit(types.HIDE_REAPID_RELEASE)
    },
}

export default  {
    state,
    getters,
    mutations,
    actions
}