module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveSubject = async (req, res) => {
        const subject = { ...req.body }
        if(req.params.id) subject.id = req.params.id

        try {
            existsOrError(subject.name, 'Nome da disciplina não informada')

            const subjectFromDB = await app.db('subjects')
                .where({ name: subject.name})

            if(!subject.id) {
                notExistsOrError(subjectFromDB, 'Disciplina já cadastrada')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(subject.id) {
            app.db('subjects')
                .update(subject)
                .where({ id: subject.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('subjects')
                .insert(subject)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            // verifica se o resultado exclusão gerou uma quantidade de linhas excluídas
            const rowsDeleted = await app.db('subjects')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Disciplina não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 7
    // metodo listar disciplnas
    const getSubjects = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('subjects').count('id').first()
        const count = parseInt(result.count)

        app.db('subjects')
            .select('*')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(subjects=> res.json({ data: subjects, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // listar disciplina por id
    const getSubjectById = async (req, res) => {
        app.db('subjects')
            .select('id', 'name')
            .where({ id: req.params.id })
            .first()
            .then(subject => res.json(subject))
            .catch(err => res.status(500).send(err))
    }

    return { saveSubject, remove, getSubjects, getSubjectById }
}