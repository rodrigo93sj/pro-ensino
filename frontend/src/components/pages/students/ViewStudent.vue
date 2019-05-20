<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2 v-if="student.id === undefined">Aluno(a): <span style="color: #dd4b39;">Aluno(a) Não Existe.</span></h2>
                <h2 v-else>Aluno(a): {{ student.name }}</h2>
                <router-link tag="li" class="to-back" to="/students">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <div class="card-student">
                <b-container>
                    <input id="id" type="hidden" v-model="student.id"/>
                    <ul>
                        <li>
                            <span>Nome: </span>
                            <span>{{ student.name }}</span>
                        </li>
                        <li>
                            <span>E-mail:</span>
                            <span>{{ student.email }}</span>
                        </li>
                        <li>
                            <span>Telefone: </span>
                            <span>{{ student.phone }}</span>
                        </li>
                        <li>
                            <span>Data Nascimento: </span>
                            <span>{{ student.dt_nasc }}</span>
                        </li>
                        <li>
                            <span>CPF: </span>
                            <span>{{ student.cpf }}</span>
                        </li>
                        <li>
                            <span>RG: </span>
                            <span>{{ student.rg }}</span>
                        </li>
                    </ul>
                    <div class="card-btns">
                        <b-button variant="danger"
                            @click="modalShow = !modalShow">Excluir</b-button>

                        <b-modal id="modal-sm" size="sm" title="Confirmação" v-model="modalShow">
                            Você tem certeza que deseja excluir este registro?
                            <div slot="modal-footer" class="w-100">
                                <b-button variant="danger" @click="removeStudent">Sim</b-button>
                                <b-button data-dismiss="modal" @click="modalShow = !modalShow">Não</b-button>
                            </div>
                        </b-modal>
                    </div>
                </b-container>
            </div>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'

export default {
    name: "ViewStudent",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Alunos',
                to: '/students'
            }, {
                text: ' Aluno',
                active: true
            }],
            student: {},
            modalShow: false
        }
    },
    methods: {
        reset() {
            this.modalShow = false
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
        removeStudent() {
            const id = this.student.id
            axios.delete(`${baseApiUrl}/students/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
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
.card-student {
    display: flex;
    flex-direction: column;
}

.card-student li {
    list-style: none;
    color: #666666;
    margin-bottom: 10px;
}

card-student li span:last-child

.card-student li span:last-child {
    margin-left: 10px;
}
</style>
