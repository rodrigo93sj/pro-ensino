module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveSchoolPeriod = async (req, res) => {
        const schoolPeriod = { ...req.body }
        if(req.params.id) schoolPeriod.id = req.params.id

        try {
            existsOrError(schoolPeriod.name, 'Nome do período escolar não informado')
            existsOrError(schoolPeriod.school_year_id, 'Ano escolar não informado')

            const schoolPeriodFromDB = await app.db('school_period')
                .where({ name: schoolPeriod.name }).first()

            if(!schoolPeriod.id) {
                notExistsOrError(schoolPeriodFromDB, 'Nome do período escolar já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(schoolPeriod.id) {
            app.db('school_period')
                .update(schoolPeriod)
                .where({ id: schoolPeriod.id})
                // status 204: ocorreu tudo certo
                .then(_=> res.status(204).send())
                // caso ocorra algum erro cai no catch
                .catch(err => res.status(500).send(err))
        } else {
            app.db('school_period')
                .insert(schoolPeriod)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // medoto remover
    const remove = async (req, res) => {
        try {
            // verifica se o resultado exclusão gerou uma quantidade de linhas excluídas
            const rowsDeleted = await app.db('school_period')
                .where({ id: req.params.id }).del()
            
            existsOrError(rowsDeleted, 'Período escolar não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const limit = 10 
    // método listar turmas
    const getSchoolPeriods = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('school_period').count('id').first()
        const count = parseInt(result.count)

        app.db('school_period')
            .select('id', 'name', 'school_year_id')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(schoolperiods => res.json({data: schoolperiods, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // listar turma por id
    const getSchoolPeriodById = (req, res) => {
        app.db('school_period')
            .select('id', 'name', 'school_year_id')
            .where({ id: req.params.id })
            .first()
            .then(schoolperiod => res.json(schoolperiod))
            .catch(err => res.status(500).send(err))
    }

    return { saveSchoolPeriod, remove, getSchoolPeriods, getSchoolPeriodById }
}