import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'
import login from './login'
import project from './project'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        menu,
        login,
        project
    },
    /* 初始值 */
    state: {
        user: 'huanghb'
    },
    /* 计算属性 */
    getters: {
        newUser: state => {
            return state.user + 'new'
        }
    },
    /* 改变数据函数 */
    mutations: {
        onChangeUser: (state, value) => {
            state.user = state.user + value
        }
    },
    /* 方法调用 */
    actions: {
        onChangeUserAsnyc: ({commit}, value) => {
            setTimeout(() => {
                commit('onChangeUser', value)
            }, 3000)
        }
    }
})

export default store
