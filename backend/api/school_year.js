module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveSchoolYear = async (req, res) => {
        const schoolYear = { ...req.body }
        if(req.params.id) schoolYear.id = req.params.id

        try {
            existsOrError(schoolYear.name, 'Nome do ano não informado')
            existsOrError(schoolYear.year, 'Ano não informado')

            const schoolYearFromDB = await app.db('school_year')
                .where({ year: schoolYear.year})

            if(!schoolYear.id) {
                notExistsOrError(schoolYearFromDB, 'Ano já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(schoolYear.id) {
            app.db('school_year')
                .update(schoolYear)
                .where({ id: schoolYear.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('school_year')
                .insert(schoolYear)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // metodo listar anos escolares
    const limit = 7
    const getSchoolYears = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('school_year').count('id').first()
        const count = parseInt(result.count)

        app.db('school_year')
            .select('id', 'name', 'year')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(school_years=> res.json({ data: school_years, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // medoto remover
    const remove = async (req, res) => {
        try {
            // verifica se o resultado exclusão gerou uma quantidade de linhas excluídas
            const rowsDeleted = await app.db('school_year')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Ano não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // listar ano escolar por id
    const getSchoolYearById = async (req, res) => {
        app.db('school_year')
            .select('id', 'name', 'year')
            .where({ id: req.params.id })
            .first()
            .then(school_year => res.json(school_year))
            .catch(err => res.status(500).send(err))
    }

    // método filtragem
    const filterSchoolYear = (req, res) => {
        app.db('school_year')
            .select('id', 'year')
            .then(school_year => res.json(school_year))
            .catch(err => res.status(500).send(err))
    }

    return { saveSchoolYear, remove, getSchoolYears, getSchoolYearById, filterSchoolYear }
}