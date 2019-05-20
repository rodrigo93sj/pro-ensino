<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Lista de Turmas</h2>
                <router-link tag="li" class="card-btn" to="/classes/register">
                    <a>
                        <b-button variant="primary"><i class="fas fa-plus"></i>Cadastrar Turma</b-button>
                    </a>
                </router-link>
            </div>
            <b-table hover striped :items="classes" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <router-link :to="{ name: 'editClass', params: { id: classroom.id }}">
                        <b-button variant="warning" style="padding: 4px 8px;" 
                            v-b-tooltip.hover title="Editar"
                            @click="loadClass(data.item)" 
                            class="mr-2">
                            <i class="fas fa-pencil-alt"></i>
                        </b-button>
                    </router-link>
                    <router-link :to="{ name: 'removeClass', params: { id: classroom.id }}">
                        <b-button variant="danger" style="padding: 4px 8px;" 
                            v-b-tooltip.hover title="Deletar"
                            @click="loadClass(data.item)" 
                            class="mr-2">
                            <i class="fas fa-trash"></i>
                        </b-button>
                    </router-link>
                </template>
            </b-table>
            <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"/>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import moment from 'moment'

export default {
    name: "listClasses",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Turmas',
                active: true
            }],
            classroom: {},
            classes: [],
            // paginação
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Codigo', sortable: true },
                { key: 'name', label: 'Turma', sortable: true },
                { key: 'name_course', label: 'Curso', sortable: true },
                { key: 'school_year', label: 'Ano Letivo ', sortable: true },
                { key: 'start_date', label: 'Início', sortable: true },
                { key: 'end_date', label: 'Fim', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        // carregando lista de estudantes do backend
        loadClasses() {
            const url = `${baseApiUrl}/classes?page=${this.page}`
            axios.get(url).then(res => {
                this.classes = res.data.data
                this.classes = this.classes.map(function(cls) {
                    const newStartDate = new Date(cls.start_date)
                    const newEndDate = new Date(cls.end_date)
                    cls.start_date = `${newStartDate.getDate()}/${newStartDate.getMonth() + 1}/${newStartDate.getFullYear()}`
                    cls.end_date = `${newEndDate.getDate()}/${newEndDate.getMonth() + 1}/${newEndDate.getFullYear()}`
                    return cls
                })
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadClass(classroom) {
            this.classroom = { ...classroom }
        }
    },
    watch: {
        page() {
            this.loadClasses()
        }
    },
    // após carregar o componente a função é chamada
    mounted() {
        this.loadClasses()
    }
}
</script>

<style>

</style>