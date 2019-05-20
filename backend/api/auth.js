const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // método de autenticação
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        // comparando a senha
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        // criando uma data de geração e expiração do 
        // capturando a data atual
        const now = Math.floor(Date.now() / 1000)

        // conteúdo do token jwt
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            // data que o token foi emitido
            iat: now,
            // data de expiração do token
            exp: now + (60 * 60 * 24 * 3)
        }

        // gerando o token
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    // validando o token
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                // decodificando o token
                const token = jwt.decode(userData.token, authSecret)
                // se a data de expiração do token for maior que a atual
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}