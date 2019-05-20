<template>
    <div class="main-students">
        <div class="breadcrumb-items">
            <span class="fa fa-home"></span>
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <b-card>
            <div class="card-title">
                <h2>Cadastrar Aluno(a)</h2>
                <router-link tag="li" class="to-back" to="/students">
                    <a>
                        <b-link href="#foo">Voltar</b-link>
                    </a>
                </router-link>
            </div>
            <b-form>
                <b-row>
                    <b-col xs="12">
                        <b-form-group label="Nome:" label-for="student-name">
                            <b-form-input type="text" id="student-name"
                                v-model="student.name"
                                required
                                placeholder="Nome">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col xs="12">
                        <b-form-group label="E-mail:" label-for="student-email">
                            <b-form-input type="email" id="student-email"
                                v-model="student.email"
                                required
                                placeholder="E-mail">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group label="Telefone:" label-for="student-phone">
                            <b-form-input type="text" id="student-phone"
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

export default {
    name: "RegisterStudent",
    data: function() {
        return {
             items: [{
                text: 'Início',
                to: '/'
            }, {
                text: 'Alunos',
                to: '/students'
            }, {
                text: 'Cadastrar Aluno',
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
        // redirect() {
        //     setTimeout(function(){
        //         this.$router.push({ path: '/students' })
        //     }, 3000)
        // },
        
        // salvar estudantes
        save() {
            const id = ''
            axios.post(`${baseApiUrl}/students${id}`, this.student)
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
    .card label {
        color: #666666;
    }

    .card-btns {
        display: flex;
        margin-top: 30px;
    }

    .to-back {
        list-style-type: none;
        display: flex;
        align-content: center;
        align-items: center;
        line-height: 1.5rem;
        padding: 6px 12px;
    }

    .card-btns button {
        margin-right: 10px;
    }

</style>
