<template>
    <ul class="sidebar-menu" v-if="user">
        <router-link tag="li" class="sidebar-menu-item" to="/">
            <a>
                <i class="fas fa-home"></i>
                <span class="menu-item" v-show="sidebarOpen">Início</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/students">
            <a>
                <i class="fas fa-users"></i>
                <span class="menu-item" v-show="sidebarOpen">Alunos</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/enrollments">
            <a>
                <i class="fas fa-user-graduate"></i>
                <span class="menu-item" v-show="sidebarOpen">Matrículas</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/courses">
            <a>
                <i class="fas fa-book"></i>
                <span class="menu-item" v-show="sidebarOpen">Cursos</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/classes">
            <a>
                <i class="fas fa-book-open"></i>
                <span class="menu-item" v-show="sidebarOpen">Turmas</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/subjects">
            <a>
                <i class="fas fa-edit"></i>
                <span class="menu-item" v-show="sidebarOpen">Disciplinas</span>
            </a>
        </router-link>
        <router-link tag="li" class="sidebar-menu-item" to="/teachers">
            <a>
                <i class="fas fa-user-tie"></i>
                <span class="menu-item" v-show="sidebarOpen">Professores</span>
            </a>
        </router-link>
    </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "SidebarMenu",
    computed: mapState(['sidebarOpen', 'user'])
}
</script>

<style>
    .sidebar-menu {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .sidebar-menu-item {
        display: block;
        position: relative;
    }

    .sidebar-menu-item a {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        line-height: 30px;
        font-size: 14px;
        color: #b8c7ce;
        text-decoration: none;
    }

    .sidebar-menu-item:hover a {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
    }

    .sidebar-menu-item a i {
        line-height: 30px;
    }

    .sidebar-menu-item a span {
        margin-left: 15px;
    }
</style>
