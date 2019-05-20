const axios = require('axios')

module.exports = app => {
    const Stat = async (req, res) => {
        const studentCount = await app.db('students').count('id').first()
        const courseCount = await app.db('courses').count('id').first()
        const classesCount = await app.db('classes').count('id').first()
        const teachersCount = await app.db('teachers').count('id').first()

        const students = parseInt(studentCount.count)
        const courses = parseInt(courseCount.count)
        const classes = parseInt(classesCount.count)
        const teachers = parseInt(teachersCount.count)

        const result = { students, courses, classes, teachers }

        const defaultStat = {
            students: 0,
            courses: 0,
            classes: 0,
            teachers: 0
        }

        try {
            res.json(result || defaultStat)
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { Stat }
}