<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Nova Matrícula</h2>
                <router-link tag="li" class="to-back" to="/enrollments">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome do Aluno:" label-for="student-name">
                        <v-select :options="students" label="name"></v-select>
                    </b-form-group>

                    <b-form-group label="Nome do Curso" label-for="student-email">
                            <v-select :options="courses" label="name"></v-select>
                    </b-form-group>

                    <b-form-group label="Nome da Turma:" label-for="student-phone">
                            <v-select :options="classes" label="name"></v-select>
                    </b-form-group>

                    <b-form-group label="Date de Criação" label-for="student-dt_nasc">
                        <b-form-input type="date" id="student-dt_nasc"
                            required>
                        </b-form-input>
                    </b-form-group>
                </b-col>

                <div class="card-btns">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button type="reset" variant="danger">Cancelar</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import vSelect from 'vue-select'

export default {
    name: "newEnrollment",
    components: { vSelect },
    data: function() {
        return {
             items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Matrículas',
                to: '/enrollments'
            }, {
                text: 'Nova Matrícula',
                active: true
            }],
            enrollment: {},
            students: [],
            courses: [],
            classes: []
        }
    },
    methods: {
        reset() {
            this.enrollment = {}
        },
        // método para filtrar alunos
        loadStudents() {
            const url = `${baseApiUrl}/filterstudents`
            axios.get(url).then(res => {
                this.students = res.data
            })
        },
        // método para filtrar cursos
        loadCourses() {
            const url = `${baseApiUrl}/filtercourses`
            axios.get(url).then(res => {
                this.courses = res.data
            })
        },
        // método para filtrar turmas
        loadclasses() {
            const url = `${baseApiUrl}/filterclasses`
            axios.get(url).then(res => {
                this.classes = res.data
            })
        },
        save() {
            const id = ''
            axios.post(`${baseApiUrl}/enrollstudents${id}`, this.enrollment)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadStudents()
        this.loadCourses()
        this.loadclasses()
    }
}
</script>

<style>

</style>
