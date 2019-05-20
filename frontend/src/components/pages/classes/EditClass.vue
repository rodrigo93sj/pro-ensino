<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Editar Turma</h2>
                <router-link tag="li" class="to-back" to="/classes">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <input id="id" type="hidden" v-model="classroom.id"/>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Nome da Tuma:" label-for="classroom-name">
                                <b-form-input v-model="classroom.name" type="text" 
                                    id="classroom-name"
                                    placeholder="Nome da Turma"
                                    required>
                                </b-form-input>
                            </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="Curso:" label-for="classroom-course">
                            <v-select v-model="classroom.course_id" :options="courses" label="name"
                                id="classroom-course"
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
                                id="class-schoolYear"
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
                    <b-button variant="primary" @click="updateClass">Salvar</b-button>
                    <b-button @click="reset">Apagar</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'

export default {
    name: "editClass",
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
            classroom: {},
            courses: [],
            schoolyear: [],

            options: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
            }
        }
    },
    methods: {
        reset() {
            this.classroom = {}
            this.courses = {}
        },
        getClass() {
            const id = `/${this.$route.params.id}`
            const url = `${baseApiUrl}/classes${id}`
            axios.get(url).then(res => {
                this.classroom = res.data
                this.classroom.start_date = moment(this.classroom.start_date, 'YYYY/MM/DD').format('DD/MM/YYYY')
                this.classroom.end_date = moment(this.classroom.end_date, 'YYYY/MM/DD').format('DD/MM/YYYY')
            })
        },
        loadCourses() {
            const url = `${baseApiUrl}/filtercourses`
            axios.get(url).then(res => {
                this.courses = res.data
            })
        },
        loadSchoolYear() {
            const url = `${baseApiUrl}/filtershoolyears`
            axios.get(url).then(res => {
                this.schoolyear = res.data
            })
        },
        updateClass() {
            const id = `${this.classroom.id}`
            axios.put(`${baseApiUrl}/classes/${id}`, this.classroom)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.getClass()
        this.loadCourses()
        this.loadSchoolYear()
    }
}
</script>

<style>

</style>
