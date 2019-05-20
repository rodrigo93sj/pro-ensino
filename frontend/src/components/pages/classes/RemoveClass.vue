<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Excluir Turma</h2>
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
                        <b-form-group label="Turma:">
                            <b-form-input type="text" v-model="classroom.name"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="Curso:">
                            <b-form-input type="text" v-model="classroom.name_course"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Ano Letivo:">
                            <b-form-input type="text" v-model="classroom.school_year"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="Data de Início:">
                            <b-form-input type="text" v-model="classroom.start_date"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Data do Fim:">
                            <b-form-input type="text" v-model="classroom.end_date"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <b-row>
                    <b-col md="12">
                        <div class="card-btns">
                            <b-button variant="danger"
                                @click="modalShow = !modalShow">
                                Excluir
                            </b-button>

                            <b-modal id="modal-sm" size="sm" title="Confirmação" v-model="modalShow">
                                Você tem certeza que deseja excluir este registro?
                                <div slot="modal-footer" class="w-100">
                                    <b-button variant="danger" @click="removeClass">Sim</b-button>
                                    <b-button data-dismiss="modal" @click="modalShow = !modalShow">Não</b-button>
                                </div>
                            </b-modal>
                        </div>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>

    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'

export default {
    name: "removeClass",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Alunos',
                to: '/classes'
            }, {
                text: 'Excluir Turma',
                active: true
            }],
            classroom: {},
            courses: [],
            schoolyear: [],
            modalShow: false
        }
    },
    methods: {
        getClass() {
            const id = `/${this.$route.params.id}`
            const url = `${baseApiUrl}/classroom${id}`
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
        removeClass() {
            const id = this.classroom.id
            axios.delete(`${baseApiUrl}/classes/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.modalShow = false
                    this.classroom = {}
                    this.courses = {}
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
    .w-100 {
        display: flex;
        justify-content: flex-end;
    }
</style>
