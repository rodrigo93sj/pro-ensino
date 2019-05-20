module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation
    // método de inserir e atualizar
    const saveStudent = async (req, res) => {
        const userStudent = { ...req.body }
        if(req.params.id) userStudent.id = req.params.id

        try {
            existsOrError(userStudent.name, 'Nome não informado')
            existsOrError(userStudent.email, 'E-mail não informado')
            existsOrError(userStudent.phone, 'Telefone não informado')
            existsOrError(userStudent.dt_nasc, 'Data de nascimento não informada')
            existsOrError(userStudent.cpf, 'CPF não informado')
            existsOrError(userStudent.rg, 'RG não informado')

            const userStudentFromDB = await app.db('students')
                .where({ email: userStudent.email }).first()

            if(!userStudent.id) {
                notExistsOrError(userStudentFromDB, 'Aluno já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(userStudent.id) {
            app.db('students')
                .update(userStudent)
                .where({ id: userStudent.id})
                // status 204: ocorreu tudo certo
                .then(_=> res.status(204).send())
                // caso ocorra algum erro cai no catch
                .catch(err => res.status(500).send(err))
        } else {
            app.db('students')
                .insert(userStudent)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // removendo alunos
    const removeStudent = async (req, res) => {
        try {
            const rowsDeleted = await app.db('students')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Aluno não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // método listar estudantes
    const limit  = 7 // numero de registro por página
    const getStudents = async (req, res) => {
        // atributo que seta a página. caso o atributo não estiver setado, exibi a página 1 com valor padrão
        const page = req.query.page || 1

        // verificar quantod tegistro tem na base de dados
        const result = await app.db('students').count('id').first()

        const count = parseInt(result.count)

        app.db('students')
            .select('id', 'name', 'email', 'phone', 'dt_nasc')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(students => res.json({ data: students, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // listar estudantes por id
    const getStudentsById = (req, res) => {
        app.db('students')
            .select('id', 'name', 'email', 'phone', 'dt_nasc', 'cpf', 'rg')
            .where({ id: req.params.id })
            .first()
            .then(student => res.json(student))
            .catch(err => res.status(500).send(err))
    }

    // método filtragem
    const filterStudents = (req, res) => {
        app.db('students')
            .select('name')
            .then(students => res.json(students))
            .catch(err => res.status(500).send(err))
    }

    return { saveStudent, removeStudent, getStudents, getStudentsById, filterStudents }
}