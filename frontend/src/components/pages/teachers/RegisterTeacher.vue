<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Cadastrar Professor</h2>
                <router-link tag="li" class="to-back" to="/teachers">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Nome:" label-for="teacher-name">
                            <b-form-input type="text" id="teacher-name"
                                v-model="teacher.name"
                                placeholder="Nome"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="E-mail:" label-for="teacher-email">
                            <b-form-input type="email" id="teacher-name"
                                v-model="teacher.email"
                                placeholder="E-mail"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Telefone:" label-for="teacher-phone">
                            <b-form-input type="text" id="teacher-phone"
                                v-model="teacher.phone"
                                placeholder="(99) 9999-9999"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <div class="card-btns">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button @click="reset">Apagar</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "registerTeacher",
    data: function() {
        return {
             items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Professores',
                to: '/teachers'
            }, {
                text: 'Cadastrar Professor',
                active: true
            }],
            teacher: {}
        }
    },
    methods: {
        reset() {
            this.teacher = {}
        },
        save() {
            const id = ''
            axios.post(`${baseApiUrl}/teachers/${id}`, this.teacher)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    }
}
</script>

<style>

</style>
