import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sidebarOpen: null,
        user: null
    },
    mutations: {
        toggleSidebar(state, isVisible) {
            if(!state.user) {
                state.sidebarOpen = false
                state.user = false
                return
            }

            if(isVisible === undefined) {
                state.sidebarOpen = !state.sidebarOpen
            } else {
                state.sidebarOpen = isVisible
            }
        }, 
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.user = true
                state.sidebarOpen = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.user = null
                state.sidebarOpen = null
            }
        }
    }
})