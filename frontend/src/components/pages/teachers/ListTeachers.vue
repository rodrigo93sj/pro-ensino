<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Lista de Professores</h2>
                <router-link tag="li" class="card-btn" to="/teachers/register">
                    <a>
                        <b-button variant="primary"><i class="fas fa-plus"></i>Cadastrar Professor</b-button>
                    </a>
                </router-link>
            </div>
            <b-table hover striped :items="teachers" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <router-link :to="{ name: 'editTeacher', params: { id: teacher.id }}">
                        <b-button variant="warning" style="padding: 4px 8px;" 
                            v-b-tooltip.hover title="Editar"
                            @click="loadTeacher(data.item)" 
                            class="mr-2">
                            <i class="fas fa-pencil-alt"></i>
                        </b-button>
                    </router-link>
                    <router-link :to="{ name: 'removeTeacher', params: { id: teacher.id }}">
                        <b-button variant="danger" style="padding: 4px 8px;" 
                            v-b-tooltip.hover title="Deletar"
                            @click="loadTeacher(data.item)" 
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
    name: "listTeachers",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Professores',
                active: true
            }],
            teacher: {},
            teachers: [],
            // paginação
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Codigo', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'phone', label: 'Telefone', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        // carregando lista de estudantes do backend
        loadTeachers() {
            const url = `${baseApiUrl}/teachers?page=${this.page}`
            axios.get(url).then(res => {
                this.teachers = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadTeacher(teacher) {
            this.teacher = { ...teacher }
        }
    },
    watch: {
        page() {
            this.loadTeachers()
        }
    },
    mounted() {
        this.loadTeachers()
    }
}
</script>

<style>

</style>