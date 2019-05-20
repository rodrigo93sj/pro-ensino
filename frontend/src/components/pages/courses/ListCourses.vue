<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <div class="main-content">
            <div class="main-content-title">
                <h2 v-if="course.id && mode === 'save'">Editar Curso</h2>
                <h2 v-if="course.id && mode === 'remove'">Excluir Curso</h2>
                <h2 v-if="!course.id">Cadastrar Curso</h2>
            </div>
            <b-form>
                <input id="user-id" type="hidden" v-model="course.id"/>
                    <b-row>
                        <b-col md="6" sm="12">
                            <b-form-group label="Nome:" label-for="course-name">
                                <b-form-input id="course-name" type="text"
                                    v-model="course.name" required
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o Nome do Curso">
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
                            <b-button class="ml-2" @click="reset">Cancelar</b-button>

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
            <b-table hover striped :items="courses" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" style="padding: 4px 8px;" @click="loadCourse(data.item)" 
                        class="mr-2">
                        <i class="fas fa-pencil-alt"></i>
                    </b-button>
                    <b-button variant="danger" style="padding: 4px 8px;" @click="loadCourse(data.item, 'remove')" 
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
    name: "listCourses",
    data: function() {
        return {
            items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Cursos',
                active: true
            }],
            mode: 'save',
            course: {},
            courses: [],
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
        // carregando lista de estudantes do backend
        loadCourses() {
            const url = `${baseApiUrl}/courses?page=${this.page}`
            axios.get(url).then(res => {
                this.courses = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.course = {}
            this.loadCourses()
            this.modalShow = false
        },
        save() {
            const method = this.course.id ? 'put' : 'post'
            const id = this.course.id ? `${this.course.id}` : ''
            axios[method](`${baseApiUrl}/courses/${id}`, this.course)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.course.id
            axios.delete(`${baseApiUrl}/courses/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCourse(course, mode = 'save') {
            this.mode = mode
            this.course = { ...course }
        }
    },
    mounted() {
        this.loadCourses()
    }
}
</script>

<style>
    .main-content {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 1rem;
        border-radius: 3px;
    }

    .main-content-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .main-content-title h2 {
        color: #666666;
        font-size: 1.6rem;
    }
</style>