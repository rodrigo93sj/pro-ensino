const admin = require('./admin')

module.exports = app => {
    // rota de autenticação
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // rotas para criar, salvar, listar e deletar 
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
    
    app.route('/students')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.student.saveStudent))
        .get(admin(app.api.student.getStudents))

    app.route('/students/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.student.saveStudent))
        .get(admin(app.api.student.getStudentsById))
        .delete(admin(app.api.student.removeStudent))

    app.route('/filterstudents')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.student.filterStudents))
        
    app.route('/courses')
        .all(app.config.passport.authenticate())    
        .get(admin(app.api.course.getCourses))
        .post(admin(app.api.course.saveCourse))

    app.route('/courses/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.course.getCourseById))
        .put(admin(app.api.course.saveCourse))
        .delete(admin(app.api.course.removeCourse))

    app.route('/filtercourses')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.course.filterCourses))
    
    app.route('/teachers')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.teacher.getTeachers))
        .post(admin(app.api.teacher.saveTeacher))
    
    app.route('/teachers/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.teacher.getTeacherById))
        .put(admin(app.api.teacher.saveTeacher))
        .delete(admin(app.api.teacher.remove))

    app.route('/subjects')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.subject.getSubjects))
        .post(admin(app.api.subject.saveSubject))
    
    app.route('/subjects/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.subject.getSubjectById))
        .put(admin(app.api.subject.saveSubject))
        .delete(admin(app.api.subject.remove))

    app.route('/schoolyear')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.school_year.getSchoolYears))
        .post(admin(app.api.school_year.saveSchoolYear))
    
    app.route('/schoolyear/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.school_year.getSchoolYearById))
        .put(admin(app.api.school_year.saveSchoolYear))
        .delete(admin(app.api.school_year.remove))

    app.route('/filtershoolyears')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.school_year.filterSchoolYear))

    app.route('/classes')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.class.getClasses))
        .post(admin(app.api.class.saveClass))
    
    app.route('/classes/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.class.getClassById))
        .put(admin(app.api.class.saveClass))
        .delete(admin(app.api.class.remove))
        
    app.route('/classroom/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.class.getClassRoomById))
    
    app.route('/filterclasses')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.class.filterClasses))

    app.route('/enrollstudents')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.enroll_student.getEnrollStudents))
        .post(admin(app.api.enroll_student.saveEnrollStudent))

    app.route('/enrollstudents/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.enroll_student.getEnrollStudentById))
        .put(admin(app.api.enroll_student.saveEnrollStudent))
        .delete(admin(app.api.enroll_student.remove))

    // verificar erro depois
    app.route('/classsubjects')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.class_subjects.getClassSubjects))
        .post(admin(app.api.class_subjects.saveClassSubject))
    
    app.route('/classsubjects/:classId/:subjectId/:teacherId')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.class_subjects.remove))
        
    app.route('/schoolperiods')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.school_period.getSchoolPeriods))
        .post(admin(app.api.school_period.saveSchoolPeriod))

    app.route('/schoolperiods/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.school_period.getSchoolPeriodById))
        .put(admin(app.api.school_period.saveSchoolPeriod))
        .delete(admin(app.api.school_period.remove))

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.stat.Stat))
}