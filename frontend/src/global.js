// url base para fazer as requisições
import Vue from 'vue'

export const baseApiUrl = 'http://localhost:3000'
export const userKey = '__projetoEscolar_user'

// função que trata as msgs de texto a partir do catch
export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e})
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, userKey, showError}