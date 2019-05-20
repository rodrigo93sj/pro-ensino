module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    
    // metodo salvar e atualizar cursos
    const saveCourse = async (req, res) => {
        const course = { ...req.body }
        if(req.params.id) course.id = req.params.id

        try {
            existsOrError(course.name, 'Nome do curso não informado')

            const courseFromDB = await app.db('courses')
                .where({ name: course.name }).first()
            
            if(!course.id) {
                notExistsOrError(courseFromDB, 'Curso já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(course.id) {
            app.db('courses')
                .update(course)
                .where({ id: course.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('courses')
                .insert(course)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // removendo cursos
    const removeCourse = async (req, res) => {
        try {
            const rowsDeleted = await app.db('courses')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Curso não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // metodo listar cursos
    const limit = 7
    const getCourses = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('courses').count('id').first()
        const count = parseInt(result.count)
        app.db('courses')
            .limit(limit).offset(page * limit - limit)
            .select('*')
            .orderBy('id', 'desc')
            .then(courses=> res.json({ data: courses, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // listar curso por id
    const getCourseById = async (req, res) => {
        app.db('courses')
            .select('id', 'name')
            .where({ id: req.params.id })
            .first()
            .then(course => res.json(course))
            .catch(err => res.status(500).send(err))
    }

    // método filtragem
    const filterCourses = (req, res) => {
        app.db('courses')
            .select('*')
            .then(courses => res.json(courses))
            .catch(err => res.status(500).send(err))
    }
    
    return { saveCourse, removeCourse, getCourses, getCourseById, filterCourses }
}