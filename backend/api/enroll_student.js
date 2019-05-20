module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const saveEnrollStudent = async (req, res) => {
        const enrollStudent = { ...req.body }
        if(req.params.id) enrollStudent.id = req.params.id

        try {
            existsOrError(enrollStudent.student_id, 'Aluno não informado')
            existsOrError(enrollStudent.course_id, 'Curso não informado')
            existsOrError(enrollStudent.class_id, 'Classe não informada')

            const enrollStudentFromDB = await app.db('enroll_student')
                .where({ student_id: enrollStudent.student_id }).first()

            if(!enrollStudent.id) {
                notExistsOrError(enrollStudentFromDB, 'Aluno já matriculado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(enrollStudent.id) {
            app.db('enroll_student')
                .update(enrollStudent)
                .where({ id: enrollStudent.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('enroll_student')
                .insert(enrollStudent)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('enroll_student')
                .where({ id: req.params.id }).del()

            existsOrError(rowsDeleted, 'Matrícula não encontrada.')
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    // listar alunos matriculados
    const limit = 10
    const getEnrollStudents = async (req, res) => {
        const page = req.params.page
        const result = await app.db('enroll_student').count('id').first()
        const count = parseInt(result.count)

        app.db('enroll_student')
            .select('id', 'student_id', 'class_id', 'created_at', 'status')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(enrollStudents => res.json({data: enrollStudents, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    // listar matricula de aluno por id
    const getEnrollStudentById = (req, res) => {
        app.db('enroll_student')
            .select('id', 'student_id', 'course_id', 'class_id', 'created_at', 'status')
            .where({ id: req.params.id })
            .first()
            .then(enrollStudent => res.json(enrollStudent))
            .catch(err => res.status(500).send(err))
    }

    return { saveEnrollStudent, remove, getEnrollStudents, getEnrollStudentById }
}