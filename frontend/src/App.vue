<template>
    <div id="app">
        <Header />
        <Sidebar v-if="user"/>
        <Loading v-if="validatingToken" />
        <Main v-else/>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Header from '@/components/template/Header'
import Sidebar from '@/components/template/Sidebar'
import Main from '@/components/template/Main'
import Loading from '@/components/template/Loading'

export default {
    name: 'App',
    components: { Header, Sidebar, Main, Loading },
    computed: mapState(['user']),
    data() {
        return {
            // atributo flag para verificar se está ou não validando o token
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if(!userData) {
                this.validatingToken = false
                this.$router.push({ name: 'auth' })
                return
            }

            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

            if(res.data) {
                this.$store.commit('setUser', userData)
            } else {
                localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
            }

            this.validatingToken = false
        }
    },
    created() {
        this.validateToken()
    }
}
</script>

<style>
    #app {
        width: 100%;
        position: relative;
        background: #efefef;
    }
</style>
