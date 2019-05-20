module.exports = middleware => { // espera-se receber uma função no middleware
    return (req, res, next) => {
        // se req.user.admin for true , chama o middleware
        if(req.user.admin) {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}