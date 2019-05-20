module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveClass = async (req, res) => {
        const classroom = { ...req.body }
        if(req.params.id) classroom.id = req.params.id

        try {
            existsOrError(classroom.name, 'Nome da turma não informada')
            existsOrError(classroom.course_id, 'Curso não informado')
            existsOrError(classroom.school_year_id, 'Ano escolar não informado')
            existsOrError(classroom.start_date, 'Data de início não informada')
            existsOrError(classroom.end_date, 'Data do fim não informada')

            const classroomFromDB = await app.db('classes')
                .where({ name: classroom.name }).first()
            
            const courseIdFromDB = await app.db('classes')
                .where({ course_id: classroom.course_id })

            if(!classroom.id && courseIdFromDB && classroomFromDB) {
                notExistsOrError(classroomFromDB, 'Turma já cadastrada')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(classroom.id) {
            app.db('classes')
                .update(classroom)
                .where({ id: classroom.id})
                // status 204: ocorreu tudo certo
                .then(_=> res.status(204).send())
                // caso ocorra algum erro cai no catch
                .catch(err => res.status(500).send(err))
        } else {
            app.db('classes')
                .insert(classroom)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // medoto remover
    const remove = async (req, res) => {
        try {
            // verifica se o resultado exclusão gerou uma quantidade de linhas excluídas
            const rowsDeleted = await app.db('classes')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Turma não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 7 
    // método listar turmas
    const getClasses = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('classes').count('id').first()
        const count = parseInt(result.count)

        app.db('classes AS cl')
            .select('cl.id', 'cl.name', 'cl.start_date', 'cl.end_date', 'co.name As name_course', 'sy.year AS school_year')
            .innerJoin('courses AS co', 'cl.course_id', '=', 'co.id')
            .innerJoin('school_year AS sy', 'cl.school_year_id', '=', 'sy.id')
            .orderBy('cl.id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(classrooms => res.json({data: classrooms, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // listar turma por id
    const getClassById = (req, res) => {
        app.db('classes')
            .select('id', 'name', 'course_id', 'school_year_id', 'start_date', 'end_date')
            .where({ id: req.params.id })
            .first()
            .then(classroom => res.json(classroom))
            .catch(err => res.status(500).send(err))
    }

    // listar turma com informações de 3 tabelas(join)
    const getClassRoomById = (req, res) => {
        app.db('classes AS cl')
            .select('cl.id', 'cl.name', 'cl.start_date', 'cl.end_date', 'co.name As name_course', 'sy.year AS school_year')
            .innerJoin('courses AS co', 'cl.course_id', '=', 'co.id')
            .innerJoin('school_year AS sy', 'cl.school_year_id', '=', 'sy.id')
            .where('cl.id', req.params.id )
            .first()
            .then(classroom => res.json(classroom))
            .catch(err => res.status(500).send(err))
    }

    // método filtragem
    const filterClasses = (req, res) => {
        app.db('*')
            .select('name')
            .then(classes => res.json(classes))
            .catch(err => res.status(500).send(err))
    }

    return { saveClass, remove, getClasses, getClassById, getClassRoomById, filterClasses }
}