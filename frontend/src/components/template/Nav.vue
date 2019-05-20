<template>
    <nav v-if="user" class="nav" :class="active">
        <a class="toggle" @click="toggleSidebar" v-if="!hideToggle">
            <div class="bars">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>
        <!-- <h1 class="title"><router-link to="/">{{ title }}</router-link></h1> -->
        <UserDropdown v-if="!hideUserDropdown" />
    </nav>
</template>

<script>
import { mapState } from 'vuex'
import UserDropdown from './UserDropdown'

export default {
    name: 'Nav',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        ...mapState(['user']),
        active() {
            return this.$store.state.sidebarOpen ? "active" : ""
        }
    },
    methods: {
        toggleSidebar() {
            this.$store.commit('toggleSidebar')
        }
    }
}
</script>

<style>
    .nav {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        width: 100%;
        min-height: 50px;
        margin-left: 60px;
        transition: all .5s linear;
    }

    nav.active {
        margin-left: 240px;
    }

    .title {
        font-size: 1.2rem;
        font-weight: 100;
        color: #fff;
        text-align: center;
    }

    .title a {
        color: #fff;
        text-decoration: none;
    }

    .title a:hover {
        color: #ffff;
        text-emphasis: none;
    }

    .nav .toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: flex-start;
        width: 50px;
        color: #fff;
        cursor: pointer;
    }

    .nav .toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        transition: all .6s linear;
    }

    .nav .bars {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 25px;
        height: 18px;
    }

    .nav .bars span {
        width: 20px;
        height: 2px;
        background-color: #fff;
    }

</style>
