<template>
    <header class="header">
        <div v-if="user" class="logo" :class="active">
            <a v-if="active">Pro Ensino</a>
            <a v-else>P</a>
        </div>
        <Nav />
    </header>
</template>

<script>
import { mapState } from 'vuex'
import Nav from './Nav'

export default {
    name: 'Header',
    components: { Nav },
    computed: {
        ...mapState(['user']),
        active() {
            return this.$store.state.sidebarOpen ? "active" : ""
        }
    }
}
</script>

<style>
    .header {
        background-color: #3c8dbc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 50px;
        box-shadow: 0px 5px 15px rgba(32, 74, 99, .2);
        z-index: 3;
    }

    .header .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 60px;
        height: 50px;
        background-color: #367ea9;
        transition: all .5s linear;
    }

    .header div.active {
        width: 240px;
    }

    .logo a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 1.3rem;
        font-weight: 500;
        color: #fff !important;
        padding: 0 10px;
        letter-spacing: .05rem;
    }
</style>
