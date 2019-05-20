<template>
    <main class="main" :class="active">
        <Content />
        <Footer />
    </main>
</template>

<script>
import Content from './Content'
import Footer from './Footer'

export default {
    name: 'Main',
    components: { Content, Footer },
    computed: {
        active() {
            if(this.$store.state.user === null) {
                return this.$store.state.sidebarOpen === null ? "is-not-active" : ""
            } else {
                return this.$store.state.sidebarOpen ? "active" : ""
            }
        }
    }
}
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
        position: relative;
        padding-top: 50px;
        margin-left: 60px;
        transition: all 0.5s linear;
    }

    main.active {
        margin-left: 240px;
    }

    main.is-not-active {
        margin-left: 0px;
    }
</style>
