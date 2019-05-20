<template>
    <aside class="sidebar" :class="active">
        <!-- <input type="text" placeholder="Digite para filtrar..." 
            class="filter-field"/> -->
        <sidebarMenu />
    </aside>
</template>

<script>
import sidebarMenu from './SidebarMenu'

export default {
    name: 'Sidebar',
    components: { sidebarMenu },
    computed: {
        active() {
            return this.$store.state.sidebarOpen ? "active" : ""
        }
    }
}
</script>

<style>
    .sidebar {
        background-color: #2e3344;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        position: fixed;
        width: 60px;
        height: 100vh;
        overflow: hidden;
        padding-top: 50px;
        transition: all .5s linear;
        z-index: 2;
    }

    aside.active {
        width: 240px;
    }
</style>
