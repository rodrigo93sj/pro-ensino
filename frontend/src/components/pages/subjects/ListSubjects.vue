<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <div class="main-content">
            <div class="main-content-title">
                <h2 v-if="subject.id && mode === 'save'">Editar Disciplina</h2>
                <h2 v-if="subject.id && mode === 'remove'">Excluir Disciplina</h2>
                <h2 v-if="!subject.id">Cadastrar Disciplina</h2>
            </div>
            <b-form>
                <input id="subject-id" type="hidden" v-model="subject.id"/>
                    <b-row>
                        <b-col md="6" sm="12">
                            <b-form-group label="Nome:" label-for="subject-name">
                                <b-form-input id="subject-name" type="text"
                                    v-model="subject.name" required
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o Nome da Disciplina">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="12">
                            <b-button variant="primary" v-if="mode === 'save'"
                                @click="save">Salvar</b-button>
                            <b-button variant="danger" v-if="mode === 'remove'"
                                @click="modalShow = !modalShow">Excluir</b-button>
                            <b-button class="ml-2" @click="reset" >Cancelar</b-button>

                            <b-modal id="modal-sm" size="sm" title="Confirmação" v-model="modalShow">
                                Você tem certeza que deseja excluir este registro?
                                <div slot="modal-footer" class="w-100">
                                    <b-button variant="danger" @click="remove" style="margin-right: 15px">Sim</b-button>
                                    <b-button data-dismiss="modal" @click="modalShow = !modalShow">Não</b-button>
                                </div>
                            </b-modal>
                        </b-col>
                    </b-row>
            </b-form>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Cursos</h2>
            </div>
            <b-table hover striped :items="subjects" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" style="padding: 4px 8px;" @click="loadSubject(data.item)" 
                        class="mr-2">
                        <i class="fas fa-pencil-alt"></i>
                    </b-button>
                    <b-button variant="danger" style="padding: 4px 8px;" @click="loadSubject(data.item, 'remove')" 
                        class="mr-2">
                        <i class="fas fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
            <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"/>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "listSubjects",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Disciplina',
                active: true
            }],
            mode: 'save',
            subject: {},
            subjects: [],
            modalShow: false,
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Codigo', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadSubjects() {
            const url = `${baseApiUrl}/subjects?page=${this.page}`
            axios.get(url).then(res => {
                this.subjects = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.subject = {}
            this.loadSubjects()
            this.modalShow = false
        },
        save() {
            const method = this.subject.id ? 'put' : 'post'
            const id = this.subject.id ? `${this.subject.id}` : ''
            axios[method](`${baseApiUrl}/subjects/${id}`, this.subject)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.subject.id
            axios.delete(`${baseApiUrl}/subjects/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadSubject(subject, mode = 'save') {
            this.mode = mode
            this.subject = { ...subject }
        }
    },
    mounted() {
        this.loadSubjects()
    }
}
</script>

<style>

</style>