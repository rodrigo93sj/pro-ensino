module.exports = app => {
    const { existsOrError } = app.api.validation

    const saveClassSubject = (req, res) => {
        const classSubject = { 
            class_id: req.body.class_id,
            subject_id: req.body.subject_id,
            teacher_id: req.body.teacher_id
        }

        try {
            existsOrError(classSubject.class_id, 'Turma não informada.')
            existsOrError(classSubject.subject_id, 'Disciplina não informada.')
            existsOrError(classSubject.teacher_id, 'Professor não informado')

        } catch(msg) {
            res.status(400).send(msg)
        }

        app.db('class_subjects')
            .insert(classSubject)
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))

        // if(classSubject.class_id) {
        //     app.db('class_subjects')
        //         .update(classSubject)
        //         .where({ class_id: classSubject.class_id})
        //         // status 204: ocorreu tudo certo
        //         .then(_=> res.status(204).send())
        //         // caso ocorra algum erro cai no catch
        //         .catch(err => res.status(500).send(err))
        // } else {
        //     app.db('class_subjects')
        //         .insert(classSubject)
        //         .then(_=> res.status(204).send())
        //         .catch(err => res.status(500).send(err))
        // }
    }

    // metodo remove
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('class_subjects')
                .where({ 
                    class_id: req.params.classId,
                    subject_id: req.params.subjectId,
                    teacher_id: req.params.teacherId 
                }).del()
            
            existOrError(rowsDeleted, 'Erro ao excluir linha.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const limit = 10 
    // método listar turmas
    const getClassSubjects = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('class_subjects').count('class_id').first()
        const count = parseInt(result.count)

        app.db('class_subjects')
            .select('class_id', 'subject_id', 'teacher_id')
            .limit(limit).offset(page * limit - limit)
            .then(classSubjects => res.json({data: classSubjects, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    return { saveClassSubject, remove, getClassSubjects }
}