<template>
    <div class="home">
        <!-- <PageTitle icon="fa fa-home" main="Início" /> -->
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <div class="stats">
            <Stat title="Alunos" icon="fas fa-user-graduate" 
                style="background-color: #00c0ef;" :value="stat.students"/>
            <Stat title="Cursos" icon="fas fa-book" 
                style="background-color: #00a65a;" :value="stat.courses"/>
            <Stat title="Turmas" icon="fas fa-book-open" 
                style="background-color: #dd4b39;" :value="stat.classes"/>
            <Stat title="Professores" icon="fas fa-user-tie" 
                style="background-color: #f39c12;" :value="stat.teachers"/>
        </div>
    </div>
</template>

<script>
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { Stat },
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }],
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .home {
        display: flex;
        flex-direction: column;
    }

    .breadcrumb-items {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 12px;
        margin-bottom: 1rem;
        border-radius: 3px;
    }

    .breadcrumb-items span {
        line-height: 1.5;
        color: #666666;
    }

    .breadcrumb-items span:first-child {
        margin-bottom: 2.8px;
    }

    .breadcrumb {
        background-color: #fff;
        margin-bottom: 0;
        padding: 0;
        margin-left: 12px;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
