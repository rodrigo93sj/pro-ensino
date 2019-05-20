<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Excluir Professor(a)</h2>
                <router-link tag="li" class="to-back" to="/teachers">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <input id="id" type="hidden" v-model="teacher.id"/>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Nome:" label-for="teacher-name">
                            <b-form-input type="text" id="teacher-name"
                                v-model="teacher.name"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="E-mail:" label-for="teacher-email">
                            <b-form-input type="email" id="teacher-name"
                                v-model="teacher.email"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Telefone:" label-for="teacher-phone">
                            <b-form-input type="text" id="teacher-phone"
                                v-model="teacher.phone"
                                :readonly="true">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <div class="card-btns">
                    <b-button variant="danger"
                        @click="modalShow = !modalShow">
                        Excluir
                    </b-button>

                    <b-modal id="modal-sm" size="sm" title="Confirmação" v-model="modalShow">
                        Você tem certeza que deseja excluir este registro?
                        <div slot="modal-footer" class="w-100">
                            <b-button variant="danger" @click="removeTeacher">Sim</b-button>
                            <b-button data-dismiss="modal" @click="modalShow = !modalShow">Não</b-button>
                        </div>
                    </b-modal>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "removeTeacher",
    data: function() {
        return {
             items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Professores',
                to: '/teachers'
            }, {
                text: 'Excluir Professor(a)',
                active: true
            }],
            teacher: {},
            modalShow: false
        }
    },
    methods: {
        reset() {
            this.teacher = {}
        },
        getTeacher() {
            const id = `/${this.$route.params.id}`
            const url = `${baseApiUrl}/teachers${id}`
            axios.get(url).then(res => {
                this.teacher = res.data
            })
        },
        removeTeacher() {
            const id = this.teacher.id
            axios.delete(`${baseApiUrl}/teachers/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.modalShow = false
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.getTeacher()
    }
}
</script>

<style>

</style>
