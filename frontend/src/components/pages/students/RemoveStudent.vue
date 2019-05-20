<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Excluir Aluno(a)</h2>
                <router-link tag="li" class="to-back" to="/students">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <input id="id" type="hidden" v-model="student.id"/>
                <b-row>
                    <b-col>
                        <b-form-group label="Nome:" label-for="student-name">
                            <b-form-input type="text" id="student-name"
                                v-model="student.name"
                                placeholder="Nome"
                                required
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="E-mail:" label-for="student-email">
                            <b-form-input type="email" id="student-email"
                                v-model="student.email"
                                placeholder="E-mail"
                                required
                                :readonly="true">
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
                                required
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Data de Nascimento:" label-for="student-dt_nasc">
                            <b-form-input type="text" id="student-dt_nasc"
                                v-model="student.dt_nasc"
                                placeholder="dd/mm/aaaa"
                                required
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group label="CPF:" label-for="student-cpf">
                            <b-form-input type="text" id="student-cpf"
                                v-model="student.cpf"
                                required
                                placeholder="000.000.000-00"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="RG:" label-for="student-rg">
                            <b-form-input type="text" id="student-rg"
                                v-model="student.rg"
                                required
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
                                    <b-button variant="danger" @click="removeStudent">Sim</b-button>
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

export default {
    name: "RemoveStudent",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Alunos',
                to: '/students'
            }, {
                text: 'Excluir Aluno',
                active: true
            }],
            student: {},
            modalShow: false
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
                const date = new Date(this.student.dt_nasc)
                this.student.dt_nasc = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            })
        },
        removeStudent() {
            const id = this.student.id
            axios.delete(`${baseApiUrl}/students/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.modalShow = false
                    this.reset()
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
    .w-100 {
        display: flex;
        justify-content: flex-end;
    }
</style>
