<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Matrículas</h2>
                <router-link tag="li" class="card-btn" to="/enrollments/new">
                    <a>
                        <b-button variant="primary"><i class="fas fa-plus"></i>Nova Matrícula</b-button>
                    </a>
                </router-link>
            </div>
            <b-table hover striped :items="students" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <router-link :to="{ name: 'viewStudent', params: { id: student.id }}">
                        <b-button variant="success" style="padding: 4px 8px;" @click="loadStudent(data.item)" 
                            class="mr-2">
                            <i class="fas fa-eye"></i>
                        </b-button>
                    </router-link>
                    <router-link :to="{ name: 'editStudent', params: { id: student.id }}">
                        <b-button variant="warning" style="padding: 4px 8px;" @click="loadStudent(data.item)" 
                            class="mr-2">
                            <i class="fas fa-pencil-alt"></i>
                        </b-button>
                    </router-link>
                    <router-link :to="{ name: 'removeStudent', params: { id: student.id }}">
                        <b-button variant="danger" style="padding: 4px 8px;" @click="loadStudent(data.item)" 
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

export default {
    name: "listEnrollments",
    // o atributo 'data' retorna uma função e retorna um objeto
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Matrículas',
                active: true
            }],
            enrollment: {},
            enrollments: [],
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
        loadEnrollments() {
            const url = `${baseApiUrl}/students?page=${this.page}`
            axios.get(url).then(res => {
                this.students = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadStudent(student) {
            this.student = { ...student }
        }
    },
    watch: {
        page() {
            this.loadStudents()
        }
    },
    // após carregar o componente a função é chamada
    mounted() {
        this.loadStudents()
    }
}
</script>

<style>

</style>