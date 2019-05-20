module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    
    const saveTeacher = async (req, res) => {
        const userTeacher = { ...req.body }
        if(req.params.id) userTeacher.id = req.params.id

        try {
            existsOrError(userTeacher.name, 'Nome do professor não informado')
            existsOrError(userTeacher.email, 'Email do professor não informado')
            existsOrError(userTeacher.phone, 'Telefone do professor não informado')

            const userTeacherFromDB = await app.db('teachers')
                .where({ email: userTeacher.email}).first()
            
            if(!userTeacher.id) {
                notExistsOrError(userTeacherFromDB, 'Professor já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(userTeacher.id) {
            app.db('teachers')
                .update(userTeacher)
                .where({ id: userTeacher.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('teachers')
                .insert(userTeacher)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const limit = 7
    // método listar professores
    const getTeachers = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('teachers').count('id').first()
        const count = parseInt(result.count)

        app.db('teachers')
            .select('id', 'name', 'email', 'phone' )
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(teachers => res.json({ data: teachers, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            // verifica se o resultado exclusão gerou uma quantidade de linhas excluídas
            const rowsDeleted = await app.db('teachers')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Professor não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // listar por id
    const getTeacherById = (req, res) => {
        app.db('teachers')
            .select('id', 'name', 'email', 'phone')
            .where({ id: req.params.id })
            .first()
            .then(teacher => res.json(teacher))
            .catch(err => res.status(500).send(err))
    }

    return { saveTeacher, getTeachers, remove, getTeacherById }
}