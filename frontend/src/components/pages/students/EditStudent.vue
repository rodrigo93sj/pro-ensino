<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Editar Aluno(a)</h2>
                <router-link tag="li" class="to-back" to="/students">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <b-container>
                    <input id="id" type="hidden" v-model="student.id"/>
                    <b-row>
                        <b-col>
                            <b-form-group label="Nome:" label-for="student-name">
                                <b-form-input type="text" id="student-name"
                                    v-model="student.name"
                                    placeholder="Nome"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="E-mail:" label-for="student-email">
                                <b-form-input type="email" id="student-email"
                                    v-model="student.email"
                                    placeholder="E-mail"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group label="Telefone:" label-for="student-phone">
                                <b-form-input type="tel" id="student-phone"
                                    v-model="student.phone"
                                    placeholder="(99) 9999-9999"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="Data de Nascimento:" label-for="student-dt_nasc">
                                <date-picker :config="options" id="student-dt_nasc"
                                    v-model="student.dt_nasc"
                                    placeholder="dd/mm/aaaa"
                                    required>
                                </date-picker>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col>
                            <b-form-group label="CPF:" label-for="student-cpf">
                                <b-form-input type="text" id="student-cpf"
                                    v-model="student.cpf"
                                    placeholder="000.000.000-00"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="RG:" label-for="student-rg">
                                <b-form-input type="text" id="student-rg"
                                    v-model="student.rg"
                                    placeholder="RG"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>
                
                <div class="card-btns">
                    <b-button variant="primary"
                        @click="updateStudent">Salvar</b-button>
                    <b-button type="reset">Apagar</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'

export default {
    name: "EditStudent",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Alunos',
                to: '/students'
            }, {
                text: 'Editar Aluno',
                active: true
            }],
            student: {},

            options: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
            }
        }
    },
    methods: {
        reset() {
            this.student = {}
        },
        getStudent() {
            const id = `/${this.$route.params.id}`
            const url = `${baseApiUrl}/students${id}`
            axios.get(url).then(res => {
                this.student = res.data
                this.student.dt_nasc = moment(this.student.dt_nasc, 'YYYY/MM/DD').format('DD/MM/YYYY')
            })
        },
        updateStudent() {
            const id = `${this.student.id}`
            axios.put(`${baseApiUrl}/students/${id}`, this.student)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.getStudent()
    }
}
</script>

<style>

</style>
