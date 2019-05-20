<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Nova Turma</h2>
                <router-link tag="li" class="to-back" to="/classes">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Nome da Tuma:" label-for="classroom-name">
                                <b-form-input type="text" id="classroom-name"
                                    v-model="classroom.name"
                                    placeholder="Nome"
                                    required>
                                </b-form-input>
                            </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="Curso:" label-for="classroom-course">
                            <v-select v-model="classroom.course_id" :options="courses" label="name"
                                index="id"
                                placeholder="Selecione o Curso"
                                required>
                            </v-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Ano Letivo:" label-for="class-schoolYear">
                            <v-select v-model="classroom.school_year_id" :options="schoolyear" label="year"
                                index="id"
                                placeholder="Selecione o Ano"
                                required></v-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="Data de Início:" label-for="classroom-startDate">
                            <date-picker v-model="classroom.start_date" :config="options" 
                                id="classroom-startDate"
                                placeholder="dd/mm/aaaa"
                                required>
                            </date-picker>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Data do Fim:" label-for="classroom-endDate">
                            <date-picker v-model="classroom.end_date" :config="options" 
                                id="classroom-endDate"
                                placeholder="dd/mm/aaaa"
                                required>
                            </date-picker>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div class="card-btns">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button type="reset">Cancelar</b-button>
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
                text: 'Turmas',
                to: '/classes'
            }, {
                text: 'Nova Turma',
                active: true
            }],
            courses: [],
            schoolyear: [],
            classroom: {},

            options: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
            }
        }
    },
    methods: {
        reset() {
            this.classroom = {}
        },
        // método para filtrar cursos
        loadCourses() {
            const url = `${baseApiUrl}/filtercourses`
            axios.get(url).then(res => {
                this.courses = res.data
            })
        },
        // método para filtrar ano letivo
        loadSchoolYear() {
            const url = `${baseApiUrl}/filtershoolyears`
            axios.get(url).then(res => {
                this.schoolyear = res.data
            })
        },
        save() {
            const id = ''
            axios.post(`${baseApiUrl}/classes${id}`, this.classroom)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadCourses()
        this.loadSchoolYear()
    }
}
</script>

<style>

</style>
