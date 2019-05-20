// arquivo que ejeta um seccess ou err e redireciona o usuário para tela de login quando o token é expirado
import axios from 'axios'

const success = res => res
const error = err => {
    if(401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)